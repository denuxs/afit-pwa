import { Routes } from '@angular/router';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExercisesComponent } from '../exercises/exercises.component';

export default [
  {
    path: '',
    component: WorkoutsComponent,
  },
  {
    path: ':id',

    title: 'Ejercicios',
    component: WorkoutComponent,
  },
  {
    path: ':id/exercise/:exercise',
    component: ExercisesComponent,
  },
] as Routes;
