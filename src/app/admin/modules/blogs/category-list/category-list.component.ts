import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogCategoryStatus } from '../../../core/constants/blog.constants';
import { IBlogCategory } from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { BlogWebsiteSelectorComponent } from '../components/website-selector/website-selector.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogWebsiteSelectorComponent],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  private readonly blogService = inject(AdminBlogService);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogCategoryStatus = BlogCategoryStatus;

  readonly categories = signal<IBlogCategory[]>([]);
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
  formStatus: BlogCategoryStatus = BlogCategoryStatus.ACTIVE;
  formParentId: string | null = null;

  // Delete confirmation
  readonly isDeleteModalOpen = signal<boolean>(false);
  categoryToDelete: IBlogCategory | null = null;

  constructor() {
    effect(() => {
      const siteId = this.contextStore.selectedWebsiteId();
      if (siteId) {
        this.loadCategories();
      }
    });
  }

  ngOnInit(): void {
    if (this.contextStore.selectedWebsiteId()) {
      this.loadCategories();
    }
  }

  loadCategories(): void {
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

    this.blogService.getCategories(filter).subscribe({
      next: (res) => {
        this.categories.set(res?.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load categories');
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
    this.formStatus = BlogCategoryStatus.ACTIVE;
    this.formParentId = null;
    this.isModalOpen.set(true);
  }

  openEditModal(cat: IBlogCategory): void {
    this.isEditMode.set(true);
    this.editingId = cat._id;
    this.formName = cat.name;
    this.formSlug = cat.slug;
    this.formDescription = cat.description || '';
    this.formStatus = cat.status;
    this.formParentId =
      cat.parentCategoryId && typeof cat.parentCategoryId === 'object'
        ? cat.parentCategoryId._id
        : (cat.parentCategoryId as string) || null;
    this.isModalOpen.set(true);
  }

  saveCategory(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!this.formName.trim() || !this.formSlug.trim() || !websiteId) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload: Partial<IBlogCategory> = {
      websiteId,
      name: this.formName.trim(),
      slug: this.formSlug.trim(),
      description: this.formDescription.trim(),
      status: this.formStatus,
      parentCategoryId: this.formParentId || null,
    };

    if (this.isEditMode() && this.editingId) {
      this.blogService.updateCategory(this.editingId, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Category updated successfully');
          this.loadCategories();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update category');
        },
      });
    } else {
      this.blogService.createCategory(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Category created successfully');
          this.loadCategories();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create category');
        },
      });
    }
  }

  openDeleteModal(cat: IBlogCategory): void {
    this.categoryToDelete = cat;
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    if (!this.categoryToDelete) return;

    this.isSaving.set(true);
    this.blogService.deleteCategory(this.categoryToDelete._id).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isDeleteModalOpen.set(false);
        this.successMessage.set('Category deleted');
        this.loadCategories();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to delete category');
      },
    });
  }
}

