import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { IClient, IClientCreateInput, IClientFilter } from '../interfaces/client.interface';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminClientService {
  private readonly http = inject(HttpClient);

  getAll(filter: IClientFilter = {}): Observable<ApiListResponse<IClient>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.status) params = params.set('status', filter.status);
    if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);

    return this.http.get<ApiListResponse<IClient>>(ADMIN_API_ENDPOINTS.clients.base, { params });
  }

  getById(id: string): Observable<ApiResponse<IClient>> {
    return this.http.get<ApiResponse<IClient>>(ADMIN_API_ENDPOINTS.clients.byId(id));
  }

  create(data: IClientCreateInput): Observable<ApiResponse<IClient>> {
    return this.http.post<ApiResponse<IClient>>(ADMIN_API_ENDPOINTS.clients.base, data);
  }

  update(id: string, data: Partial<IClientCreateInput>): Observable<ApiResponse<IClient>> {
    return this.http.put<ApiResponse<IClient>>(ADMIN_API_ENDPOINTS.clients.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.clients.byId(id));
  }

  getClients(filter: IClientFilter = {}): Observable<ApiListResponse<IClient>> {
    return this.getAll(filter);
  }

  createClient(data: IClientCreateInput): Observable<ApiResponse<IClient>> {
    return this.create(data);
  }

  updateClient(id: string, data: Partial<IClientCreateInput>): Observable<ApiResponse<IClient>> {
    return this.update(id, data);
  }

  deleteClient(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }
}
