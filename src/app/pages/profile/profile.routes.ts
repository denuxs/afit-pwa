import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export default [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: ':id',
    component: ProfileEditComponent,
  },
] as Routes;
