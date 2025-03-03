import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment';
import {PsnUser} from './psn-user';
import {map, Observable} from 'rxjs';
import {UserGroup} from './user-group';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiService: ApiService = inject(ApiService);
  PENDING_APPROVAL_ENDPOINT = "/v0.1.1/users/pending-approval";
  APPROVE_USER_ENDPOINT = "/v0.1.1/users/approve/{userId}";

  getUsersPendingApproval() {
    return this.apiService.doSecureGET<PsnUser[]>(environment.userPluginHome + this.PENDING_APPROVAL_ENDPOINT)
      .pipe(
        map(
          value => {
            if (value.ok && value.body) {
             return value.body;
            }
            return <PsnUser[]>[];
          }
        )
      );
  }

  approveUser(userId: string) {
    console.log("Approving user: " + userId);
    this.apiService.doSecurePUT(environment.userPluginHome + this.APPROVE_USER_ENDPOINT.replace("{userId}", userId))
      .subscribe(value => {
        console.log("did approval");
        console.log(value);
      });
  }

  getDefaultGroups(){
    console.log("getting default groups");
    return this.apiService.doSecureGET<UserGroup[]>(environment.userPluginHome + "/v0.3.4/user-groups/defaults")
      .pipe(
        map(
          value => {
            console.log("parsing default groups");
            if (value.ok && value.body) {
              return value.body;
            }
            return <UserGroup[]>[];
          }
        )
      );
  }

  approveUserWithDefaultGroups(id: string) {
    this.apiService.doSecurePUT(environment.userPluginHome + this.APPROVE_USER_ENDPOINT.replace("{userId}", id))
      .subscribe(value => {
        console.log("preparing to add to groups");
        this.getDefaultGroups()
          .subscribe(defaultGroups => {
            for (let group of defaultGroups) {
              this.apiService.doSecurePUT(environment.userPluginHome + "/v0.3.0/user-groups/" + id + "/group/" + group.id)
                .subscribe(value => {
                  console.log("added to group");
                  console.log(value);
                });
            }
          })
      });
  }
}
