import {Component, inject} from '@angular/core';
import { UserService } from '../user.service';
import { PsnUser } from '../psn-user';
import {UserGroup} from '../user-group';
import {NavigationComponent} from '../navigation/navigation.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {UserGroupManagementRowComponent} from '../user-group-management-row/user-group-management-row.component';

@Component({
  selector: 'app-user-group-management',
  imports: [
    NavigationComponent,
    FormsModule,
    NgIf,
    NgForOf,
    UserGroupManagementRowComponent
  ],
  templateUrl: './user-group-management.component.html',
  standalone: true,
  styleUrl: './user-group-management.component.css'
})
export class UserGroupManagementComponent {
  protected readonly userService: UserService = inject(UserService);
  protected foundUsers: PsnUser[] = [];
  protected foundGroups: UserGroup[] = [];
  protected userQueryString: string = "";

  constructor() {
    this.userService.queryGroups()
      .subscribe(value => {
        this.foundGroups = value;
      });
  }

  protected queryUsers(query: string) {
    this.userService.queryUsers(query)
      .subscribe(value => {
        this.foundUsers = value;
      });
  }
}
