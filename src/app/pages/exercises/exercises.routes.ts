import { Routes } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';

export default [
  {
    path: ':id',
    component: ExerciseComponent,
  },
] as Routes;
