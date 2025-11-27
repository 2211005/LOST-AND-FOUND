import { Component } from '@angular/core';
import { PerdidoForm } from '../perdido-form/perdido-form';
import { EncontradoForm } from '../encontrado-form/encontrado-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte',
  imports: [CommonModule, PerdidoForm, EncontradoForm],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
})
export class Reporte {
    vista: 'perdido' | 'encontrado' = 'perdido'
}
