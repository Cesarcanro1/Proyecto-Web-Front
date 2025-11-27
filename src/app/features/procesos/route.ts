import { Routes } from '@angular/router';
import { ListComponent } from './list/list';
import { Create } from './create/create';
import { Edit } from './edit/edit';

export const routes: Routes = [

  // LISTA DE PROCESOS
  { path: '', component: ListComponent },

  // CREAR PROCESO
  { path: 'create', component: Create },

  // EDITAR PROCESO
  { path: 'edit/:id', component: Edit },

  // MODELER (Drag & Drop)
  {
    path: 'modeler',
    loadComponent: () =>
      import('./modeler/modeler.component')
        .then(m => m.ModelerComponent)
  }

];
