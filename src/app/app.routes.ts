import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'procesos',
    loadChildren: () =>
      import('./features/procesos/route').then(m => m.routes)
  },
  { path: '', pathMatch: 'full', redirectTo: 'procesos' }
];
