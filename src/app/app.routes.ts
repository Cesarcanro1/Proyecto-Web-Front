import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'register', component: Register },
  { path: 'procesos', loadChildren: () => import('./features/procesos/route').then(m => m.routes) },
  { path: 'actividades', loadChildren: () => import('./features/actividades/route').then(m => m.routes) },
  { path: 'gateways', loadChildren: () => import('./features/gateways/route').then(m => m.routes) },
  { path: 'arcos', loadChildren: () => import('./features/arcos/route').then(m => m.routes) },
  { path: 'empresas', loadChildren: () => import('./features/empresas/route').then(m => m.routes) },
  { path: 'roles', loadChildren: () => import('./features/roles/route').then(m => m.routes) },
  { path: '', pathMatch: 'full', redirectTo: 'procesos' },
  { path: '**', redirectTo: 'procesos' }
];
