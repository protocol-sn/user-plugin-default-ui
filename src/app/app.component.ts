import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // templateUrl: './app.component.html',
  template: `
        <router-outlet></router-outlet>
  `,
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-plugin-default-ui';
}
