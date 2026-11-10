import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';
import { IInvoice, IInvoiceFilter } from '../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminInvoiceService {
  private readonly http = inject(HttpClient);

  getAll(filter: IInvoiceFilter = {}): Observable<ApiListResponse<IInvoice>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.status) params = params.set('status', filter.status);
    if (filter.clientId) params = params.set('clientId', filter.clientId);

    return this.http.get<ApiListResponse<IInvoice>>(ADMIN_API_ENDPOINTS.invoices.base, { params });
  }

  getById(id: string): Observable<ApiResponse<IInvoice>> {
    return this.http.get<ApiResponse<IInvoice>>(ADMIN_API_ENDPOINTS.invoices.byId(id));
  }

  create(data: Partial<IInvoice>): Observable<ApiResponse<IInvoice>> {
    return this.http.post<ApiResponse<IInvoice>>(ADMIN_API_ENDPOINTS.invoices.base, data);
  }

  update(id: string, data: Partial<IInvoice>): Observable<ApiResponse<IInvoice>> {
    return this.http.put<ApiResponse<IInvoice>>(ADMIN_API_ENDPOINTS.invoices.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.invoices.byId(id));
  }

  getInvoices(filter: IInvoiceFilter = {}): Observable<ApiListResponse<IInvoice>> {
    return this.getAll(filter);
  }

  createInvoice(data: any): Observable<ApiResponse<IInvoice>> {
    return this.create(data);
  }

  updateInvoice(id: string, data: Partial<IInvoice>): Observable<ApiResponse<IInvoice>> {
    return this.update(id, data);
  }

  deleteInvoice(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http.get(ADMIN_API_ENDPOINTS.invoices.byId(id) + '/pdf', {
      responseType: 'blob',
    });
  }

  sendEmail(id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(ADMIN_API_ENDPOINTS.invoices.byId(id) + '/send-email', {});
  }

  cancelInvoice(id: string, reason: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(ADMIN_API_ENDPOINTS.invoices.byId(id) + '/cancel', { reason });
  }
}
