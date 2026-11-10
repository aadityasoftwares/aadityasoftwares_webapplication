import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';
import {
  IBlog,
  IBlogAuthor,
  IBlogAuthorFilter,
  IBlogCategory,
  IBlogCategoryFilter,
  IBlogListFilter,
  IBlogRedirect,
  IBlogRedirectFilter,
  IBlogRevision,
  IBlogTag,
  IBlogTagFilter,
  IBlogWebsite,
} from '../interfaces/blog.interface';

export interface PaginatedResponse<T> {
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

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class AdminBlogService {
  private readonly http = inject(HttpClient);

  private buildParams(filterObj: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.keys(filterObj).forEach((key) => {
      const val = filterObj[key];
      if (val !== undefined && val !== null && val !== '') {
        params = params.set(key, String(val));
      }
    });
    return params;
  }

  // --- Websites ---
  getWebsites(page: number = 1, limit: number = 50): Observable<PaginatedResponse<IBlogWebsite>> {
    return this.http.get<PaginatedResponse<IBlogWebsite>>(
      ADMIN_API_ENDPOINTS.blogs.websites.base,
      { params: { page: page.toString(), limit: limit.toString() } },
    );
  }

  getWebsiteById(id: string): Observable<ApiResponse<IBlogWebsite>> {
    return this.http.get<ApiResponse<IBlogWebsite>>(ADMIN_API_ENDPOINTS.blogs.websites.byId(id));
  }

  createWebsite(payload: Partial<IBlogWebsite>): Observable<ApiResponse<IBlogWebsite>> {
    return this.http.post<ApiResponse<IBlogWebsite>>(
      ADMIN_API_ENDPOINTS.blogs.websites.base,
      payload,
    );
  }

  updateWebsite(id: string, payload: Partial<IBlogWebsite>): Observable<ApiResponse<IBlogWebsite>> {
    return this.http.put<ApiResponse<IBlogWebsite>>(
      ADMIN_API_ENDPOINTS.blogs.websites.byId(id),
      payload,
    );
  }

  updateWebsiteStatus(id: string, status: string): Observable<ApiResponse<IBlogWebsite>> {
    return this.http.patch<ApiResponse<IBlogWebsite>>(
      ADMIN_API_ENDPOINTS.blogs.websites.status(id),
      { status },
    );
  }

  // --- Categories ---
  getCategories(filter: IBlogCategoryFilter): Observable<PaginatedResponse<IBlogCategory>> {
    return this.http.get<PaginatedResponse<IBlogCategory>>(
      ADMIN_API_ENDPOINTS.blogs.categories.base,
      { params: this.buildParams(filter) },
    );
  }

  getCategoryById(id: string): Observable<ApiResponse<IBlogCategory>> {
    return this.http.get<ApiResponse<IBlogCategory>>(
      ADMIN_API_ENDPOINTS.blogs.categories.byId(id),
    );
  }

  createCategory(payload: Partial<IBlogCategory>): Observable<ApiResponse<IBlogCategory>> {
    return this.http.post<ApiResponse<IBlogCategory>>(
      ADMIN_API_ENDPOINTS.blogs.categories.base,
      payload,
    );
  }

  updateCategory(id: string, payload: Partial<IBlogCategory>): Observable<ApiResponse<IBlogCategory>> {
    return this.http.put<ApiResponse<IBlogCategory>>(
      ADMIN_API_ENDPOINTS.blogs.categories.byId(id),
      payload,
    );
  }

  deleteCategory(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ADMIN_API_ENDPOINTS.blogs.categories.byId(id));
  }

  // --- Tags ---
  getTags(filter: IBlogTagFilter): Observable<PaginatedResponse<IBlogTag>> {
    return this.http.get<PaginatedResponse<IBlogTag>>(
      ADMIN_API_ENDPOINTS.blogs.tags.base,
      { params: this.buildParams(filter) },
    );
  }

  getTagById(id: string): Observable<ApiResponse<IBlogTag>> {
    return this.http.get<ApiResponse<IBlogTag>>(ADMIN_API_ENDPOINTS.blogs.tags.byId(id));
  }

  createTag(payload: Partial<IBlogTag>): Observable<ApiResponse<IBlogTag>> {
    return this.http.post<ApiResponse<IBlogTag>>(ADMIN_API_ENDPOINTS.blogs.tags.base, payload);
  }

