import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  inject,
  ENVIRONMENT_INITIALIZER,
  LOCALE_ID,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { environment } from '../environments/environment';
import { AuthService } from './core/auth/auth.service';
import { ToastMessageService } from './core/services/toast-message.service';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, httpErrorInterceptor]),
    ),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(AuthService),
      multi: true,
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector: '.app-dark' },
      },
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(ToastMessageService),
      multi: true,
    },
    provideAnimationsAsync(),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideMessaging(() => getMessaging()),
  ],
};
