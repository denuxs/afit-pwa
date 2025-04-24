import { Exercise } from './exercise';
import { User } from './user';

export interface Workout {
  id: number;
  day: number;
  name: string;
  photo: string;
  description: string;
  exercises: any[];
  user: User;
  created: Date;
}
