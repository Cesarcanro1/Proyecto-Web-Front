import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'procesos', loadChildren: () => import('./features/procesos/route').then(m => m.routes) },
  { path: 'actividades', loadChildren: () => import('./features/actividades/route').then(m => m.routes) },
  { path: 'gateways', loadChildren: () => import('./features/gateways/route').then(m => m.routes) },
  { path: 'arcos', loadChildren: () => import('./features/arcos/route').then(m => m.routes) },
  { path: '', pathMatch: 'full', redirectTo: 'procesos' },
  { path: '**', redirectTo: 'procesos' }
];
