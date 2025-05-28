export interface User {
  id: number;
  username: string;
  photo: string;
  phone: number;
  age: number;
  weight: number;
  height: number;
  experience_level: string;
  password: string;
  gender: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  last_login: Date;
}
