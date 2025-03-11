import {Component, inject} from '@angular/core';
import {UserService} from '../user.service';
import {NgForOf} from '@angular/common';
import {NavigationComponent} from '../navigation/navigation.component';
import {PsnUser} from '../psn-user';

@Component({
  selector: 'app-pending-verification',
  imports: [
    NavigationComponent,
    NgForOf
  ],
  templateUrl: './pending-verification.component.html',
  standalone: true,
  styleUrl: './pending-verification.component.css'
})
export class PendingVerificationComponent {
  protected readonly userService: UserService = inject(UserService);
  protected pendingVerification: PsnUser[] = [];

  constructor() {
    this.getUsersPendingVerification()
      .subscribe(value => {
        this.pendingVerification = value;
      });
  }

  protected getUsersPendingVerification() {
    return this.userService.getUsersPendingVerification();
  }

  removeUserPendingVerification(user: PsnUser) {
    this.pendingVerification.splice(this.pendingVerification.indexOf(user), 1);
  }
}
