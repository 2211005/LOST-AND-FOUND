import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicacionesCard } from './publicaciones-card';
import { ReportsService } from '../../../shared/services/reports';
import { Report } from '../../../shared/models/report.model';
import { AuthService } from '../../../shared/services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './publicaciones.html',
  styleUrls: ['./publicaciones.css'],
})
export class Publicaciones implements OnInit {
  loading = signal(false);
  error = signal('');
  reports = signal<Report[]>([]);

  searchTerm = '';

  // para mostrar botón "Ver detalle (admin)"
  isAdminView = false;

  // 🔹 paginación
  currentPage = 1;
  pageSize = 6; // cuántas cards por página

  constructor(
    private reportsService: ReportsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdminView = this.authService.isLoggedIn();
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.loading.set(true);
    this.error.set('');

    this.reportsService.getReports().subscribe({
      next: (data) => {
        this.reports.set(data);
        this.loading.set(false);
        this.currentPage = 1; // reiniciar página al cargar
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar las publicaciones.');
        this.loading.set(false);
      },
    });
  }

  // 🔹 se llama cuando cambia el texto de búsqueda
  onSearchTermChange(): void {
    this.currentPage = 1;
  }

  get filteredReports(): Report[] {
    const term = this.searchTerm.trim().toLowerCase();
    const list = this.reports();

    if (!term) return list;

    return list.filter((r) => {
      const title = (r.title || '').toLowerCase();
      const desc = (r.description || '').toLowerCase();
      const loc = (r.location || '').toLowerCase();
      const cat = (r.category || '').toLowerCase();

      return (
        title.includes(term) ||
        desc.includes(term) ||
        loc.includes(term) ||
        cat.includes(term)
      );
    });
  }

  // 🔹 total de resultados después del filtro
  get totalItems(): number {
    return this.filteredReports.length;
  }

  // 🔹 número de páginas
  get totalPages(): number {
    if (this.totalItems === 0) return 1;
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // 🔹 páginas para el *ngFor de botones (1, 2, 3, ...)
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // 🔹 lo que realmente se pinta en pantalla
  get paginatedReports(): Report[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredReports.slice(start, start + this.pageSize);
  }

  // 🔹 control de paginación
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
