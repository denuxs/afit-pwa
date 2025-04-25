import { Comment } from './comment';
import { User } from './user';

export interface Notification {
  id: number;
  user: User;
  user_to: User;
  is_read: number;
  comment: Comment;
  created: Date;
}
