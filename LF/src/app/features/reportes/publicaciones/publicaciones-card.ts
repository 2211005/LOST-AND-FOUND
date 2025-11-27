// src/app/features/reportes/publicaciones/publicaciones-card.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../../../shared/models/report.model';

@Component({
  selector: 'app-publicaciones-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicaciones-card.html',
  styleUrls: ['./publicaciones-card.css'],
})
export class PublicacionesCard {
  @Input({ required: true }) report!: Report;
}
