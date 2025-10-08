import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encontrado-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './encontrado-form.html',
  styleUrl: './encontrado-form.css'
})
export class EncontradoForm {
  form = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    fecha: '',
    categoria: '',
    foto: null as File|null,
    contactoNombre: '',
    contactoEmail: ''
  };

  onFile(e: Event){
    const input = e.target as HTMLInputElement;
    this.form.foto = input.files?.[0] ?? null;
  }

  enviar(){
    console.log('ENCONTRADO ->', this.form);
    alert('Reporte de objeto encontrado enviado ✅ (revisa la consola)');
  }
}
