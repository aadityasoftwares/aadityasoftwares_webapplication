import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';
import { IExpense, IExpenseCreateInput, IExpenseFilter } from '../interfaces/expense.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminExpenseService {
  private readonly http = inject(HttpClient);

  getAll(filter: IExpenseFilter = {}): Observable<ApiListResponse<IExpense>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.category) params = params.set('category', filter.category);

    return this.http.get<ApiListResponse<IExpense>>(ADMIN_API_ENDPOINTS.expenses.base, { params });
  }

  getById(id: string): Observable<ApiResponse<IExpense>> {
    return this.http.get<ApiResponse<IExpense>>(ADMIN_API_ENDPOINTS.expenses.byId(id));
  }

  create(data: IExpenseCreateInput): Observable<ApiResponse<IExpense>> {
    return this.http.post<ApiResponse<IExpense>>(ADMIN_API_ENDPOINTS.expenses.base, data);
  }

  update(id: string, data: Partial<IExpenseCreateInput>): Observable<ApiResponse<IExpense>> {
    return this.http.put<ApiResponse<IExpense>>(ADMIN_API_ENDPOINTS.expenses.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.expenses.byId(id));
  }

  getExpenses(filter: IExpenseFilter = {}): Observable<ApiListResponse<IExpense>> {
    return this.getAll(filter);
  }

  createExpense(data: IExpenseCreateInput): Observable<ApiResponse<IExpense>> {
    return this.create(data);
  }

  updateExpense(id: string, data: Partial<IExpenseCreateInput>): Observable<ApiResponse<IExpense>> {
    return this.update(id, data);
  }

  deleteExpense(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }
}
