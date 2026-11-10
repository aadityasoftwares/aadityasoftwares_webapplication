import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ADMIN_API_ENDPOINTS } from '../constants/admin-api.constants';

export interface IMediaUploadRequest {
  fileName: string;
  mimeType: string;
  size: number;
  mediaType: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'OTHER';
  purpose: 'COVER' | 'CONTENT' | 'AVATAR' | 'PROFILE_IMAGE' | 'THUMBNAIL' | 'OTHER';
  visibility: 'PUBLIC' | 'PRIVATE';
  resourceType?: string;
  resourceId?: string;
}

export interface IMediaUploadResponse {
  mediaId: string;
  uploadUrl: string;
  requiredHeaders?: Record<string, string>;
  publicUrl?: string;
}

export interface IMediaItem {
  _id: string;
  storageKey: string;
  publicUrl: string;
  originalFileName: string;
  mimeType: string;
  size: number;
  status: string;
  purpose: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminMediaService {
  private readonly http = inject(HttpClient);

  requestUpload(request: IMediaUploadRequest): Observable<IMediaUploadResponse> {
    return this.http
      .post<{ status: boolean; message: string; data: IMediaUploadResponse }>(
        ADMIN_API_ENDPOINTS.media.requestUpload,
        request,
      )
      .pipe(map((res) => res.data));
  }

  completeUpload(mediaId: string): Observable<IMediaItem> {
    return this.http
      .post<{ status: boolean; message: string; data: IMediaItem }>(
        ADMIN_API_ENDPOINTS.media.completeUpload(mediaId),
        {},
      )
      .pipe(map((res) => res.data));
  }

  /**
   * Complete upload flow:
   * 1. Requests signed URL from backend
   * 2. PUTs file binary directly to Cloudflare R2 / S3
   * 3. Calls completeUpload to verify and activate media record
   */
  uploadFile(
    file: File,
    purpose: 'COVER' | 'CONTENT' | 'AVATAR' | 'PROFILE_IMAGE' | 'THUMBNAIL' = 'CONTENT',
    resourceType: string = 'BLOG',
    resourceId?: string,
  ): Observable<IMediaItem> {
    const payload: IMediaUploadRequest = {
      fileName: file.name,
      mimeType: file.type || 'image/jpeg',
      size: file.size,
      mediaType: 'IMAGE',
      purpose,
      visibility: 'PUBLIC',
      resourceType,
      ...(resourceId ? { resourceId } : {}),
    };

    return this.requestUpload(payload).pipe(
      switchMap((presigned) => {
        const uploadHeaders = presigned.requiredHeaders || {
          'Content-Type': file.type || 'image/jpeg',
        };

        // If uploadUrl is provided, upload directly to storage
        if (presigned.uploadUrl) {
          return from(
            fetch(presigned.uploadUrl, {
              method: 'PUT',
              headers: uploadHeaders,
              body: file,
            }).then((resp) => {
              if (!resp.ok) {
                throw new Error(`Storage upload failed with HTTP ${resp.status}`);
              }
              return presigned.mediaId;
            }),
          ).pipe(switchMap((mediaId) => this.completeUpload(mediaId)));
        }

        // If no uploadUrl (already active or mock), complete directly
        return this.completeUpload(presigned.mediaId);
      }),
    );
  }

  getMediaList(page: number = 1, limit: number = 20): Observable<any> {
    return this.http.get(ADMIN_API_ENDPOINTS.media.getAll, {
      params: { page: page.toString(), limit: limit.toString() },
    });
  }

  deleteMedia(mediaId: string): Observable<any> {
    return this.http.delete(ADMIN_API_ENDPOINTS.media.delete(mediaId));
  }
}

