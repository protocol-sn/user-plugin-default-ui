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
export class HomeScreenComponent implements OnInit {
  protected readonly authService: AuthService = inject(AuthService);
  protected readonly userService: UserService = inject(UserService);

  ngOnInit() {
    console.log(this.userService.user);
  }

  protected evaluateCanRequestVerification(loggedInUser:Observable<PsnUser>) {
    return loggedInUser
      .pipe(
        map(loggedInUser => {
          console.log(loggedInUser);
          console.log((loggedInUser.verified == null)  + "||" + !loggedInUser.verified);
          console.log((loggedInUser.requestsVerification == null)  + "||" + !loggedInUser.requestsVerification);
          return (loggedInUser.verified == null || !loggedInUser.verified) &&
            (loggedInUser.requestsVerification == null || !loggedInUser.requestsVerification);
        }));
  }
}
