import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IBlog,
  IBlogAuthor,
  IBlogCategory,
} from '../../../../admin/core/interfaces/blog.interface';
import { PublicBlogService } from '../services/public-blog.service';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-public-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicBlogDetailComponent implements OnInit, OnDestroy {
  private readonly blogService = inject(PublicBlogService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly document = inject(DOCUMENT);

  readonly article = signal<IBlog | null>(null);
  readonly relatedArticles = signal<IBlog[]>([]);
  readonly tocItems = signal<TocItem[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly isCopied = signal<boolean>(false);
  readonly safeContent = signal<SafeHtml>('');

  @ViewChild('contentArea') contentArea?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.loadArticle(slug);
      }
    });
  }

  ngOnDestroy(): void {
    this.removeJsonLd();
  }

  loadArticle(slug: string): void {
    this.isLoading.set(true);

    this.blogService.getArticleBySlug(slug).subscribe({
      next: (res) => {
        const blog = res.data;
        if (!blog) {
          this.router.navigate(['/blog']);
          return;
        }

        this.article.set(blog);

        // Sanitize & build TOC
        const rawHtml = typeof blog.content === 'string' ? blog.content : '';
        const { processedHtml, toc } = this.processContentAndToc(rawHtml);
        this.safeContent.set(this.sanitizer.bypassSecurityTrustHtml(processedHtml));
        this.tocItems.set(toc);

        // Set Full SEO & Schema
        this.applySeoMetadata(blog);

        // Fetch related articles
        this.blogService.getRelatedArticles(blog._id).subscribe({
          next: (relatedRes) => this.relatedArticles.set(relatedRes?.data || []),
        });

        this.isLoading.set(false);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.router.navigate(['/blog']);
      },
    });
  }

  private processContentAndToc(html: string): { processedHtml: string; toc: TocItem[] } {
    const toc: TocItem[] = [];
    if (!html) return { processedHtml: '', toc: [] };

    // Regex to match h2 and h3
    let headingIndex = 0;
    const processedHtml = html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (_match, tag, attrs, text) => {
      headingIndex++;
      const plainText = text.replace(/<[^>]+>/g, '').trim();
      const slugId =
        plainText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-') || `section-${headingIndex}`;

      toc.push({
        id: slugId,
        text: plainText,
        level: tag.toLowerCase() === 'h2' ? 2 : 3,
      });

      return `<${tag} id="${slugId}"${attrs}>${text}</${tag}>`;
    });

    return { processedHtml, toc };
  }

  scrollToSection(id: string): void {
    const el = this.document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getPrimaryCategory(article: IBlog): IBlogCategory | null {
    if (article.categoryIds && article.categoryIds.length > 0) {
      const cat = article.categoryIds[0];
      return typeof cat === 'object' ? cat : null;
    }
    return null;
  }

  getAuthor(article: IBlog): IBlogAuthor | null {
    return typeof article.authorId === 'object' ? article.authorId : null;
  }

  getCoverImageUrl(article: IBlog): string {
    if (typeof article.featuredImageMediaId === 'object' && article.featuredImageMediaId?.publicUrl) {
      return article.featuredImageMediaId.publicUrl;
    }
    return '/placeholders/blog-card-placeholder.jpg';
  }

  // Social Sharing
  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article()?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  shareOnWhatsApp(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.article()?.title || '');
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2500);
    });
  }

  private applySeoMetadata(blog: IBlog): void {
    const seo = blog.seo || {};
    const title = seo.title || blog.title;
    const description = seo.description || blog.excerpt;
    const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://aadityasoftwares.com/blog/${blog.slug}`;
    const coverUrl =
      typeof blog.featuredImageMediaId === 'object' && blog.featuredImageMediaId?.publicUrl
        ? blog.featuredImageMediaId.publicUrl
        : '';

    this.titleService.setTitle(`${title} | Aaditya Softwares Blog`);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'robots', content: seo.robots || 'index, follow' });

    // Open Graph
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:title', content: seo.ogTitle || title });
    this.metaService.updateTag({ property: 'og:description', content: seo.ogDescription || description });
    this.metaService.updateTag({ property: 'og:url', content: pageUrl });
    if (coverUrl) this.metaService.updateTag({ property: 'og:image', content: coverUrl });

    // Twitter
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: seo.twitterTitle || title });
    this.metaService.updateTag({ name: 'twitter:description', content: seo.twitterDescription || description });
    if (coverUrl) this.metaService.updateTag({ name: 'twitter:image', content: coverUrl });

    // Structured Data JSON-LD
    this.injectJsonLd(blog, pageUrl, coverUrl);
  }

  private injectJsonLd(blog: IBlog, url: string, imageUrl: string): void {
    this.removeJsonLd();

    const author = this.getAuthor(blog);
    const category = this.getPrimaryCategory(blog);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${url}#article`,
          isPartOf: { '@id': url },
          author: {
            '@type': 'Person',
            name: author?.name || 'Aaditya Softwares Editorial Team',
            jobTitle: author?.designation,
          },
          headline: blog.title,
          description: blog.excerpt,
          datePublished: blog.publishedAt || blog.createdAt,
          dateModified: blog.updatedAt || blog.publishedAt,
          mainEntityOfPage: url,
          image: imageUrl || undefined,
          publisher: {
            '@type': 'Organization',
            name: 'Aaditya Softwares',
            url: 'https://aadityasoftwares.in',
            logo: {
              '@type': 'ImageObject',
              url: 'https://aadityasoftwares.in/companylogos/AadityaSoftwaresLogo.png',
            },
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://aadityasoftwares.in',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: 'https://aadityasoftwares.in/blog',
            },
            ...(category
              ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: category.name,
                  item: `https://aadityasoftwares.in/blog/category/${category.slug}`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: blog.title,
                  item: url,
                },
              ]
              : [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: blog.title,
                  item: url,
                },
              ]),
          ],
        },
      ],
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-jsonld-schema';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    const el = this.document.getElementById('blog-jsonld-schema');
    if (el) el.remove();
  }
}

