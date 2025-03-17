import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {NgFor, NgIf} from '@angular/common';
import {PsnUser} from '../psn-user';
import {NavigationComponent} from '../navigation/navigation.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {UserGroup} from '../user-group';

@Component({
  selector: 'app-pending-approval',
  imports: [
    NgFor,
    NavigationComponent,
    NgIf
  ],
  templateUrl: './pending-approval.component.html',
  standalone: true,
  styleUrl: './pending-approval.component.css'
})
export class PendingApprovalComponent implements OnInit {
  protected readonly userService: UserService = inject(UserService);
  protected pendingApproval: PsnUser[] = [];
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected defaultGroups: UserGroup[] = [];

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
    this.userService.getUsersPendingApproval().subscribe(value => this.pendingApproval = value);
    this.userService.getDefaultGroups().subscribe(value => this.defaultGroups = value);
  }


  removeUserPendingApproval(user: PsnUser) {
    this.pendingApproval.splice(this.pendingApproval.indexOf(user), 1);
  }
}
