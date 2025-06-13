import { Routes } from '@angular/router';

import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';
import { LayoutTabsComponent } from './layouts/layout-tabs/layout-tabs.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  {
    path: 'signin',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    component: LayoutTabsComponent,
    canActivate: [authGuard],
    // canActivateChild: [authGuard],
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
        path: 'clients',
        title: 'Clientes',
        // canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/clients/clients.component').then(
            (c) => c.ClientsComponent,
          ),
      },
      {
        path: 'workouts',
        title: 'Rutinas',
        loadChildren: () => import('./pages/workouts/workouts.routes'),
      },
      {
        path: 'routines',
        title: 'Rutinas',
        loadChildren: () => import('./pages/routines/routines.routes'),
      },
      {
        path: 'exercises',
        title: 'Ejercicios',
        loadChildren: () => import('./pages/exercises/exercises.routes'),
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
