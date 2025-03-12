import {Component, inject, Input} from '@angular/core';
import {UserService} from '../user.service';
import {PsnUser} from '../psn-user';
import {UserGroup} from '../user-group';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: "app-user-group-management-row",
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './user-group-management-row.component.html',
  standalone: true,
  styleUrl: './user-group-management-row.component.css'
})
export class UserGroupManagementRowComponent {
  protected readonly userService: UserService = inject(UserService);
  protected addGroupSelected: string | undefined;
  protected removeGroupSelected: string | undefined;
  @Input() user!: PsnUser;
  @Input() allGroups!: UserGroup[];
  @Input() refreshFn!: Function;
  @Input() refreshFnArg: any;

  protected occludeGroups(groups: UserGroup[], user: PsnUser) {
    if (!user.groupMembership) {
      return groups;
    }
    return groups.filter(group => {
      return !user.groupMembership.some(value => value.id === group.id);
    });
  }

  protected doUserAdd(user: PsnUser, group: string | undefined) {
    if (group) {
      this.userService.addUserToGroup(user.id, group);
      user.groupMembership.push(this.allGroups.find(value => value.id === group)!);
    }
  }

  protected doUserRemove(user: PsnUser, group: string | undefined) {
    console.log(group);
    if (group) {
      this.userService.removeUserFromGroup(user.id, group);
      user.groupMembership = user.groupMembership.filter(value => value.id !== group);
    }
  }
}
