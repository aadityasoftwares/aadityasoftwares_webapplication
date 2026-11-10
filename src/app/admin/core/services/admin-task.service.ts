import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';
import { ITask, ITaskCreateInput, ITaskFilter } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminTaskService {
  private readonly http = inject(HttpClient);

  getAll(filter: ITaskFilter = {}): Observable<ApiListResponse<ITask>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.status) params = params.set('status', filter.status);
    if (filter.priority) params = params.set('priority', filter.priority);
    if (filter.assignedTo) params = params.set('assignedTo', filter.assignedTo);

    return this.http.get<ApiListResponse<ITask>>(ADMIN_API_ENDPOINTS.tasks.base, { params });
  }

  getById(id: string): Observable<ApiResponse<ITask>> {
    return this.http.get<ApiResponse<ITask>>(ADMIN_API_ENDPOINTS.tasks.byId(id));
  }

  create(data: ITaskCreateInput): Observable<ApiResponse<ITask>> {
    return this.http.post<ApiResponse<ITask>>(ADMIN_API_ENDPOINTS.tasks.base, data);
  }

  update(id: string, data: Partial<ITaskCreateInput>): Observable<ApiResponse<ITask>> {
    return this.http.put<ApiResponse<ITask>>(ADMIN_API_ENDPOINTS.tasks.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.tasks.byId(id));
  }

  getTasks(filter: ITaskFilter = {}): Observable<ApiListResponse<ITask>> {
    return this.getAll(filter);
  }

  createTask(data: ITaskCreateInput): Observable<ApiResponse<ITask>> {
    return this.create(data);
  }

  updateTask(id: string, data: Partial<ITaskCreateInput>): Observable<ApiResponse<ITask>> {
    return this.update(id, data);
  }

  deleteTask(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }
}
