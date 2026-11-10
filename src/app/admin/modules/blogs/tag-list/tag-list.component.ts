import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogTagStatus } from '../../../core/constants/blog.constants';
import { IBlogTag } from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { BlogWebsiteSelectorComponent } from '../components/website-selector/website-selector.component';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogWebsiteSelectorComponent],
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  private readonly blogService = inject(AdminBlogService);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogTagStatus = BlogTagStatus;

  readonly tags = signal<IBlogTag[]>([]);
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
  formName = '';
  formSlug = '';
  formDescription = '';
  formStatus: BlogTagStatus = BlogTagStatus.ACTIVE;

  // Delete modal
  readonly isDeleteModalOpen = signal<boolean>(false);
  tagToDelete: IBlogTag | null = null;

  constructor() {
    effect(() => {
      const siteId = this.contextStore.selectedWebsiteId();
      if (siteId) {
        this.loadTags();
      }
    });
  }

  ngOnInit(): void {
    if (this.contextStore.selectedWebsiteId()) {
      this.loadTags();
    }
  }

  loadTags(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!websiteId) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, any> = {
      websiteId,
      limit: 100,
      sortBy: 'name',
      sortOrder: 'asc',
    };

    if (this.searchQuery().trim()) filter['search'] = this.searchQuery().trim();
    if (this.selectedStatus() !== 'ALL') filter['status'] = this.selectedStatus();

    this.blogService.getTags(filter).subscribe({
      next: (res) => {
        this.tags.set(res?.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load tags');
        this.isLoading.set(false);
      },
    });
  }

  onNameChange(): void {
    if (!this.isEditMode()) {
      this.formSlug = this.formName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingId = null;
    this.formName = '';
    this.formSlug = '';
    this.formDescription = '';
    this.formStatus = BlogTagStatus.ACTIVE;
    this.isModalOpen.set(true);
  }

  openEditModal(tag: IBlogTag): void {
    this.isEditMode.set(true);
    this.editingId = tag._id;
    this.formName = tag.name;
    this.formSlug = tag.slug;
    this.formDescription = tag.description || '';
    this.formStatus = tag.status;
    this.isModalOpen.set(true);
  }

  saveTag(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!this.formName.trim() || !this.formSlug.trim() || !websiteId) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload: Partial<IBlogTag> = {
      websiteId,
      name: this.formName.trim(),
      slug: this.formSlug.trim(),
      description: this.formDescription.trim(),
      status: this.formStatus,
    };

    if (this.isEditMode() && this.editingId) {
      this.blogService.updateTag(this.editingId, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Tag updated successfully');
          this.loadTags();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update tag');
        },
      });
    } else {
      this.blogService.createTag(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Tag created successfully');
          this.loadTags();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create tag');
        },
      });
    }
  }

  openDeleteModal(tag: IBlogTag): void {
    this.tagToDelete = tag;
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    if (!this.tagToDelete) return;

    this.isSaving.set(true);
    this.blogService.deleteTag(this.tagToDelete._id).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isDeleteModalOpen.set(false);
        this.successMessage.set('Tag deleted');
        this.loadTags();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to delete tag');
      },
    });
  }
}

