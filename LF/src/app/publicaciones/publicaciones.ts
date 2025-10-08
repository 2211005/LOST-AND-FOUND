import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PubType = 'lost'|'found';
export interface Publicacion {
  id: number;
  title: string;
  description: string;
  type: PubType;                 // 'lost' | 'found'
  location?: string;
  imageUrl?: string;
  createdAt: string;             // ISO
  userId?: string;               // para futuro
  userName?: string;
  userAvatarUrl?: string;
}

@Component({
  selector: 'app-publicaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css'
})
export class Publicaciones {
  /* Mock inicial (luego vendrá del backend) */
  private readonly seed: Publicacion[] = Array.from({length: 37}).map((_,i) => ({
    id: i+1,
    title: i % 2 ? 'Billetera café' : 'Mochila negra',
    description: i % 2 ? 'Encontrada cerca de cafetería' : 'Jansport con parche azul',
    type: i % 3 === 0 ? 'found' : 'lost',
    location: i % 2 ? 'Cafetería' : 'Edif. A',
    imageUrl: i % 5 === 0 ? 'https://picsum.photos/seed/'+(i+1)+'/800/400' : undefined,
    createdAt: new Date(Date.now() - i*3600_000).toISOString(),
    userId: i % 4 === 0 ? 'u1' : 'u2',
    userName: i % 4 === 0 ? 'Gerardo' : 'Erick',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=' + ((i % 70)+1)
  }));

  /* Filtros */
  q = signal('');
  type = signal<''|PubType>('');
  mineOnly = signal(false);
  currentUserId = signal<string|undefined>(undefined); // cuando tengas auth, setea aquí

  /* Vista: 'feed' (facebook-like) o 'grid' */
  view = signal<'feed'|'grid'>('feed');

  /* Paginación */
  page = signal(1);
  pageSize = signal(10);

  

  /* Datos */
  items = signal<Publicacion[]>(this.seed);

  /* Derivados */
  filtered = computed(() => {
    const term = this.q().trim().toLowerCase();
    const t = this.type();
    const mine = this.mineOnly();
    const uid = this.currentUserId();

    return this.items().filter(p => {
      const qOk = !term || p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
      const tOk = !t || p.type === t;
      const mOk = !mine || (uid && p.userId === uid);
      return qOk && tOk && mOk;
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));
  paged = computed(() => {
    const pz = this.pageSize();
    const start = (this.page() - 1) * pz;
    return this.filtered().slice(start, start + pz);
  });

  /* Acciones UI */
pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  setPageSize(pz: number){ this.pageSize.set(Number(pz)); this.page.set(1); }
  setView(v:'feed'|'grid'){ this.view.set(v); }
  setPage(p:number){ const tp = this.totalPages(); if(p>=1 && p<=tp){ this.page.set(p); } }
  nextPage(){ this.setPage(this.page()+1); }
  prevPage(){ this.setPage(this.page()-1); }
  /* Futuro: cargar del backend con paginación real
     load(params){ this.http.get<Paged<Publicacion>>('/api/posts', { params }).subscribe(...) }
  */
}