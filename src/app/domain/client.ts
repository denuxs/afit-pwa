import { User } from './user';

export interface Client {
  id: number;
  user: User;
  fullname: string;
  photo: string;
  phone: number;
  age: number;
  weight: number;
  height: number;
  experience_level: string;
  gender: string;
}
