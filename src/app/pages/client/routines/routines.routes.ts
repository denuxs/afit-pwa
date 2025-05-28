import { Routes } from '@angular/router';

import { RoutinesComponent } from './routines.component';
import { RoutineComponent } from './routine/routine.component';
import { ExercisesComponent } from '../exercises/exercises.component';

export default [
  {
    path: ':id',
    component: RoutineComponent,
  },

  // {
  //   path: ':id/exercise/:exercise',
  //   component: ExercisesComponent,
  // },
] as Routes;