  updateTag(id: string, payload: Partial<IBlogTag>): Observable<ApiResponse<IBlogTag>> {
    return this.http.put<ApiResponse<IBlogTag>>(
      ADMIN_API_ENDPOINTS.blogs.tags.byId(id),
      payload,
    );
  }

  deleteTag(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ADMIN_API_ENDPOINTS.blogs.tags.byId(id));
  }

  // --- Authors ---
  getAuthors(filter: IBlogAuthorFilter): Observable<PaginatedResponse<IBlogAuthor>> {
    return this.http.get<PaginatedResponse<IBlogAuthor>>(
      ADMIN_API_ENDPOINTS.blogs.authors.base,
      { params: this.buildParams(filter) },
    );
  }

  getAuthorById(id: string): Observable<ApiResponse<IBlogAuthor>> {
    return this.http.get<ApiResponse<IBlogAuthor>>(ADMIN_API_ENDPOINTS.blogs.authors.byId(id));
  }

  createAuthor(payload: Partial<IBlogAuthor>): Observable<ApiResponse<IBlogAuthor>> {
    return this.http.post<ApiResponse<IBlogAuthor>>(
      ADMIN_API_ENDPOINTS.blogs.authors.base,
      payload,
    );
  }

  updateAuthor(id: string, payload: Partial<IBlogAuthor>): Observable<ApiResponse<IBlogAuthor>> {
    return this.http.put<ApiResponse<IBlogAuthor>>(
      ADMIN_API_ENDPOINTS.blogs.authors.byId(id),
      payload,
    );
  }

  deleteAuthor(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ADMIN_API_ENDPOINTS.blogs.authors.byId(id));
  }

  // --- Redirects ---
  getRedirects(filter: IBlogRedirectFilter): Observable<PaginatedResponse<IBlogRedirect>> {
    return this.http.get<PaginatedResponse<IBlogRedirect>>(
      ADMIN_API_ENDPOINTS.blogs.redirects.base,
      { params: this.buildParams(filter) },
    );
  }

  createRedirect(payload: Partial<IBlogRedirect>): Observable<ApiResponse<IBlogRedirect>> {
    return this.http.post<ApiResponse<IBlogRedirect>>(
      ADMIN_API_ENDPOINTS.blogs.redirects.base,
      payload,
    );
  }

  updateRedirect(id: string, payload: Partial<IBlogRedirect>): Observable<ApiResponse<IBlogRedirect>> {
    return this.http.put<ApiResponse<IBlogRedirect>>(
      ADMIN_API_ENDPOINTS.blogs.redirects.byId(id),
      payload,
    );
  }

  deleteRedirect(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ADMIN_API_ENDPOINTS.blogs.redirects.byId(id));
  }

  // --- Blogs (Articles) ---
  getBlogs(filter: IBlogListFilter): Observable<PaginatedResponse<IBlog>> {
    return this.http.get<PaginatedResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.base, {
      params: this.buildParams(filter),
    });
  }

  getBlogById(id: string): Observable<ApiResponse<IBlog>> {
    return this.http.get<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.byId(id));
  }

  createBlog(payload: Partial<IBlog>): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.base, payload);
  }

  updateBlog(id: string, payload: Partial<IBlog>): Observable<ApiResponse<IBlog>> {
    return this.http.put<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.byId(id), payload);
  }

  deleteBlog(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(ADMIN_API_ENDPOINTS.blogs.byId(id));
  }

  publishBlog(id: string): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.publish(id), {});
  }

  unpublishBlog(id: string): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.unpublish(id), {});
  }

  scheduleBlog(id: string, scheduledAt: string): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.schedule(id), {
      scheduledAt,
    });
  }

  archiveBlog(id: string): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.archive(id), {});
  }

  previewBlog(id: string): Observable<ApiResponse<IBlog>> {
    return this.http.get<ApiResponse<IBlog>>(ADMIN_API_ENDPOINTS.blogs.preview(id));
  }

  getRevisions(blogId: string): Observable<ApiResponse<IBlogRevision[]>> {
    return this.http.get<ApiResponse<IBlogRevision[]>>(
      ADMIN_API_ENDPOINTS.blogs.revisions(blogId),
    );
  }

  restoreRevision(blogId: string, revisionId: string): Observable<ApiResponse<IBlog>> {
    return this.http.post<ApiResponse<IBlog>>(
      ADMIN_API_ENDPOINTS.blogs.restoreRevision(blogId, revisionId),
      {},
    );
  }
}

