import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);

  constructor() { }

  init() {
    this.authService.initialize(this.userService).then(r => {});
  }
}
