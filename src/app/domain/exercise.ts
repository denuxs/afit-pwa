import { Comment } from './comment';

interface Catalog {
  id: number;
  name: string;
  key: string;
  created: Date;
}

export interface Exercise {
  id: number;
  name: string;
  description: string;
  image: string;
  equipment: Catalog;
  muscle: Catalog;
  exercises_count: number;
  sets: number;
  repts: number;
  comments: Comment[];
  created: Date;
}

export interface ExerciseList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Exercise[];
}
