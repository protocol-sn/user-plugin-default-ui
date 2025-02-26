import {Component, inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {NavigationComponent} from '../navigation/navigation.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-home-screen',
  imports: [
    NgIf,
    NavigationComponent,
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css',
  standalone: true,
})
export class HomeScreenComponent {
  protected readonly authService: AuthService = inject(AuthService);
}
