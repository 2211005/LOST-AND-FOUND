import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page/home-page';
import { Reporte } from './reporte/reporte';
import { Publicaciones } from './publicaciones/publicaciones';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full', title: 'Lost & Found' },
  {
    path: 'publicaciones',
    loadComponent: () => import('./publicaciones/publicaciones')
      .then(m => m.Publicaciones),
    title: 'Publicaciones'
  },
  { path: 'reports', component: Reporte, title: 'Reportes' },
  { path: '**', redirectTo: '' }
];
