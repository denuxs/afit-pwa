import { Routes } from '@angular/router';

import { RoutineComponent } from './routine/routine.component';
import { RoutinesComponent } from './routines.component';

export default [
  {
    path: '',
    component: RoutinesComponent,
  },
  {
    path: ':id',
    component: RoutineComponent,
  },
] as Routes;
