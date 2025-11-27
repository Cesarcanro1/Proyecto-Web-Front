import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login/login';
import { Register } from './features/register/register/register';
import { AuthGuard } from './guards/auth-guard';



export const routes: Routes = [
  // PUBLIC
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },

  // PRIVADO
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard')
        .then(m => m.Dashboard),

    children: [
      {
        path: 'procesos',
        loadChildren: () =>
          import('./features/procesos/route')
            .then(m => m.routes)
      },
      {
        path: 'actividades',
        loadChildren: () =>
          import('./features/actividades/route')
            .then(m => m.routes)
      },
      {
        path: 'empresas',
        loadChildren: () =>
          import('./features/empresas/route')
            .then(m => m.routes)
      }
    ]
  },

  { path: '', redirectTo: 'procesos', pathMatch: 'full' },
  { path: '**', redirectTo: 'procesos' }
];
