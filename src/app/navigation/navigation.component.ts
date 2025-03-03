import {Component, inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navigation.component.html',
  standalone: true,
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  protected readonly authService: AuthService = inject(AuthService);
}
