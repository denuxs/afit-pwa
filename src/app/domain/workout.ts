import { Client } from './client';
import { Exercise } from './exercise';
import { User } from './user';

interface Set {
  weight: number;
  rept: number;
  sets: number;
}

interface DetailExercise {
  data: Set[];
  description: string;
  exercise: Exercise;
  id: number;
  order: number;
  routine: number;
  created: Date;
}

export interface Routine {
  id: number;
  title: string;
  description: string;
  level_display: string;
  exercises: DetailExercise[];
  created: Date;
}

export interface Workout {
  id: number;
  // day: number;
  title: string;
  photo: string;
  description: string;
  routines: Routine[];
  user: User;
  client: Client;
  created: Date;
}

export interface WorkoutList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Workout[];
}
