import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {NavigationComponent} from '../navigation/navigation.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {UserService} from '../user.service';
import {map, Observable} from 'rxjs';
import {PsnUser} from '../psn-user';

@Component({
  selector: 'app-home-screen',
  imports: [
    NgIf,
    NavigationComponent,
    AsyncPipe,
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css',
  standalone: true,
})
export class HomeScreenComponent {
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly userService: UserService = inject(UserService);

  protected evaluateCanRequestVerification(loggedInUser:Observable<PsnUser>) {
    return loggedInUser
      .pipe(
        map(loggedInUser => {
          return (loggedInUser.verified == null || !loggedInUser.verified) &&
            (loggedInUser.requestsVerification == null || !loggedInUser.requestsVerification);
        }));
  }
}
