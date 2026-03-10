import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ReportsService } from '../../../shared/services/reports';
import { Report } from '../../../shared/models/report.model';

@Component({
  selector: 'app-reporte-detalle-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reporte-detalle-admin.html',
  styleUrls: ['./reporte-detalle-admin.css'],
})
export class ReporteDetalleAdmin implements OnInit {
  loading = signal(false);
  error = signal('');
  savingDelivery = signal(false);

  report = signal<Report | null>(null);
  deliveryForm!: FormGroup;

  


  private reportId!: string;

    statuses = ['Nuevo', 'Verificado', 'En espera de dueño', 'Entregado', 'Rechazado'];
  saving = signal<string | null>(null);

  cambiarEstado(report: Report, nuevoEstado: string) {
    // llamar a reportsService.updateStatus(...)
  }


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reportsService: ReportsService
  ) {
    this.deliveryForm = this.fb.group({
      deliveredTo: ['', Validators.required],
      evidencePhotoUrl: [''],
      notes: [''],
    });
  }

  get f() {
    return this.deliveryForm.controls;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.error.set('ID de reporte no proporcionado');
        return;
      }
      this.reportId = id;
      this.cargarReporte();
    });
  }

  cargarReporte(): void {
    this.loading.set(true);
    this.error.set('');

    this.reportsService.getReport(this.reportId).subscribe({
      next: (data) => {
        this.report.set(data);
        this.loading.set(false);

        // Si ya tiene entrega registrada, llenamos el form (modo lectura)
        if (data.delivery?.deliveredTo) {
          this.deliveryForm.patchValue({
            deliveredTo: data.delivery.deliveredTo,
            evidencePhotoUrl: data.delivery.evidencePhotoUrl || '',
            notes: data.delivery.notes || '',
          });
          this.deliveryForm.disable();
        }
      },
      error: (err) => {
        console.error('Error al cargar reporte:', err);
        this.error.set('Error al cargar el reporte');
        this.loading.set(false);
      },
    });
  }

  onRegistrarEntrega(): void {
    this.error.set('');

    if (this.deliveryForm.invalid || !this.report()) {
      this.deliveryForm.markAllAsTouched();
      return;
    }

    this.savingDelivery.set(true);

    const v = this.deliveryForm.value;

    this.reportsService
      .registerDelivery(this.reportId, {
        deliveredTo: v.deliveredTo!,
        evidencePhotoUrl: v.evidencePhotoUrl || undefined,
        notes: v.notes || undefined,
      })
      .subscribe({
        next: (updated) => {
          console.log('✅ Entrega registrada:', updated);
          this.report.set(updated);
          this.savingDelivery.set(false);
          this.deliveryForm.disable(); // ya no editable
        },
        error: (err) => {
          console.error('❌ Error al registrar entrega:', err);
          this.error.set('Error al registrar la entrega');
          this.savingDelivery.set(false);
        },
      });
  }
}
