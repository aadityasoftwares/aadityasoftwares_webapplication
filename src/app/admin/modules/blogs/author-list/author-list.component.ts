import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogAuthorStatus } from '../../../core/constants/blog.constants';
import { IBlogAuthor } from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminMediaService } from '../../../core/services/admin-media.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { BlogWebsiteSelectorComponent } from '../components/website-selector/website-selector.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogWebsiteSelectorComponent],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  private readonly blogService = inject(AdminBlogService);
  private readonly mediaService = inject(AdminMediaService);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogAuthorStatus = BlogAuthorStatus;

  readonly authors = signal<IBlogAuthor[]>([]);
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
  formDesignation = '';
  formBiography = '';
  formProfileImageMediaId: string | null = null;
  formProfileImageUrl: string | null = null;
  formTwitter = '';
  formLinkedin = '';
  formGithub = '';
  formWebsite = '';
  formStatus: BlogAuthorStatus = BlogAuthorStatus.ACTIVE;
  isUploadingAvatar = false;

  // Delete modal
  readonly isDeleteModalOpen = signal<boolean>(false);
  authorToDelete: IBlogAuthor | null = null;

  constructor() {
    effect(() => {
      const siteId = this.contextStore.selectedWebsiteId();
      if (siteId) {
        this.loadAuthors();
      }
    });
  }

  ngOnInit(): void {
    if (this.contextStore.selectedWebsiteId()) {
      this.loadAuthors();
    }
  }

  loadAuthors(): void {
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

    this.blogService.getAuthors(filter).subscribe({
      next: (res) => {
        this.authors.set(res?.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load authors');
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

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploadingAvatar = true;

    this.mediaService.uploadFile(file, 'PROFILE_IMAGE', 'BLOG').subscribe({
      next: (media) => {
        this.formProfileImageMediaId = media._id;
        this.formProfileImageUrl = media.publicUrl;
        this.isUploadingAvatar = false;
      },
      error: (err) => {
        this.errorMessage.set(err?.message || 'Failed to upload author photo');
        this.isUploadingAvatar = false;
      },
    });
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.editingId = null;
    this.formName = '';
    this.formSlug = '';
    this.formDesignation = '';
    this.formBiography = '';
    this.formProfileImageMediaId = null;
    this.formProfileImageUrl = null;
    this.formTwitter = '';
    this.formLinkedin = '';
    this.formGithub = '';
    this.formWebsite = '';
    this.formStatus = BlogAuthorStatus.ACTIVE;
    this.isModalOpen.set(true);
  }

  openEditModal(author: IBlogAuthor): void {
    this.isEditMode.set(true);
    this.editingId = author._id;
    this.formName = author.name;
    this.formSlug = author.slug;
    this.formDesignation = author.designation || '';
    this.formBiography = author.biography || '';
    this.formTwitter = author.socialLinks?.twitter || '';
    this.formLinkedin = author.socialLinks?.linkedin || '';
    this.formGithub = author.socialLinks?.github || '';
    this.formWebsite = author.socialLinks?.website || '';
    this.formStatus = author.status;

    if (typeof author.profileImageMediaId === 'object' && author.profileImageMediaId?.publicUrl) {
      this.formProfileImageMediaId = author.profileImageMediaId._id;
      this.formProfileImageUrl = author.profileImageMediaId.publicUrl;
    } else {
      this.formProfileImageMediaId = (author.profileImageMediaId as string) || null;
      this.formProfileImageUrl = null;
    }

    this.isModalOpen.set(true);
  }

  saveAuthor(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!this.formName.trim() || !this.formSlug.trim() || !websiteId) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload: Partial<IBlogAuthor> = {
      websiteId,
      name: this.formName.trim(),
      slug: this.formSlug.trim(),
      designation: this.formDesignation.trim(),
      biography: this.formBiography.trim(),
      profileImageMediaId: this.formProfileImageMediaId || null,
      status: this.formStatus,
      socialLinks: {
        website: this.formWebsite.trim(),
        twitter: this.formTwitter.trim(),
        linkedin: this.formLinkedin.trim(),
        github: this.formGithub.trim(),
      },
    };

    if (this.isEditMode() && this.editingId) {
      this.blogService.updateAuthor(this.editingId, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Author updated successfully');
          this.loadAuthors();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update author');
        },
      });
    } else {
      this.blogService.createAuthor(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.isModalOpen.set(false);
          this.successMessage.set('Author created successfully');
          this.loadAuthors();
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create author');
        },
      });
    }
  }

  openDeleteModal(author: IBlogAuthor): void {
    this.authorToDelete = author;
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    if (!this.authorToDelete) return;

    this.isSaving.set(true);
    this.blogService.deleteAuthor(this.authorToDelete._id).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.isDeleteModalOpen.set(false);
        this.successMessage.set('Author deleted');
        this.loadAuthors();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to delete author');
      },
    });
  }
}

