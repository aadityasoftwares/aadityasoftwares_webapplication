import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Essentials,
  Paragraph,
  Heading,
  Link,
  List,
  BlockQuote,
  Table,
  TableToolbar,
  CodeBlock,
  HorizontalLine,
  Alignment,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageUpload,
  Autoformat,
  FileRepository,
} from 'ckeditor5';
import {
  BlogContentFormat,
  BlogRobotsDirective,
  BlogStatus,
} from '../../../core/constants/blog.constants';
import {
  IBlog,
  IBlogAuthor,
  IBlogCategory,
  IBlogRevision,
  IBlogSeo,
  IBlogTag,
} from '../../../core/interfaces/blog.interface';
import { AdminBlogService } from '../../../core/services/admin-blog.service';
import { AdminMediaService } from '../../../core/services/admin-media.service';
import { AdminBlogContextStore } from '../../../core/state/admin-blog-context.store';
import { createR2UploadAdapterPlugin } from './ckeditor-upload-adapter';

export type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'failed';

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CKEditorModule],
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
})
export class BlogEditorComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogService = inject(AdminBlogService);
  private readonly mediaService = inject(AdminMediaService);
  readonly contextStore = inject(AdminBlogContextStore);

  readonly BlogStatus = BlogStatus;
  readonly BlogRobotsDirective = BlogRobotsDirective;

  // Editor setup
  readonly Editor: any = ClassicEditor;
  editorConfig: any;

  // Mode & IDs
  readonly isEditMode = signal<boolean>(false);
  readonly blogId = signal<string | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Autosave
  readonly autosaveStatus = signal<AutosaveStatus>('idle');
  readonly lastSavedAt = signal<Date | null>(null);
  private autosaveTimer: any = null;
  private isManualSaving = false;

  // Form State
  title = '';
  slug = '';
  isSlugCustomized = false;
  excerpt = '';
  contentHtml = '';
  contentFormat = BlogContentFormat.HTML;

  // Featured Image
  featuredImageMediaId: string | null = null;
  featuredImageUrl: string | null = null;
  featuredImageAlt = '';
  isUploadingImage = false;

  // Taxonomies
  selectedCategoryId = '';
  selectedTagIds: string[] = [];
  selectedAuthorId = '';
  newTagInput = '';

  // Options
  status: BlogStatus = BlogStatus.DRAFT;
  isFeatured = false;
  allowComments = false;
  allowIndexing = true;
  scheduledAt = '';

  // SEO Fields
  seo: IBlogSeo = {
    title: '',
    description: '',
    canonicalUrl: '',
    focusKeyword: '',
    robots: BlogRobotsDirective.INDEX_FOLLOW,
    ogTitle: '',
    ogDescription: '',
    ogImageMediaId: null,
    schemaType: 'Article',
  };
  ogImageUrl: string | null = null;

  // Loaded taxonomies lists
  readonly categories = signal<IBlogCategory[]>([]);
  readonly tags = signal<IBlogTag[]>([]);
  readonly authors = signal<IBlogAuthor[]>([]);

  // Revisions Modal
  readonly isRevisionsModalOpen = signal<boolean>(false);
  readonly revisions = signal<IBlogRevision[]>([]);
  readonly isLoadingRevisions = signal<boolean>(false);
  readonly selectedRevision = signal<IBlogRevision | null>(null);

  // Schedule Modal
  readonly isScheduleModalOpen = signal<boolean>(false);

  // Editorial Warnings Computed
  readonly editorialWarnings = computed(() => {
    const warnings: string[] = [];
    if (!this.title.trim()) warnings.push('Missing article title (H1)');
    if (!this.excerpt.trim()) warnings.push('Missing article excerpt / summary');
    if (!this.featuredImageMediaId) warnings.push('Missing featured cover image');
    if (this.featuredImageMediaId && !this.featuredImageAlt.trim())
      warnings.push('Missing featured image Alt text for accessibility');
    if (!this.seo.title?.trim()) warnings.push('Missing custom SEO Meta Title');
    if (!this.seo.description?.trim()) warnings.push('Missing SEO Meta Description');
    if (!this.selectedCategoryId) warnings.push('No primary category assigned');
    if (!this.selectedAuthorId) warnings.push('No author attributed');

    // Content length check
    const rawLen = this.contentHtml ? this.contentHtml.replace(/<[^>]+>/g, '').trim().length : 0;
    if (rawLen < 300) warnings.push('Article content is very short (under 50 words)');

    return warnings;
  });

  constructor() {
    this.setupEditorConfig();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.blogId.set(id);
    }

    const currentWebsiteId = this.contextStore.selectedWebsiteId();
    if (currentWebsiteId) {
      this.loadTaxonomies(currentWebsiteId);
    }

    if (this.isEditMode() && id) {
      this.loadBlogData(id);
    } else {
      this.isLoading.set(false);
      // Auto-set author if only one author exists once taxonomies arrive
    }
  }

  ngOnDestroy(): void {
    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }
  }

  private setupEditorConfig(): void {
    this.editorConfig = {
      plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Underline,
        Link,
        List,
        BlockQuote,
        Table,
        TableToolbar,
        CodeBlock,
        HorizontalLine,
        Alignment,
        Image,
        ImageToolbar,
        ImageCaption,
        ImageStyle,
        ImageResize,
        ImageUpload,
        Autoformat,
        FileRepository,
        createR2UploadAdapterPlugin(this.mediaService),
      ],
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'codeBlock',
          '|',
          'alignment',
          '|',
          'insertTable',
          'horizontalLine',
          '|',
          'uploadImage',
          '|',
          'undo',
          'redo',
        ],
        shouldNotGroupWhenFull: true,
      },
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        ],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      image: {
        toolbar: [
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
          '|',
          'toggleImageCaption',
          'imageTextAlternative',
        ],
      },
    };
  }

  loadTaxonomies(websiteId: string): void {
    this.blogService.getCategories({ websiteId, limit: 100 }).subscribe({
      next: (res) => {
        this.categories.set(res?.data || []);
        if (!this.selectedCategoryId && res?.data?.length > 0) {
          this.selectedCategoryId = res.data[0]._id;
        }
      },
    });

    this.blogService.getTags({ websiteId, limit: 100 }).subscribe({
      next: (res) => this.tags.set(res?.data || []),
    });

    this.blogService.getAuthors({ websiteId, limit: 100 }).subscribe({
      next: (res) => {
        this.authors.set(res?.data || []);
        if (!this.selectedAuthorId && res?.data?.length > 0) {
          this.selectedAuthorId = res.data[0]._id;
        }
      },
    });
  }

  loadBlogData(id: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.blogService.getBlogById(id).subscribe({
      next: (res) => {
        const blog = res.data;
        if (!blog) return;

        // Set website in context store if different
        const siteId =
          typeof blog.websiteId === 'object' ? blog.websiteId._id : blog.websiteId;
        if (siteId && siteId !== this.contextStore.selectedWebsiteId()) {
          this.contextStore.setWebsiteId(siteId);
          this.loadTaxonomies(siteId);
        }

        this.title = blog.title || '';
        this.slug = blog.slug || '';
        this.isSlugCustomized = true;
        this.excerpt = blog.excerpt || '';
        this.contentHtml = typeof blog.content === 'string' ? blog.content : '';
        this.status = blog.status || BlogStatus.DRAFT;
        this.isFeatured = blog.isFeatured || false;
        this.allowComments = blog.allowComments || false;
        this.allowIndexing = blog.allowIndexing ?? true;
        this.featuredImageAlt = blog.featuredImageAlt || '';

        if (typeof blog.featuredImageMediaId === 'object' && blog.featuredImageMediaId?.publicUrl) {
          this.featuredImageMediaId = blog.featuredImageMediaId._id || null;
          this.featuredImageUrl = blog.featuredImageMediaId.publicUrl;
        } else if (typeof blog.featuredImageMediaId === 'string') {
          this.featuredImageMediaId = blog.featuredImageMediaId;
        }

        if (blog.categoryIds && blog.categoryIds.length > 0) {
          const firstCat = blog.categoryIds[0];
          this.selectedCategoryId = typeof firstCat === 'object' ? firstCat._id : firstCat;
        }

        if (blog.tagIds && blog.tagIds.length > 0) {
          this.selectedTagIds = blog.tagIds.map((t) => (typeof t === 'object' ? t._id : t));
        }

        if (blog.authorId) {
          this.selectedAuthorId =
            typeof blog.authorId === 'object' ? blog.authorId._id : blog.authorId;
        }

        if (blog.seo) {
          this.seo = {
            title: blog.seo.title || '',
            description: blog.seo.description || '',
            canonicalUrl: blog.seo.canonicalUrl || '',
            focusKeyword: blog.seo.focusKeyword || '',
            robots: blog.seo.robots || BlogRobotsDirective.INDEX_FOLLOW,
            ogTitle: blog.seo.ogTitle || '',
            ogDescription: blog.seo.ogDescription || '',
            ogImageMediaId: blog.seo.ogImageMediaId || null,
            schemaType: blog.seo.schemaType || 'Article',
          };
        }

        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load article details');
        this.isLoading.set(false);
      },
    });
  }

  onTitleChange(): void {
    if (!this.isSlugCustomized) {
      this.slug = this.generateSlug(this.title);
    }
    this.triggerAutosave();
  }

  generateSlug(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  toggleSlugLock(): void {
    this.isSlugCustomized = !this.isSlugCustomized;
  }

  onContentChange(): void {
    this.triggerAutosave();
  }

  // --- Featured Image Upload ---
  onFeaturedImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploadingImage = true;
    this.errorMessage.set(null);

    this.mediaService.uploadFile(file, 'COVER', 'BLOG').subscribe({
      next: (media) => {
        this.featuredImageMediaId = media._id;
        this.featuredImageUrl = media.publicUrl;
        if (!this.featuredImageAlt) {
          this.featuredImageAlt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        }
        this.isUploadingImage = false;
        this.triggerAutosave();
      },
      error: (err) => {
        this.errorMessage.set(err?.message || 'Failed to upload featured image to storage');
        this.isUploadingImage = false;
      },
    });
  }

  removeFeaturedImage(): void {
    this.featuredImageMediaId = null;
    this.featuredImageUrl = null;
    this.featuredImageAlt = '';
    this.triggerAutosave();
  }

  // --- Tag Management ---
  isTagSelected(tagId: string): boolean {
    return this.selectedTagIds.includes(tagId);
  }

  toggleTag(tagId: string): void {
    if (this.selectedTagIds.includes(tagId)) {
      this.selectedTagIds = this.selectedTagIds.filter((id) => id !== tagId);
    } else {
      this.selectedTagIds = [...this.selectedTagIds, tagId];
    }
    this.triggerAutosave();
  }

  addNewTag(): void {
    const tagName = this.newTagInput.trim();
    const siteId = this.contextStore.selectedWebsiteId();
    if (!tagName || !siteId) return;

    const slug = this.generateSlug(tagName);
    this.blogService.createTag({ websiteId: siteId, name: tagName, slug }).subscribe({
      next: (res) => {
        const created = res.data;
        this.tags.set([...this.tags(), created]);
        this.selectedTagIds = [...this.selectedTagIds, created._id];
        this.newTagInput = '';
        this.triggerAutosave();
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to create new tag');
      },
    });
  }

  // --- Autosave Implementation ---
  triggerAutosave(): void {
    if (!this.isEditMode() || !this.blogId() || this.isManualSaving) {
      return;
    }

    if (this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
    }

    this.autosaveStatus.set('saving');

    this.autosaveTimer = setTimeout(() => {
      this.executeAutosave();
    }, 2500); // Debounce 2.5s
  }

  private executeAutosave(): void {
    const id = this.blogId();
    if (!id || this.isManualSaving) return;

    const payload = this.buildPayload();
    this.blogService.updateBlog(id, payload).subscribe({
      next: () => {
        this.autosaveStatus.set('saved');
        this.lastSavedAt.set(new Date());
      },
      error: () => {
        this.autosaveStatus.set('failed');
      },
    });
  }

  // --- Payload Builder ---
  private buildPayload(): Partial<IBlog> {
    const websiteId = this.contextStore.selectedWebsiteId();
    return {
      websiteId,
      title: this.title.trim(),
      slug: this.slug.trim(),
      excerpt: this.excerpt.trim(),
      content: this.contentHtml,
      contentFormat: BlogContentFormat.HTML,
      featuredImageMediaId: this.featuredImageMediaId || null,
      featuredImageAlt: this.featuredImageAlt.trim(),
      categoryIds: this.selectedCategoryId ? [this.selectedCategoryId] : [],
      tagIds: this.selectedTagIds,
      authorId: this.selectedAuthorId,
      status: this.status,
      isFeatured: this.isFeatured,
      allowComments: this.allowComments,
      allowIndexing: this.allowIndexing,
      seo: {
        title: this.seo.title?.trim() || this.title.trim(),
        description: this.seo.description?.trim() || this.excerpt.trim(),
        canonicalUrl: this.seo.canonicalUrl?.trim(),
        focusKeyword: this.seo.focusKeyword?.trim(),
        robots: this.seo.robots || BlogRobotsDirective.INDEX_FOLLOW,
        ogTitle: this.seo.ogTitle?.trim() || this.title.trim(),
        ogDescription: this.seo.ogDescription?.trim() || this.excerpt.trim(),
        ogImageMediaId: this.seo.ogImageMediaId || this.featuredImageMediaId || null,
        schemaType: this.seo.schemaType || 'Article',
      },
    };
  }

  // --- Publishing Actions ---
  saveDraft(): void {
    this.status = BlogStatus.DRAFT;
    this.saveArticle('Draft saved successfully');
  }

  submitForReview(): void {
    this.status = BlogStatus.REVIEW;
    this.saveArticle('Article submitted for editorial review');
  }

  publishNow(): void {
    if (!this.validateRequiredFields()) return;

    this.isManualSaving = true;
    this.isSaving.set(true);

    if (!this.isEditMode()) {
      // First create blog then publish
      this.status = BlogStatus.PUBLISHED;
      const payload = this.buildPayload();
      this.blogService.createBlog(payload).subscribe({
        next: (res) => {
          this.isSaving.set(false);
          this.isManualSaving = false;
          this.successMessage.set('Article created and published successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/blogs']);
          }, 1000);
        },
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to publish article');
          this.isSaving.set(false);
          this.isManualSaving = false;
        },
      });
    } else {
      // Update article then call publish endpoint
      const payload = this.buildPayload();
      this.blogService.updateBlog(this.blogId()!, payload).subscribe({
        next: () => {
          this.blogService.publishBlog(this.blogId()!).subscribe({
            next: () => {
              this.status = BlogStatus.PUBLISHED;
              this.successMessage.set('Article published live!');
              this.isSaving.set(false);
              this.isManualSaving = false;
              setTimeout(() => this.successMessage.set(null), 4000);
            },
            error: (err) => {
              this.errorMessage.set(err?.error?.message || 'Failed to publish article');
              this.isSaving.set(false);
              this.isManualSaving = false;
            },
          });
        },
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to update article');
          this.isSaving.set(false);
          this.isManualSaving = false;
        },
      });
    }
  }

  updatePublished(): void {
    this.saveArticle('Published article updated successfully');
  }

  openScheduleModal(): void {
    const tomorrow = new Date(Date.now() + 86400000);
    this.scheduledAt = tomorrow.toISOString().slice(0, 16);
    this.isScheduleModalOpen.set(true);
  }

  confirmSchedule(): void {
    if (!this.scheduledAt) return;
    this.status = BlogStatus.SCHEDULED;
    this.isScheduleModalOpen.set(false);

    if (this.isEditMode() && this.blogId()) {
      const payload = this.buildPayload();
      this.blogService.updateBlog(this.blogId()!, payload).subscribe({
        next: () => {
          this.blogService.scheduleBlog(this.blogId()!, this.scheduledAt).subscribe({
            next: () => {
              this.successMessage.set(`Article scheduled for ${new Date(this.scheduledAt).toLocaleString()}`);
            },
            error: (err) => this.errorMessage.set(err?.error?.message || 'Scheduling failed'),
          });
        },
      });
    } else {
      this.saveArticle(`Article scheduled for ${new Date(this.scheduledAt).toLocaleString()}`);
    }
  }

  archiveArticle(): void {
    if (!this.isEditMode() || !this.blogId()) return;

    this.isSaving.set(true);
    this.blogService.archiveBlog(this.blogId()!).subscribe({
      next: () => {
        this.status = BlogStatus.ARCHIVED;
        this.successMessage.set('Article archived.');
        this.isSaving.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to archive article');
        this.isSaving.set(false);
      },
    });
  }

  private validateRequiredFields(): boolean {
    if (!this.title.trim()) {
      this.errorMessage.set('Article title is required.');
      return false;
    }
    if (!this.slug.trim()) {
      this.errorMessage.set('Article slug is required.');
      return false;
    }
    if (!this.excerpt.trim()) {
      this.errorMessage.set('Article excerpt / summary is required.');
      return false;
    }
    if (!this.contentHtml.trim()) {
      this.errorMessage.set('Article body content cannot be empty.');
      return false;
    }
    if (!this.selectedAuthorId) {
      this.errorMessage.set('Please select an author for this article.');
      return false;
    }
    return true;
  }

  private saveArticle(successMsg: string): void {
    if (!this.validateRequiredFields()) return;

    this.isManualSaving = true;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    const payload = this.buildPayload();

    if (this.isEditMode() && this.blogId()) {
      this.blogService.updateBlog(this.blogId()!, payload).subscribe({
        next: (res) => {
          this.isSaving.set(false);
          this.isManualSaving = false;
          this.successMessage.set(successMsg);
          this.autosaveStatus.set('saved');
          this.lastSavedAt.set(new Date());
          setTimeout(() => this.successMessage.set(null), 4000);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.isManualSaving = false;
          this.errorMessage.set(err?.error?.message || 'Failed to save changes');
        },
      });
    } else {
      this.blogService.createBlog(payload).subscribe({
        next: (res) => {
          this.isSaving.set(false);
          this.isManualSaving = false;
          this.successMessage.set('Article created successfully!');
          setTimeout(() => {
            this.router.navigate(['/admin/blogs/edit', res.data._id]);
          }, 800);
        },
        error: (err) => {
          this.isSaving.set(false);
          this.isManualSaving = false;
          this.errorMessage.set(err?.error?.message || 'Failed to create article');
        },
      });
    }
  }

  // --- Revision History ---
  openRevisionsModal(): void {
    const id = this.blogId();
    if (!id) return;

    this.isRevisionsModalOpen.set(true);
    this.isLoadingRevisions.set(true);

    this.blogService.getRevisions(id).subscribe({
      next: (res) => {
        this.revisions.set(res.data || []);
        this.isLoadingRevisions.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load revisions');
        this.isLoadingRevisions.set(false);
      },
    });
  }

  restoreRevision(revision: IBlogRevision): void {
    const id = this.blogId();
    if (!id) return;

    if (
      !confirm(
        `Are you sure you want to restore revision v${revision.version}? Your current editor content will be updated to this revision.`,
      )
    ) {
      return;
    }

    this.isSaving.set(true);
    this.blogService.restoreRevision(id, revision._id).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.isRevisionsModalOpen.set(false);
        this.loadBlogData(id);
        this.successMessage.set(`Revision v${revision.version} restored successfully!`);
        setTimeout(() => this.successMessage.set(null), 4000);
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to restore revision');
      },
    });
  }

  viewLiveArticle(): void {
    const site = this.contextStore.selectedWebsite();
    const domain = site?.slug === 'stickyji' ? 'https://stickyji.com' : '';
    window.open(`${domain}/blog/${this.slug}`, '_blank');
  }
}

