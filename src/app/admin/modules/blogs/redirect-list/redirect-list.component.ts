import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BlogRedirectStatus,
  BlogRedirectType,
} from '../../../core/constants/blog.constants';
import { IBlogRedirect } from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { BlogWebsiteSelectorComponent } from '../components/website-selector/website-selector.component';

@Component({
  selector: 'app-redirect-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogWebsiteSelectorComponent],
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.scss'],
})
export class RedirectListComponent implements OnInit {
  private readonly blogService = inject(AdminBlogService);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogRedirectType = BlogRedirectType;
  readonly BlogRedirectStatus = BlogRedirectStatus;

  readonly redirects = signal<IBlogRedirect[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');

  // Modal State
  readonly isModalOpen = signal<boolean>(false);
  readonly isEditMode = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  editingId: string | null = null;

  // Form model
  formSourcePath = '';
  formDestinationPath = '';
  formRedirectType: BlogRedirectType = BlogRedirectType.PERMANENT;
  formStatus: BlogRedirectStatus = BlogRedirectStatus.ACTIVE;

  // Delete modal
  readonly isDeleteModalOpen = signal<boolean>(false);
  redirectToDelete: IBlogRedirect | null = null;

  constructor() {
    effect(() => {
      const siteId = this.contextStore.selectedWebsiteId();
      if (siteId) {
        this.loadRedirects();
      }
    });
  }

  ngOnInit(): void {
    if (this.contextStore.selectedWebsiteId()) {
      this.loadRedirects();
    }
  }

  loadRedirects(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!websiteId) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, any> = {
      websiteId,
      limit: 100,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (this.searchQuery().trim()) filter['search'] = this.searchQuery().trim();
    if (this.selectedStatus() !== 'ALL') filter['status'] = this.selectedStatus();

    this.blogService.getRedirects(filter).subscribe({
      next: (res) => {
        this.redirects.set(res?.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load redirects');
        this.isLoading.set(false);
      },
    });
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingId = null;
    this.formSourcePath = '';
    this.formDestinationPath = '';
    this.formRedirectType = BlogRedirectType.PERMANENT;
    this.formStatus = BlogRedirectStatus.ACTIVE;
    this.isModalOpen.set(true);
  }

  openEditModal(redirect: IBlogRedirect): void {
    this.isEditMode.set(true);
    this.editingId = redirect._id;
    this.formSourcePath = redirect.sourcePath;
    this.formDestinationPath = redirect.destinationPath;
    this.formRedirectType = redirect.redirectType;
    this.formStatus = redirect.status;
    this.isModalOpen.set(true);
  }

  saveRedirect(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    const source = this.formSourcePath.trim();
    const destination = this.formDestinationPath.trim();

    if (!source || !destination || !websiteId) return;

    // Loop check
    if (source.toLowerCase() === destination.toLowerCase()) {
      this.errorMessage.set('Source path and destination path cannot be identical (redirect loop).');
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload: Partial<IBlogRedirect> = {
      websiteId,
      sourcePath: source.startsWith('/') ? source : `/${source}`,
      destinationPath: destination,
      redirectType: Number(this.formRedirectType) as BlogRedirectType,
      status: this.formStatus,
    };

    if (this.isEditMode() && this.editingId) {
      this.blogService.updateRedirect(this.editingId, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Redirect updated successfully');
          this.loadRedirects();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update redirect');
        },
      });
    } else {
      this.blogService.createRedirect(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Redirect created successfully');
          this.loadRedirects();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create redirect');
        },
      });
    }
  }

  openDeleteModal(redirect: IBlogRedirect): void {
    this.redirectToDelete = redirect;
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    if (!this.redirectToDelete) return;

    this.isSaving.set(true);
    this.blogService.deleteRedirect(this.redirectToDelete._id).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isDeleteModalOpen.set(false);
        this.successMessage.set('Redirect removed');
        this.loadRedirects();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to delete redirect');
      },
    });
  }
}

