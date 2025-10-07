import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page/home-page';
import { Reporte } from './reporte/reporte';

export const routes: Routes = [
  { path: '', component: HomePage, title:'Lost & Found' },    
  { path: 'reports', component: Reporte, title: 'Reportes'},     
];
