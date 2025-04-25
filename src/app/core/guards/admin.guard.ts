import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from 'app/core/services';
import { User } from 'app/domain';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router: Router = inject(Router);
  const _authService = inject(AuthService);
  const _userService = inject(UserService);

  if (!_authService.check()) {
    _router.navigateByUrl('/signin');
    return false;
  }

  _userService.profile().subscribe();

  return _userService.user$.pipe(
    map((user: User) => {
      if (user.is_active) {
        return true;
      }

      _router.navigateByUrl('/signin');
      return false;
    }),
  );
};
