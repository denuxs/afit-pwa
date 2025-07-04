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
        loadChildren: () => import('./pages/profile/profile.routes'),
      },
      {
        path: 'clients',
        title: 'Clientes',
        // canActivate: [authGuard],
        loadChildren: () => import('./pages/clients/clients.routes'),
      },
      {
        path: 'routines',
        title: 'Rutinas',
        loadChildren: () => import('./pages/routines/routines.routes'),
      },
      {
        path: 'exercises/:id',
        title: 'Ejercicio',
        loadComponent: () =>
          import('./pages/exercise/exercise.component').then(
            (c) => c.ExerciseComponent,
          ),
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
