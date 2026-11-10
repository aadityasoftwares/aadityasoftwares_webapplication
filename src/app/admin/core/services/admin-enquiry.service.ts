import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import { ApiListResponse, ApiResponse } from '../interfaces/common.interface';
import {
  IEnquiry,
  IEnquiryCreateInput,
  IEnquiryFilter,
  IEnquiryFollowUp,
  IEnquiryUpdateInput,
} from '../interfaces/enquiry.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminEnquiryService {
  private readonly http = inject(HttpClient);

  getAll(filter: IEnquiryFilter = {}): Observable<ApiListResponse<IEnquiry>> {
    let params = new HttpParams();
    if (filter.page) params = params.set('page', filter.page.toString());
    if (filter.limit) params = params.set('limit', filter.limit.toString());
    if (filter.search) params = params.set('search', filter.search.trim());
    if (filter.status) params = params.set('status', filter.status);
    if (filter.priority) params = params.set('priority', filter.priority);
    if (filter.source) params = params.set('source', filter.source);
    if (filter.assignedTo) params = params.set('assignedTo', filter.assignedTo);
    if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);

    return this.http.get<ApiListResponse<IEnquiry>>(ADMIN_API_ENDPOINTS.enquiries.base, { params });
  }

  getById(id: string): Observable<ApiResponse<IEnquiry>> {
    return this.http.get<ApiResponse<IEnquiry>>(ADMIN_API_ENDPOINTS.enquiries.byId(id));
  }

  create(data: IEnquiryCreateInput): Observable<ApiResponse<IEnquiry>> {
    return this.http.post<ApiResponse<IEnquiry>>(ADMIN_API_ENDPOINTS.enquiries.base, data);
  }

  update(id: string, data: IEnquiryUpdateInput): Observable<ApiResponse<IEnquiry>> {
    return this.http.put<ApiResponse<IEnquiry>>(ADMIN_API_ENDPOINTS.enquiries.byId(id), data);
  }

  delete(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(ADMIN_API_ENDPOINTS.enquiries.byId(id));
  }

  assign(id: string, assignedTo: string): Observable<ApiResponse<IEnquiry>> {
    return this.http.post<ApiResponse<IEnquiry>>(ADMIN_API_ENDPOINTS.enquiries.assign(id), {
      assignedTo,
    });
  }

  convertToClient(id: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(ADMIN_API_ENDPOINTS.enquiries.convert(id), {});
  }

  addFollowUp(id: string, followUp: Partial<IEnquiryFollowUp>): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(ADMIN_API_ENDPOINTS.enquiries.followUps(id), followUp);
  }

  getFollowUps(id: string): Observable<ApiResponse<IEnquiryFollowUp[]>> {
    return this.http.get<ApiResponse<IEnquiryFollowUp[]>>(ADMIN_API_ENDPOINTS.enquiries.followUps(id));
  }

  getEnquiries(filter: IEnquiryFilter = {}): Observable<ApiListResponse<IEnquiry>> {
    return this.getAll(filter);
  }

  createEnquiry(data: IEnquiryCreateInput): Observable<ApiResponse<IEnquiry>> {
    return this.create(data);
  }

  updateEnquiry(id: string, data: IEnquiryUpdateInput): Observable<ApiResponse<IEnquiry>> {
    return this.update(id, data);
  }

  deleteEnquiry(id: string): Observable<ApiResponse<null>> {
    return this.delete(id);
  }
}
