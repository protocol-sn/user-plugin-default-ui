import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment';
import {PsnUser} from './psn-user';
import {map, Observable} from 'rxjs';
import {UserGroup} from './user-group';
import {AuthService} from './auth.service';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiService: ApiService = inject(ApiService);
  authService: AuthService = inject(AuthService);
  public readonly PENDING_APPROVAL_ENDPOINT = "/users/pending-approval";
  public readonly APPROVE_USER_ENDPOINT = "/users/approve/{userId}";
  public readonly GET_USER_ENDPOINT = "/users/{userId}";
  public readonly REQUEST_VERIFICATION_ENDPOINT = "/users/verify/{userId}";
  private readonly GET_DEFAULT_GROUPS_ENDPOINT = "/user-groups/defaults";
  private readonly ADD_TO_GROUPS_ENDPOINT = "/user-groups/{userId}/group/{groupId}";
  private readonly USER_PENDING_VERIFICATION_ENDPOINT = "/users/pending-verification";
  private readonly VERIFY_USER_ENDPOINT = "/users/verify/{userId}";
  public user: PsnUser | undefined;
  private loggedInUser: PsnUser | undefined;

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

  getUsersPendingVerification() {
    return this.apiService.doSecureGET<PsnUser[]>(environment.userPluginHome + this.USER_PENDING_VERIFICATION_ENDPOINT)
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

  verifyUser(userId: string) {
    this.apiService.doSecurePUT(environment.userPluginHome + this.VERIFY_USER_ENDPOINT.replace("{userId}", userId))
      .subscribe(value => {
      });
  }

  approveUser(userId: string) {
    this.apiService.doSecurePUT(environment.userPluginHome + this.APPROVE_USER_ENDPOINT.replace("{userId}", userId))
      .subscribe(value => {
      });
  }

  approveUserWithDefaultGroups(id: string) {
    this.apiService.doSecurePUT(environment.userPluginHome + this.APPROVE_USER_ENDPOINT.replace("{userId}", id))
      .subscribe(value => {
        this.getDefaultGroups()
          .subscribe(defaultGroups => {
            for (let group of defaultGroups) {
              this.apiService.doSecurePUT(environment.userPluginHome + this.ADD_TO_GROUPS_ENDPOINT.replace("{userId}", id).replace("{groupId}", group.id))
                .subscribe(value => {
                  console.log(value);
                });
            }
          })
      });
  }

  requestVerification() {
    this.apiService.doSecurePOST(environment.userPluginHome + this.REQUEST_VERIFICATION_ENDPOINT.replace("{userId}", this.authService.sub))
      .subscribe((value:HttpResponse<any>) => {
        if (this.loggedInUser) {
          this.loggedInUser.requestsVerification = true;
        }
        this.setUser(this.authService.sub);
      });
  }

  getDefaultGroups(){
    return this.apiService.doSecureGET<UserGroup[]>(environment.userPluginHome + this.GET_DEFAULT_GROUPS_ENDPOINT)
      .pipe(
        map(
          value => {
            if (value.ok && value.body) {
              return value.body;
            }
            return <UserGroup[]>[];
          }
        )
      );
  }

  getUser(id: string = this.authService.sub): Observable<PsnUser> {
    return this.apiService.doSecureGET<PsnUser>(environment.userPluginHome + this.GET_USER_ENDPOINT.replace("{userId}", id))
      .pipe(
        map(
          value => {
            if (value.ok && value.body) {
              return value.body;
            }
            return <PsnUser>{};
          }
        ));
  }

  setUser(id: string) {
    this.getUser(id)
      .subscribe(value => {
        this.user = value;
      })
  }

  getLoggedInUser() {
    if (this.loggedInUser) {
      return new Observable<PsnUser>(subscriber => subscriber.next(this.loggedInUser));
    }
    if (!this.authService.sub) {
      this.authService.loadUser();
    }
    if (this.authService.sub) {
      return this.getUser(this.authService.sub)
        .pipe(
          map(
            value => {
              this.loggedInUser = value;
              return value;
            }
          )
        );
    }
    return new Observable<PsnUser>(subscriber => subscriber.next(<PsnUser>{}));
  }
}
