import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Report } from '../../../shared/models/report.model';

@Component({
  selector: 'app-publicaciones-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publicaciones-card.html',
  styleUrls: ['./publicaciones-card.css'],
})
export class PublicacionesCard {
  @Input() report!: Report;     // 👈 UNA sola publicación
  @Input() adminView = false;   // 👈 si el admin está logueado
}
