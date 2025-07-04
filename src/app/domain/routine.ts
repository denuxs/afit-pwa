import { RoutineExercise } from './exercise';

export interface Routine {
  id: number;
  title: string;
  level: string;
  level_display: string;
  image: string;
  description: string;
  exercises: RoutineExercise[];
  created: Date;
}
