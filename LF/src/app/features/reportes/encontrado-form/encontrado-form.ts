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
  selector: 'app-encontrado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './encontrado-form.html',
  styleUrls: ['./encontrado-form.css'],
})
export class EncontradoForm {
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
      location: ['', Validators.required], // lugar donde se encontró
      date: ['', Validators.required],      // fecha en que se encontró
      reporterName: ['', Validators.required],
      reporterEmail: ['', [Validators.required, Validators.email]],
      reporterPhone: ['', [Validators.required, Validators.maxLength(20)]],
      photoUrl: [''], // opcional
    });
  }

  // helper para el template
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
      type: 'found', // 👈 importante para el backend
    };

    this.reportsService.createReport(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set('Reporte de objeto encontrado registrado correctamente.');
        this.form.reset();
        // opcional:
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
