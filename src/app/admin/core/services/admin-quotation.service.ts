import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';
import { IQuotation, IQuotationFilter } from '../interfaces/quotation.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminQuotationService {
  private readonly http = inject(HttpClient);

  getAll(filter: IQuotationFilter = {}): Observable<ApiListResponse<IQuotation>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.status) params = params.set('status', filter.status);
    if (filter.clientId) params = params.set('clientId', filter.clientId);

    return this.http.get<ApiListResponse<IQuotation>>(ADMIN_API_ENDPOINTS.quotations.base, { params });
  }

  getById(id: string): Observable<ApiResponse<IQuotation>> {
    return this.http.get<ApiResponse<IQuotation>>(ADMIN_API_ENDPOINTS.quotations.byId(id));
  }

  create(data: Partial<IQuotation>): Observable<ApiResponse<IQuotation>> {
    return this.http.post<ApiResponse<IQuotation>>(ADMIN_API_ENDPOINTS.quotations.base, data);
  }

  update(id: string, data: Partial<IQuotation>): Observable<ApiResponse<IQuotation>> {
    return this.http.put<ApiResponse<IQuotation>>(ADMIN_API_ENDPOINTS.quotations.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.quotations.byId(id));
  }

  getQuotations(filter: IQuotationFilter = {}): Observable<ApiListResponse<IQuotation>> {
    return this.getAll(filter);
  }

  createQuotation(data: any): Observable<ApiResponse<IQuotation>> {
    return this.create(data);
  }

  updateQuotation(id: string, data: Partial<IQuotation>): Observable<ApiResponse<IQuotation>> {
    return this.update(id, data);
  }

  deleteQuotation(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(ADMIN_API_ENDPOINTS.quotations.byId(id) + '/pdf', {
      responseType: 'blob',
    });
  }
}
