import { Injectable, computed, inject, signal } from '@angular/core';
import { AdminBlogService } from '../services/admin-blog.service';
import { IBlogWebsite } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminBlogContextStore {
  private readonly blogService = inject(AdminBlogService);

  readonly websites = signal<IBlogWebsite[]>([]);
  readonly selectedWebsiteId = signal<string>('');
  readonly isLoadingWebsites = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly selectedWebsite = computed<IBlogWebsite | null>(() => {
    const list = this.websites();
    const id = this.selectedWebsiteId();
    if (!list.length) return null;
    return list.find((w) => w._id === id || w.slug === id) || list[0];
  });

  constructor() {
    this.loadWebsites();
  }

  loadWebsites(): void {
    this.isLoadingWebsites.set(true);
    this.error.set(null);

    this.blogService.getWebsites(1, 50).subscribe({
      next: (res) => {
        const sites = res?.data || [];
        this.websites.set(sites);
        if (sites.length > 0 && !this.selectedWebsiteId()) {
          // Default to Aaditya Softwares or first active website
          const aaditya = sites.find((s) => s.slug === 'aaditya-softwares') || sites[0];
          this.selectedWebsiteId.set(aaditya._id);
        }
        this.isLoadingWebsites.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message || 'Failed to load blog websites');
        this.isLoadingWebsites.set(false);
      },
    });
  }

  setWebsiteId(id: string): void {
    this.selectedWebsiteId.set(id);
  }
}

