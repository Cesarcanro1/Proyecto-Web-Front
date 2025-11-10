import { Routes } from '@angular/router';
import { Form } from './form/form';
import { Lista } from './lista/lista';


export const routes: Routes = [
  { path: '', component: Lista },
  { path: 'new', component: Form },
  { path: ':id/edit', component: Form },
];
