import {inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  authService: AuthService = inject(AuthService);

  constructor() { }

  init() {
    this.authService.initialize();
  }
}
