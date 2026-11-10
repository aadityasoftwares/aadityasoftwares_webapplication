import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import {
  AdminUser,
  AuthSessionData,
  ChangePasswordCredentials,
  ForgotPasswordCredentials,
  LoginCredentials,
  ResetPasswordCredentials,
} from '../interfaces/auth.interface';
import { ApiResponse } from '../interfaces/common.interface';
import { AdminAuthStore } from '../state/admin-auth.store';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AdminAuthStore);
  private readonly router = inject(Router);

  login(credentials: LoginCredentials): Observable<ApiResponse<AuthSessionData>> {
    this.authStore.setLoading(true);
    return this.http
      .post<ApiResponse<AuthSessionData>>(ADMIN_API_ENDPOINTS.auth.login, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (response) => {
            if (response && response.data) {
              this.authStore.setSession(response.data);
            }
            this.authStore.setLoading(false);
          },
          error: () => {
            this.authStore.setLoading(false);
          },
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(ADMIN_API_ENDPOINTS.auth.logout, {}, { withCredentials: true })
      .pipe(
        catchError(() => of(null)),
        tap(() => {
          this.authStore.clearSession();
          this.router.navigate(['/admin/login']);
        }),
      );
  }

  refreshToken(): Observable<ApiResponse<AuthSessionData>> {
    return this.http
      .post<ApiResponse<AuthSessionData>>(
        ADMIN_API_ENDPOINTS.auth.refreshToken,
        {},
        { withCredentials: true },
      )
      .pipe(
        tap((res) => {
          if (res?.data?.tokens?.accessToken) {
            this.authStore.setAccessToken(res.data.tokens.accessToken);
          }
        }),
      );
  }

  forgotPassword(data: ForgotPasswordCredentials): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ADMIN_API_ENDPOINTS.auth.forgotPassword, data);
  }

  resetPassword(data: ResetPasswordCredentials): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ADMIN_API_ENDPOINTS.auth.resetPassword, data);
  }

  changePassword(data: ChangePasswordCredentials): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ADMIN_API_ENDPOINTS.auth.changePassword, data);
  }

  getCurrentUser(): Observable<ApiResponse<AdminUser>> {
    return this.http.get<ApiResponse<AdminUser>>(ADMIN_API_ENDPOINTS.auth.me);
  }
}
