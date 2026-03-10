import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../shared/services/auth'; // ajusta la ruta si es diferente

@Component({
  selector: 'app-home-page-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page-nav.html',
  styleUrls: ['./home-page-nav.css'],
})
export class HomePageNav {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // 👇 Getter que devuelve un booleano, ya no usamos el field problemático
  get isLoggedIn(): boolean {
    return this.authService.isLoggedInSignal();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/publicaciones']);
  }
}
