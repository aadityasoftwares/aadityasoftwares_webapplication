import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthStore } from '../state/admin-auth.store';

export const adminAuthGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AdminAuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/admin/login'], {
    queryParams: { returnUrl: state.url },
  });
};

export const adminGuestGuard: CanActivateFn = () => {
  const authStore = inject(AdminAuthStore);
  const router = inject(Router);

  if (authStore.isAuthenticated()) {
    return router.createUrlTree(['/admin/dashboard']);
  }

  return true;
};

