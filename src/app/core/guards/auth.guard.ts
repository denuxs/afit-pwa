import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../services';
import { User } from 'app/domain';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _router: Router = inject(Router);

  const _authService = inject(AuthService);
  const _userService = inject(UserService);

  if (!_authService.check()) {
    _router.navigate(['/signin']);
    return false;
  }

  _userService.profile().subscribe();

  return _userService.user$.pipe(
    map((user: User) => {
      if (user.is_active) {
        return true;
      }

      _authService.logout();
      _router.navigate(['/signin']);
      return false;
    }),
  );
};
