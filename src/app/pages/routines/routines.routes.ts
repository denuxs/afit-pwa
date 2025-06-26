import { Routes } from '@angular/router';

import { RoutineComponent } from './routine/routine.component';

export default [
  {
    path: ':id',
    component: RoutineComponent,
  },
] as Routes;
