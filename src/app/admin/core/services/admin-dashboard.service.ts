import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiResponse } from '../interfaces/common.interface';
import { IDashboardMetrics } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private readonly http = inject(HttpClient);

  getMetrics(): Observable<ApiResponse<IDashboardMetrics>> {
    return this.http.get<ApiResponse<IDashboardMetrics>>(ADMIN_API_ENDPOINTS.dashboard.metrics);
  }
}

