import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonicalUrl?: string;
  robots?: string;
  ogType?: 'website' | 'article' | 'profile' | 'business.business';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: object | object[];
}

export const BASE_SITE_URL = 'https://aadityasoftwares.in';
export const DEFAULT_OG_IMAGE = 'https://aadityasoftwares.in/companylogos/AadityaSoftwaresLogo.png';
export const COMPANY_NAME = 'Aaditya Softwares';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Initializes automatic SEO listeners on route changes.
   */
  initAutoSeo(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute: ActivatedRoute | null = this.activatedRoute.root;
        let seoData: SeoConfig | undefined;

        while (currentRoute) {
          if (currentRoute.snapshot.data && currentRoute.snapshot.data['seo']) {
            seoData = currentRoute.snapshot.data['seo'] as SeoConfig;
          }
          currentRoute = currentRoute.firstChild;
        }

        if (seoData) {
          this.applySeo(seoData);
        }
      });
  }

  /**
   * Applies complete SEO metadata (title, meta tags, Open Graph, Twitter, Canonical, Schema JSON-LD).
   */
  applySeo(config: SeoConfig): void {
    const title = config.title || `${COMPANY_NAME} - Software Company in Vadodara, Gujarat`;
    const description =
      config.description ||
      'Aaditya Softwares is a top software development company in Vadodara, Gujarat, India. Specializing in custom web applications, mobile apps, SaaS, and AI engineering.';
    const keywords =
      config.keywords ||
      'software companies in vadodara, software company in vadodara, best software company in vadodara, top IT company vadodara, web development vadodara, mobile app development vadodara, custom software development gujarat, Aaditya Softwares';
    const canonical = config.canonicalUrl || this.getCurrentUrl();
    const ogImage = config.ogImage || DEFAULT_OG_IMAGE;
    const robots = config.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    // 1. Page Title
    this.titleService.setTitle(title);

    // 2. Standard Meta Tags
    this.updateOrAddTag({ name: 'description', content: description });
    this.updateOrAddTag({ name: 'keywords', content: keywords });
    this.updateOrAddTag({ name: 'author', content: config.author || COMPANY_NAME });
    this.updateOrAddTag({ name: 'robots', content: robots });

    // 3. Geo & Local SEO Tags (Targeting Vadodara, Gujarat, India)
    this.updateOrAddTag({ name: 'geo.region', content: 'IN-GJ' });
    this.updateOrAddTag({ name: 'geo.placename', content: 'Vadodara, Gujarat, India' });
    this.updateOrAddTag({ name: 'geo.position', content: '22.3072;73.1812' });
    this.updateOrAddTag({ name: 'ICBM', content: '22.3072, 73.1812' });

    // 4. Open Graph Tags
    this.updateOrAddTag({ property: 'og:site_name', content: COMPANY_NAME });
    this.updateOrAddTag({ property: 'og:locale', content: 'en_US' });
    this.updateOrAddTag({ property: 'og:type', content: config.ogType || 'website' });
    this.updateOrAddTag({ property: 'og:title', content: config.ogTitle || title });
    this.updateOrAddTag({ property: 'og:description', content: config.ogDescription || description });
    this.updateOrAddTag({ property: 'og:url', content: config.ogUrl || canonical });
    this.updateOrAddTag({ property: 'og:image', content: ogImage });
    this.updateOrAddTag({ property: 'og:image:alt', content: `${COMPANY_NAME} - Software Development Company in Vadodara` });

    // 5. Twitter Card Tags
    this.updateOrAddTag({ name: 'twitter:card', content: config.twitterCard || 'summary_large_image' });
    this.updateOrAddTag({ name: 'twitter:site', content: '@AadityaSoftwares' });
    this.updateOrAddTag({ name: 'twitter:creator', content: '@AadityaSoftwares' });
    this.updateOrAddTag({ name: 'twitter:title', content: config.twitterTitle || title });
    this.updateOrAddTag({ name: 'twitter:description', content: config.twitterDescription || description });
    this.updateOrAddTag({ name: 'twitter:image', content: config.twitterImage || ogImage });
    this.updateOrAddTag({ name: 'twitter:image:alt', content: `${COMPANY_NAME} - Software Development Company in Vadodara` });

    // 6. Canonical URL Tag
    this.updateCanonicalUrl(canonical);

    // 7. Structured Data JSON-LD
    if (config.jsonLd) {
      this.injectJsonLd(config.jsonLd);
    }
  }

  /**
   * Helper to update an existing meta tag or add it if missing.
   */
  private updateOrAddTag(tag: MetaDefinition): void {
    const selector = tag.name ? `name='${tag.name}'` : `property='${tag.property}'`;
    if (this.metaService.getTag(selector)) {
      this.metaService.updateTag(tag);
    } else {
      this.metaService.addTag(tag);
    }
  }

  /**
   * Inserts or updates the canonical link tag in the document head.
   */
  updateCanonicalUrl(url: string): void {
    if (!this.document) return;

    let canonicalElement = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = this.document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', url);
  }

  /**
   * Injects or updates structured JSON-LD data in the head.
   */
  injectJsonLd(schema: object | object[], scriptId = 'app-dynamic-jsonld'): void {
    if (!this.document) return;

    this.removeJsonLd(scriptId);

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    this.document.head.appendChild(script);
  }

  /**
   * Removes existing JSON-LD script by ID.
   */
  removeJsonLd(scriptId = 'app-dynamic-jsonld'): void {
    if (!this.document) return;
    const existingScript = this.document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
  }

  private getCurrentUrl(): string {
    if (this.isBrowser && typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return BASE_SITE_URL;
  }

  /**
   * Generates Schema.org LocalBusiness & ProfessionalService representation
   * for Aaditya Softwares in Vadodara, Gujarat.
   */
  static getLocalBusinessSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService', 'Corporation'],
      '@id': `${BASE_SITE_URL}/#organization`,
      name: COMPANY_NAME,
      legalName: 'Aaditya Softwares',
      alternateName: ['AadityaSoftwares', 'Aaditya Software Studio', 'Aaditya Softwares Vadodara'],
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/companylogos/AadityaSoftwaresLogo.png`,
      image: `${BASE_SITE_URL}/images/software-team-planning.jpg`,
      description:
        'Aaditya Softwares is a top software development company in Vadodara, Gujarat, India. We engineer production-grade custom web applications, cross-platform mobile apps, cloud architectures, and AI-powered systems.',
      telephone: '+91-8849863872',
      email: 'contact@aadityasoftwares.in',
      priceRange: '$$',
      currenciesAccepted: 'INR, USD, EUR, GBP',
      paymentAccepted: 'Bank Transfer, UPI, Credit Card, Wire Transfer',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:00',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vadodara',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        postalCode: '390007',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.3072,
        longitude: 73.1812,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Vadodara',
        },
        {
          '@type': 'State',
          name: 'Gujarat',
        },
        {
          '@type': 'Country',
          name: 'India',
        },
        {
          '@type': 'GeoShape',
          name: 'Worldwide',
        },
      ],
      knowsAbout: [
        'Software Engineering',
        'Custom Software Development',
        'Web Application Development',
        'Mobile App Development',
        'Angular Development',
        'React & React Native Development',
        'Node.js & TypeScript Engineering',
        'Cloud Infrastructure & DevOps',
        'AI Engineering & Intelligent Automations',
        'SaaS Product Architecture',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Software Engineering Services in Vadodara',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Software Development in Vadodara',
              description: 'End-to-end custom business software, SaaS applications, and enterprise web solutions engineered in Vadodara.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Enterprise Web Application Development',
              description: 'High-performance web apps with Angular, React, Node.js, and microservices architecture.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobile App Development (iOS & Android)',
              description: 'Cross-platform mobile applications with React Native, offline synchronization, and real-time APIs.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Engineering & Automation Solutions',
              description: 'Human-guided AI features, workflow automation, and custom LLM integrations.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cloud Infrastructure & DevOps',
              description: 'Docker, CI/CD automation, cloud deployment, and zero-downtime architecture.',
            },
          },
        ],
      },
      sameAs: [
        'https://stickyji.com/',
        'https://linkedin.com/company/aaditya-softwares',
        'https://github.com/aadityasoftwares',
        'https://twitter.com/AadityaSoftwares',
      ],
    };
  }

  /**
   * Generates Schema.org WebSite representation with search action.
   */
  static getWebSiteSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_SITE_URL}/#website`,
      url: BASE_SITE_URL,
      name: COMPANY_NAME,
      description: 'Aaditya Softwares - Leading Software Engineering & Product Studio in Vadodara, Gujarat',
      publisher: {
        '@id': `${BASE_SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_SITE_URL}/site-map?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }

  /**
   * Generates Schema.org FAQPage structured data.
   */
  static getFaqPageSchema(faqs: { question: string; answer: string }[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
  }

  /**
   * Generates Schema.org BreadcrumbList structured data.
   */
  static getBreadcrumbSchema(items: { name: string; url: string }[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${BASE_SITE_URL}${item.url}`,
      })),
    };
  }
}

