import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogStatus } from '../../../core/constants/blog.constants';
import { IBlog, IBlogAuthor, IBlogCategory } from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { BlogWebsiteSelectorComponent } from '../components/website-selector/website-selector.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BlogWebsiteSelectorComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  private readonly blogService = inject(AdminBlogService);
  private readonly router = inject(Router);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogStatus = BlogStatus;

  // State signals
  readonly blogs = signal<IBlog[]>([]);
  readonly categories = signal<IBlogCategory[]>([]);
  readonly authors = signal<IBlogAuthor[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');
  readonly selectedCategory = signal<string>('ALL');
  readonly selectedAuthor = signal<string>('ALL');

  // Pagination
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(15);
  readonly totalItems = signal<number>(0);
  readonly totalPages = signal<number>(1);

  // Modals & confirmation
  readonly isDeleteModalOpen = signal<boolean>(false);
  readonly blogToDelete = signal<IBlog | null>(null);
  readonly isScheduleModalOpen = signal<boolean>(false);
  readonly blogToSchedule = signal<IBlog | null>(null);
  readonly scheduledDate = signal<string>('');
  readonly isActionInProgress = signal<boolean>(false);

  constructor() {
    // When target website changes in context store, re-load blogs & taxonomies
    effect(() => {
      const siteId = this.contextStore.selectedWebsiteId();
      if (siteId) {
        this.currentPage.set(1);
        this.loadTaxonomies(siteId);
        this.loadBlogs();
      }
    });
  }

  ngOnInit(): void {
    if (this.contextStore.selectedWebsiteId()) {
      this.loadTaxonomies(this.contextStore.selectedWebsiteId());
      this.loadBlogs();
    }
  }

  loadTaxonomies(websiteId: string): void {
    this.blogService.getCategories({ websiteId, limit: 100 }).subscribe({
      next: (res) => this.categories.set(res?.data || []),
    });
    this.blogService.getAuthors({ websiteId, limit: 100 }).subscribe({
      next: (res) => this.authors.set(res?.data || []),
    });
  }

  loadBlogs(): void {
    const websiteId = this.contextStore.selectedWebsiteId();
    if (!websiteId) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, any> = {
      websiteId,
      page: this.currentPage(),
      limit: this.pageSize(),
      sortBy: 'updatedAt',
      sortOrder: 'desc',
    };

    if (this.searchQuery().trim()) {
      filter['search'] = this.searchQuery().trim();
    }
    if (this.selectedStatus() !== 'ALL') {
      filter['status'] = this.selectedStatus();
    }
    if (this.selectedCategory() !== 'ALL') {
      filter['categoryId'] = this.selectedCategory();
    }
    if (this.selectedAuthor() !== 'ALL') {
      filter['authorId'] = this.selectedAuthor();
    }

    this.blogService.getBlogs(filter).subscribe({
      next: (res) => {
        this.blogs.set(res.data || []);
        this.totalItems.set(res.pagination?.total || 0);
        this.totalPages.set(res.pagination?.pages || 1);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load blog articles');
        this.isLoading.set(false);
      },
    });
  }

  applyFilter(): void {
    this.currentPage.set(1);
    this.loadBlogs();
  }

  resetFilter(): void {
    this.searchQuery.set('');
    this.selectedStatus.set('ALL');
    this.selectedCategory.set('ALL');
    this.selectedAuthor.set('ALL');
    this.currentPage.set(1);
    this.loadBlogs();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadBlogs();
    }
  }

  getFeaturedImageUrl(blog: IBlog): string {
    if (typeof blog.featuredImageMediaId === 'object' && blog.featuredImageMediaId?.publicUrl) {
      return blog.featuredImageMediaId.publicUrl;
    }
    return '/placeholders/blog-placeholder.svg';
  }

  getCategoryNames(blog: IBlog): string {
    if (!blog.categoryIds || !blog.categoryIds.length) return 'Uncategorized';
    return blog.categoryIds
      .map((cat) => (typeof cat === 'object' ? cat.name : 'Category'))
      .join(', ');
  }

  getAuthorName(blog: IBlog): string {
    if (typeof blog.authorId === 'object' && blog.authorId?.name) {
      return blog.authorId.name;
    }
    return 'Editorial Team';
  }

  onPublish(blog: IBlog): void {
    this.isActionInProgress.set(true);
    this.blogService.publishBlog(blog._id).subscribe({
      next: () => {
        this.successMessage.set(`Article "${blog.title}" published successfully!`);
        this.isActionInProgress.set(false);
        this.loadBlogs();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to publish article');
        this.isActionInProgress.set(false);
      },
    });
  }

  onUnpublish(blog: IBlog): void {
    this.isActionInProgress.set(true);
    this.blogService.unpublishBlog(blog._id).subscribe({
      next: () => {
        this.successMessage.set(`Article moved to DRAFT status.`);
        this.isActionInProgress.set(false);
        this.loadBlogs();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to unpublish article');
        this.isActionInProgress.set(false);
      },
    });
  }

  onArchive(blog: IBlog): void {
    this.isActionInProgress.set(true);
    this.blogService.archiveBlog(blog._id).subscribe({
      next: () => {
        this.successMessage.set(`Article archived.`);
        this.isActionInProgress.set(false);
        this.loadBlogs();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to archive article');
        this.isActionInProgress.set(false);
      },
    });
  }

  openScheduleModal(blog: IBlog): void {
    this.blogToSchedule.set(blog);
    const tomorrow = new Date(Date.now() + 86400000);
    this.scheduledDate.set(tomorrow.toISOString().slice(0, 16));
    this.isScheduleModalOpen.set(true);
  }

  confirmSchedule(): void {
    const blog = this.blogToSchedule();
    const dateStr = this.scheduledDate();
    if (!blog || !dateStr) return;

    this.isActionInProgress.set(true);
    this.blogService.scheduleBlog(blog._id, dateStr).subscribe({
      next: () => {
        this.successMessage.set(`Article scheduled for publication on ${new Date(dateStr).toLocaleString()}.`);
        this.isScheduleModalOpen.set(false);
        this.isActionInProgress.set(false);
        this.loadBlogs();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to schedule article');
        this.isActionInProgress.set(false);
      },
    });
  }

  openDeleteModal(blog: IBlog): void {
    this.blogToDelete.set(blog);
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    const blog = this.blogToDelete();
    if (!blog) return;

    this.isActionInProgress.set(true);
    this.blogService.deleteBlog(blog._id).subscribe({
      next: () => {
        this.successMessage.set('Article deleted permanently.');
        this.isDeleteModalOpen.set(false);
        this.isActionInProgress.set(false);
        this.loadBlogs();
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete article');
        this.isActionInProgress.set(false);
      },
    });
  }

  viewLive(blog: IBlog): void {
    const site = this.contextStore.selectedWebsite();
    const base = site?.slug === 'stickyji' ? 'https://stickyji.com' : '';
    const url = `${base}/blog/${blog.slug}`;
    window.open(url, '_blank');
  }
}

