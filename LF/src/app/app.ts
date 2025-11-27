import { Component, signal } from '@angular/core';
import { HomePageNav } from './core/home-page-nav/home-page-nav';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [HomePageNav, RouterOutlet],
  template: `

   <div class="app-container">
      <app-home-page-nav></app-home-page-nav>
      <main class="main-content">
        <router-outlet></router-outlet>   <!-- ÚNICO lugar donde se cargan páginas -->
      </main>
    </div>
  `,
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('LF');
}
