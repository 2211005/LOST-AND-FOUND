import { Routes } from '@angular/router';
//publico
import { HomePage } from './features/home-page/home-page';
import { Publicaciones } from './features/reportes/publicaciones/publicaciones';
import { PerdidoForm } from './features/reportes/perdido-form/perdido-form';
import { EncontradoForm } from './features/reportes/encontrado-form/encontrado-form';
//admin
import { ReportesAdmin } from './features/admin/reportes-admin/reportes-admin';
import { ReporteDetalleAdmin } from './features/admin/reporte-detalle-admin/reporte-detalle-admin';
import { AdminLogin } from './features/admin/admin-login/admin-login';
//guard
import { authGuard } from './shared/guards/auth.guard';
import { ReportesHome } from './features/reportes/reportes-home/reportes-home/reportes-home';
//core
import { NotFoundPage } from './core/not-found/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'publicaciones', component: Publicaciones },
  { path: 'perdido', component: PerdidoForm },
  { path: 'encontrado', component: EncontradoForm },
  { path: 'reports', component: ReportesHome },
  { path: 'admin/login', component: AdminLogin },

  {
    path: 'admin/reportes',
    component: ReportesAdmin,
    canActivate: [authGuard],
  },
  {
    path: 'admin/reportes/:id',
    component: ReporteDetalleAdmin,
    canActivate: [authGuard],
  },


  { path: '**', component: NotFoundPage },
];
