import { Routine } from './routine';

export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  first_name: string;
  last_name: string;
  fullname: string;
  role: string;
  coach: User;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  last_login: Date;
}

export interface UserRoutine {
  id: number;
  user: number;
  order: number;
  day: string;
  notes: string;
  routine: Routine;
  created: Date;
}
