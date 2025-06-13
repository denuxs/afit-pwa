export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  last_login: Date;
  client: number;

  phone: number;
  age: number;
  weight: number;
  height: number;
  experience_level: string;
  gender: string;
}
