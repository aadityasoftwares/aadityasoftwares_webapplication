import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminAuthStore } from '../state/admin-auth.store';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AdminAuthStore);
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  const isApi = req.url.startsWith(environment.apiUrl);
  if (!isApi) {
    return next(req);
  }

  const isAuthPublic =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/forgotpassword') ||
    req.url.includes('/auth/resetpassword');

  const token = authStore.accessToken();

  let cloned = req.clone({
    withCredentials: true,
  });

  if (token && !isAuthPublic) {
    cloned = cloned.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 on an authenticated API request and not already trying to refresh or login
      if (error.status === 401 && !isAuthPublic && !req.url.includes('/auth/refreshtoken')) {
        return authService.refreshToken().pipe(
          switchMap((refreshRes) => {
            const newToken = refreshRes?.data?.tokens?.accessToken;
            if (newToken) {
              const retry = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                },
                withCredentials: true,
              });
              return next(retry);
            }
            authStore.clearSession();
            router.navigate(['/admin/login']);
            return throwError(() => error);
          }),
          catchError((refreshErr) => {
            authStore.clearSession();
            router.navigate(['/admin/login']);
            return throwError(() => refreshErr);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};

