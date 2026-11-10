import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IBlog,
  IBlogAuthor,
  IBlogCategory,
  IBlogTag,
} from '../../../../admin/core/interfaces/blog.interface';

export interface PublicPaginatedResponse<T> {
  status: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PublicApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class PublicBlogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/public/blog`;
  readonly websiteSlug = 'aaditya-softwares';

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-website-slug': this.websiteSlug,
    });
  }

  private buildParams(filterObj: Record<string, any>): HttpParams {
    let params = new HttpParams().set('websiteSlug', this.websiteSlug);
    Object.keys(filterObj).forEach((key) => {
      const val = filterObj[key];
      if (val !== undefined && val !== null && val !== '') {
        params = params.set(key, String(val));
      }
    });
    return params;
  }

  getArticles(filter: Record<string, any> = {}): Observable<PublicPaginatedResponse<IBlog>> {
    return this.http.get<PublicPaginatedResponse<IBlog>>(this.baseUrl, {
      headers: this.headers,
      params: this.buildParams(filter),
    });
  }

  getArticleBySlug(slug: string): Observable<PublicApiResponse<IBlog>> {
    return this.http.get<PublicApiResponse<IBlog>>(`${this.baseUrl}/${slug}`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug),
    });
  }

  getCategories(): Observable<PublicPaginatedResponse<IBlogCategory>> {
    return this.http.get<PublicPaginatedResponse<IBlogCategory>>(`${this.baseUrl}/categories`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug).set('limit', '100'),
    });
  }

  getCategoryBySlug(slug: string): Observable<PublicApiResponse<IBlogCategory>> {
    return this.http.get<PublicApiResponse<IBlogCategory>>(`${this.baseUrl}/categories/${slug}`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug),
    });
  }

  getTags(): Observable<PublicPaginatedResponse<IBlogTag>> {
    return this.http.get<PublicPaginatedResponse<IBlogTag>>(`${this.baseUrl}/tags`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug).set('limit', '100'),
    });
  }

  getTagBySlug(slug: string): Observable<PublicApiResponse<IBlogTag>> {
    return this.http.get<PublicApiResponse<IBlogTag>>(`${this.baseUrl}/tags/${slug}`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug),
    });
  }

  getAuthors(): Observable<PublicPaginatedResponse<IBlogAuthor>> {
    return this.http.get<PublicPaginatedResponse<IBlogAuthor>>(`${this.baseUrl}/authors`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug).set('limit', '50'),
    });
  }

  getAuthorBySlug(slug: string): Observable<PublicApiResponse<IBlogAuthor>> {
    return this.http.get<PublicApiResponse<IBlogAuthor>>(`${this.baseUrl}/authors/${slug}`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug),
    });
  }

  getRelatedArticles(blogId: string): Observable<PublicApiResponse<IBlog[]>> {
    return this.http.get<PublicApiResponse<IBlog[]>>(`${this.baseUrl}/related/${blogId}`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug),
    });
  }

  searchArticles(q: string, limit = 10): Observable<PublicApiResponse<IBlog[]>> {
    return this.http.get<PublicApiResponse<IBlog[]>>(`${this.baseUrl}/search`, {
      headers: this.headers,
      params: new HttpParams().set('websiteSlug', this.websiteSlug).set('q', q).set('limit', limit.toString()),
    });
  }
}

