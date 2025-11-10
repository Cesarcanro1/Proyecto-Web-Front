import { Routes } from '@angular/router'
import { Lista } from './lista/lista';
import { Form } from './form/form';

export const routes: Routes = [
    { path: '', component: Lista},
    { path: 'new', component: Form},
    { path: ':id/edit', component: Form},
];