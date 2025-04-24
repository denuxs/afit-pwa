import { Exercise } from './exercise';
import { User } from './user';

export interface Comment {
  id: number;
  name: string;
  content: string;
  created: Date;
  user: User;
  exercise: Exercise;
}

export interface CommentDto {
  content: string;
  content_type: number;
  object_id: number;
  user: number;
}
