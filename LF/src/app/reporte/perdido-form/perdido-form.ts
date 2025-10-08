import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perdido-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './perdido-form.html',
  styleUrl: './perdido-form.css'
})
export class PerdidoForm {
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
    console.log('PERDIDO ->', this.form);
    alert('Reporte de objeto perdido enviado ✅ (revisa la consola)');
  }
}
