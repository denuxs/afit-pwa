import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const _router: Router = inject(Router);
  const _authService = inject(AuthService);

  if (_authService.check()) {
    return of(_router.parseUrl(''));
  }

  return of(true);
};
