import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';
import { MobileComponent } from './layouts/mobile/mobile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/profile' },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    component: MobileComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },
      {
        path: 'workouts',
        title: 'Rutinas',
        loadChildren: () => import('./pages/workouts/workouts.routes'),
      },
      {
        path: 'measures',
        title: 'Medidas',
        loadChildren: () => import('./pages/measures/measures.routes'),
      },
      {
        path: 'about',
        title: 'Acerca',
        loadComponent: () =>
          import('./pages/about/about.component').then((c) => c.AboutComponent),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications/notifications.component').then(
            (c) => c.NotificationsComponent,
          ),
      },
    ],
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent,
      ),
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
