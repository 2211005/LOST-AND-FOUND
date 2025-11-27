import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reportes-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reportes-home.html',
  styleUrls: ['./reportes-home.css'],
})
export class ReportesHome {}
