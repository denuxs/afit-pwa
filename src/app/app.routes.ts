import { Routes } from '@angular/router';

import { CoachTabsComponent } from './layouts/coach-tabs/coach-tabs.component';
import { ClientTabsComponent } from './layouts/client-tabs/client-tabs.component';

import { clientGuard } from './core/guards/client.guard';
import { coachGuard } from './core/guards/coach.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/profile' },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'routines',
    title: 'Rutinas',
    loadChildren: () => import('./pages/client/routines/routines.routes'),
  },
  {
    path: 'exercises',
    title: 'Ejercicios',
    loadChildren: () => import('./pages/client/exercises/exercises.routes'),
  },
  {
    path: 'coach',
    component: CoachTabsComponent,
    canActivate: [coachGuard],
    children: [
      {
        path: 'clients',
        title: 'Clientes',
        loadComponent: () =>
          import('./pages/coach/clients/clients.component').then(
            (c) => c.ClientsComponent,
          ),
      },
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import('./pages/coach/coach-profile/coach-profile.component').then(
            (c) => c.CoachProfileComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: ClientTabsComponent,
    canActivate: [clientGuard],
    children: [
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import('./pages/client/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },

      {
        path: 'workouts',
        title: 'Rutinas',
        loadChildren: () => import('./pages/client/workouts/workouts.routes'),
      },
      {
        path: 'measures',
        title: 'Medidas',
        loadChildren: () => import('./pages/client/measures/measures.routes'),
      },
      {
        path: 'about',
        title: 'Acerca',
        loadComponent: () =>
          import('./pages/client/about/about.component').then(
            (c) => c.AboutComponent,
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/client/notifications/notifications.component').then(
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
