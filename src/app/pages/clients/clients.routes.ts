import { Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { ClientComponent } from './client/client.component';
import { ClientRoutinesComponent } from './client-routines/client-routines.component';
import { ClientMeasuresComponent } from './client-measures/client-measures.component';

export default [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: ':id',
    component: ClientComponent,
  },
  {
    path: ':id/routines',
    title: 'Rutinas',
    component: ClientRoutinesComponent,
  },
  {
    path: ':id/measures',
    title: 'Medidas',
    component: ClientMeasuresComponent,
  },
] as Routes;
