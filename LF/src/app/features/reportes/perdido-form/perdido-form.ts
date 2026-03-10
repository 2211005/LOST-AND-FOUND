import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReportsService } from '../../../shared/services/reports';

@Component({
  selector: 'app-perdido-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './perdido-form.html',
  styleUrls: ['./perdido-form.css'],
})
export class PerdidoForm {
  form: FormGroup;
  loading = signal(false);
  error = signal('');
  success = signal('');

  constructor(
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required], // fecha en que se perdió
      reporterName: ['', Validators.required],
      reporterEmail: ['', [Validators.required, Validators.email]],
      reporterPhone: ['', [Validators.required, Validators.maxLength(20)]],
      photoUrl: [''], // opcional
    });
  }

  // helper para usar más fácil en el HTML
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.error.set('');
    this.success.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      ...this.form.value,
      type: 'lost', // importante para el back
    };

    this.reportsService.createReport(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set('Reporte de objeto perdido registrado correctamente.');
        this.form.reset();
        // opcional: redirigir a publicaciones
        // this.router.navigate(['/publicaciones']);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Ocurrió un error al registrar el reporte.');
        this.loading.set(false);
      },
    });
  }
}
