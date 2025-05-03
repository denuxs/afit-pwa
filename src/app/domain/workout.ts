import { Exercise } from './exercise';
import { User } from './user';

interface Set {
  weight: number;
  rept: number;
  sets: number;
}

interface DetailExercise {
  id: number;
  description: string;
  exercise: Exercise;
  workout: number;
  data: Set[];
  created: Date;
}

export interface Workout {
  id: number;
  day: number;
  name: string;
  photo: string;
  description: string;
  exercises: DetailExercise[];
  user: User;
  created: Date;
}

export interface WorkoutList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Workout[];
}
