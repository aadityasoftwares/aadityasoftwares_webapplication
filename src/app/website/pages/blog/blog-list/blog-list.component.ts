import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IBlog,
  IBlogAuthor,
  IBlogCategory,
  IBlogTag,
} from '../../../../admin/core/interfaces/blog.interface';
import { PublicBlogService } from '../services/public-blog.service';

@Component({
  selector: 'app-public-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicBlogListComponent implements OnInit {
  private readonly blogService = inject(PublicBlogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  readonly articles = signal<IBlog[]>([]);
  readonly featuredArticle = signal<IBlog | null>(null);
  readonly categories = signal<IBlogCategory[]>([]);
  readonly currentCategory = signal<IBlogCategory | null>(null);
  readonly currentTag = signal<IBlogTag | null>(null);
  readonly currentAuthor = signal<IBlogAuthor | null>(null);

  readonly isLoading = signal<boolean>(true);
  readonly searchQuery = signal<string>('');
  readonly activeCategorySlug = signal<string>('all');

  // Pagination
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(9);
  readonly totalArticles = signal<number>(0);
  readonly totalPages = signal<number>(1);

  // Scope: 'all' | 'category' | 'tag' | 'author'
  readonly filterType = signal<'all' | 'category' | 'tag' | 'author'>('all');
  readonly filterSlug = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const url = this.router.url;
      this.currentPage.set(1);

      if (url.includes('/blog/category/')) {
        this.filterType.set('category');
        this.filterSlug.set(params.get('slug'));
      } else if (url.includes('/blog/tag/')) {
        this.filterType.set('tag');
        this.filterSlug.set(params.get('slug'));
      } else if (url.includes('/blog/author/')) {
        this.filterType.set('author');
        this.filterSlug.set(params.get('slug'));
      } else {
        this.filterType.set('all');
        this.filterSlug.set(null);
      }

      this.loadCategories();
      this.loadArticles();
    });
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (res) => this.categories.set(res?.data || []),
    });
  }

  loadArticles(): void {
    this.isLoading.set(true);

    const filter: Record<string, any> = {
      page: this.currentPage(),
      limit: this.pageSize(),
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    };

    if (this.searchQuery().trim()) {
      filter['search'] = this.searchQuery().trim();
    }

    if (this.filterType() === 'category' && this.filterSlug()) {
      this.blogService.getCategoryBySlug(this.filterSlug()!).subscribe({
        next: (catRes) => {
          this.currentCategory.set(catRes.data);
          this.updateCategorySeo(catRes.data);
          filter['categoryId'] = catRes.data._id;
          this.fetchArticlesList(filter);
        },
        error: () => this.fetchArticlesList(filter),
      });
      return;
    }

    if (this.filterType() === 'tag' && this.filterSlug()) {
      this.blogService.getTagBySlug(this.filterSlug()!).subscribe({
        next: (tagRes) => {
          this.currentTag.set(tagRes.data);
          this.updateTagSeo(tagRes.data);
          filter['tagId'] = tagRes.data._id;
          this.fetchArticlesList(filter);
        },
        error: () => this.fetchArticlesList(filter),
      });
      return;
    }

    if (this.filterType() === 'author' && this.filterSlug()) {
      this.blogService.getAuthorBySlug(this.filterSlug()!).subscribe({
        next: (authRes) => {
          this.currentAuthor.set(authRes.data);
          this.updateAuthorSeo(authRes.data);
          filter['authorId'] = authRes.data._id;
          this.fetchArticlesList(filter);
        },
        error: () => this.fetchArticlesList(filter),
      });
      return;
    }

    // Default: Main /blog page
    this.setDefaultSeo();
    this.fetchArticlesList(filter);
  }

  private fetchArticlesList(filter: Record<string, any>): void {
    this.blogService.getArticles(filter).subscribe({
      next: (res) => {
        const list = res.data || [];
        this.totalArticles.set(res.pagination?.total || 0);
        this.totalPages.set(res.pagination?.pages || 1);

        if (this.currentPage() === 1 && this.filterType() === 'all' && !this.searchQuery()) {
          // Identify featured article or top article
          const featured = list.find((a) => a.isFeatured) || list[0] || null;
          this.featuredArticle.set(featured);
          this.articles.set(featured ? list.filter((a) => a._id !== featured._id) : list);
        } else {
          this.featuredArticle.set(null);
          this.articles.set(list);
        }

        this.isLoading.set(false);
      },
      error: () => {
        this.articles.set([]);
        this.isLoading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
    this.currentPage.set(1);
    this.loadArticles();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadArticles();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  }

  getCoverImageUrl(article: IBlog): string {
    if (typeof article.featuredImageMediaId === 'object' && article.featuredImageMediaId?.publicUrl) {
      return article.featuredImageMediaId.publicUrl;
    }
    return '/placeholders/blog-card-placeholder.jpg';
  }

  getCategory(article: IBlog): IBlogCategory | null {
    if (article.categoryIds && article.categoryIds.length > 0) {
      const cat = article.categoryIds[0];
      return typeof cat === 'object' ? cat : null;
    }
    return null;
  }

  getAuthor(article: IBlog): IBlogAuthor | null {
    return typeof article.authorId === 'object' ? article.authorId : null;
  }

  private setDefaultSeo(): void {
    const title = 'Blog & Technology Insights | Aaditya Softwares';
    const desc =
      'Explore deep engineering insights, cloud software architectures, AI agent workflows, and scalable web solutions from Aaditya Softwares.';
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: desc });
  }

  private updateCategorySeo(category: IBlogCategory): void {
    const title = `${category.name} Articles & Guides | Aaditya Softwares Blog`;
    const desc =
      category.description ||
      `Explore software articles and architectural insights on ${category.name} from Aaditya Softwares.`;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
  }

  private updateTagSeo(tag: IBlogTag): void {
    const title = `#${tag.name} Articles | Aaditya Softwares Blog`;
    this.titleService.setTitle(title);
  }

  private updateAuthorSeo(author: IBlogAuthor): void {
    const title = `Articles by ${author.name} | Aaditya Softwares Blog`;
    const desc = author.biography || `Read engineering articles authored by ${author.name}.`;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
  }
}

