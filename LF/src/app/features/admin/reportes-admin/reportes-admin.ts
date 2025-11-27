// src/app/features/admin/reportes-admin/reportes-admin.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../../shared/services/reports';
import { Report } from '../../../shared/models/report.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './reportes-admin.html',
  styleUrls: ['./reportes-admin.css'],
})
export class ReportesAdmin implements OnInit {
  loading = signal(false);
  error = signal('');
  saving = signal<string | null>(null); // id del reporte que se está guardando
  reports = signal<Report[]>([]);
  deletingId = signal<string | null>(null); // 👈 NUEVO
  // estados permitidos
  readonly statuses: Report['status'][] = [
    'Nuevo',
    'Verificado',
    'En espera de dueño',
    'Entregado',
    'Rechazado',
  ];

  // 🔍 Filtros avanzados (solo front)
  filtroEstado: 'todos' | Report['status'] = 'todos';
  filtroTipo: 'todos' | 'lost' | 'found' = 'todos';
  filtroCategoria: 'todos' | Report['category'] = 'todos';
  filtroDesde = ''; // yyyy-MM-dd
  filtroHasta = ''; // yyyy-MM-dd

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes(): void {
    this.loading.set(true);
    this.error.set('');

    this.reportsService.getReports().subscribe({
      next: (data) => {
        this.reports.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Error al cargar los reportes');
        this.loading.set(false);
      },
    });
  }

// 🔹 NUEVO: eliminar reporte
  onDeleteReport(report: Report): void {
    if (!report._id) return;

    const seguro = confirm(
      `¿Seguro que quieres eliminar el reporte "${report.title}"? Esta acción no se puede deshacer.`
    );

    if (!seguro) return;

    this.deletingId.set(report._id);

    this.reportsService.deleteReport(report._id).subscribe({
      next: () => {
        this.reports.update((lista) =>
          lista.filter((r) => r._id !== report._id)
        );
        this.deletingId.set(null);
      },
      error: (err) => {
        console.error('Error al eliminar reporte:', err);
        const msg =
          err?.error?.message || 'Error al eliminar el reporte';
        this.error.set(msg);
        this.deletingId.set(null);
      },
    });
  }

  cambiarEstado(report: Report, nuevoEstado: Report['status']): void {
    if (!report._id || report.status === nuevoEstado) return;

    this.saving.set(report._id);

    this.reportsService.updateStatus(report._id, nuevoEstado).subscribe({
      next: (updated) => {
        // actualizamos la lista en memoria
        this.reports.update((lista) =>
          lista.map((r) => (r._id === updated._id ? updated : r)),
        );
        this.saving.set(null);
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        this.error.set('Error al cambiar estado');
        this.saving.set(null);
      },
    });
  }
// 🔍 getter de lista filtrada
  get filteredReports(): Report[] {
    let lista = this.reports();

    // filtrar por tipo (lost/found)
    if (this.filtroTipo !== 'todos') {
      lista = lista.filter((r) => r.type === this.filtroTipo);
    }

    // filtrar por estado
    if (this.filtroEstado !== 'todos') {
      lista = lista.filter((r) => (r.status || 'Nuevo') === this.filtroEstado);
    }

    // filtrar por categoría
    if (this.filtroCategoria !== 'todos') {
      lista = lista.filter((r) => r.category === this.filtroCategoria);
    }

    // filtrar por rango de fechas (usamos r.date)
    if (this.filtroDesde) {
      const desde = new Date(this.filtroDesde);
      lista = lista.filter((r) => new Date(r.date) >= desde);
    }

    if (this.filtroHasta) {
      const hasta = new Date(this.filtroHasta);
      // sumamos 1 día al hasta para incluirlo completo
      hasta.setDate(hasta.getDate() + 1);
      lista = lista.filter((r) => new Date(r.date) < hasta);
    }

    return lista;
  }
  
  limpiarFiltros(): void {
    this.filtroEstado = 'todos';
    this.filtroTipo = 'todos';
    this.filtroCategoria = 'todos';
    this.filtroDesde = '';
    this.filtroHasta = '';
  }
}
