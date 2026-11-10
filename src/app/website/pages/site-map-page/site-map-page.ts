import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GsapAnimationService } from '../../../shared/services/gsap-animation.service';
import {
  LucideGlobe,
  LucideLayers,
  LucideCode2,
  LucideCompass,
  LucideSearch,
  LucideArrowRight,
  LucideExternalLink,
  LucideFileText,
  LucideShield,
  LucideShieldCheck,
  LucideLock,
  LucideBuilding,
  LucideCpu,
  LucideSmartphone,
  LucideCloud,
  LucideCheckCircle2,
  LucideMail,
  LucideMapPin,
  LucideBriefcase,
  LucideSparkles,
  LucideClock,
  LucideCheck,
  LucideWorkflow,
  LucideZap,
  LucideTarget,
  LucideFileCode,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface SiteMapLink {
  title: string;
  path: string;
  description: string;
  category: 'core' | 'services' | 'products' | 'legal';
  icon: AppIconDefinition;
  badge?: string;
  isExternal?: boolean;
  priority?: string;
}

export interface SiteMapCategoryGroup {
  id: string;
  category: 'core' | 'services' | 'products' | 'legal';
  title: string;
  description: string;
  icon: AppIconDefinition;
  badge: string;
  links: SiteMapLink[];
}

export interface SiteMapStat {
  num: string;
  label: string;
  badge: string;
  badgeClass: 'blue' | 'cyan' | 'green';
  description: string;
  icon: AppIconDefinition;
}

@Component({
  selector: 'app-site-map-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './site-map-page.html',
  styleUrl: './site-map-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteMapPage implements OnInit {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);

  readonly lastUpdated = 'November 10, 2026';
  readonly searchQuery = signal<string>('');
  readonly activeCategory = signal<string>('all');

  readonly LucideGlobe = LucideGlobe;
  readonly LucideLayers = LucideLayers;
  readonly LucideCode2 = LucideCode2;
  readonly LucideCompass = LucideCompass;
  readonly LucideSearch = LucideSearch;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideFileText = LucideFileText;
  readonly LucideShield = LucideShield;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideLock = LucideLock;
  readonly LucideBuilding = LucideBuilding;
  readonly LucideCpu = LucideCpu;
  readonly LucideSmartphone = LucideSmartphone;
  readonly LucideCloud = LucideCloud;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideMail = LucideMail;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideBriefcase = LucideBriefcase;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideClock = LucideClock;
  readonly LucideCheck = LucideCheck;
  readonly LucideWorkflow = LucideWorkflow;
  readonly LucideZap = LucideZap;
  readonly LucideTarget = LucideTarget;
  readonly LucideFileCode = LucideFileCode;

  readonly stats: SiteMapStat[] = [
    {
      num: '25+',
      label: 'Indexed Routes',
      badge: '100% Crawled',
      badgeClass: 'blue',
      description: 'Comprehensive coverage across core pages, capabilities, and legal governance.',
      icon: LucideCompass,
    },
    {
      num: '100%',
      label: 'Clean Architecture',
      badge: 'Zero Broken Links',
      badgeClass: 'cyan',
      description: 'Strict TypeScript SPA routing with fast server-side asset synchronization.',
      icon: LucideLayers,
    },
    {
      num: 'XML',
      label: 'Machine Readable',
      badge: 'SEO Priority',
      badgeClass: 'green',
      description: 'Production sitemap.xml adhering to Sitemaps.org protocol for search engines.',
      icon: LucideFileCode,
    },
  ];

  readonly categories = [
    { id: 'all', label: 'All Pages' },
    { id: 'core', label: 'Main Navigation' },
    { id: 'services', label: 'Services & Engineering' },
    { id: 'products', label: 'Products & Ecosystem' },
    { id: 'legal', label: 'Legal & Governance' },
  ];

  readonly sitemapGroups: SiteMapCategoryGroup[] = [
    {
      id: 'core-pages',
      category: 'core',
      title: 'Main Navigation & Core Pages',
      description: 'Primary public destination pages detailing our company vision, client work, and contact points.',
      icon: LucideGlobe,
      badge: 'Core Website',
      links: [
        {
          title: 'Home Page',
          path: '/',
          description: 'Official homepage of Aaditya Softwares, featuring our software engineering ethos, featured case studies, and capabilities.',
          category: 'core',
          icon: LucideGlobe,
          badge: 'Primary',
          priority: '1.0',
        },
        {
          title: 'About Us',
          path: '/about',
          description: 'Our engineering philosophy, team culture, Vadodara development center, client ownership standards, and agile routines.',
          category: 'core',
          icon: LucideBuilding,
          badge: 'Story',
          priority: '0.8',
        },
        {
          title: 'Services & Solutions',
          path: '/services',
          description: 'Full-cycle custom software development, cloud architectures, AI systems, mobile applications, and DevOps retainers.',
          category: 'core',
          icon: LucideLayers,
          badge: 'Engineering',
          priority: '0.9',
        },
        {
          title: 'Featured Projects & Case Studies',
          path: '/projects',
          description: 'Real-world client software deliverables, architecture breakdowns, technology stacks, and business impact metrics.',
          category: 'core',
          icon: LucideBriefcase,
          badge: 'Portfolio',
          priority: '0.8',
        },
        {
          title: 'Contact Us & Project Discovery',
          path: '/contact',
          description: 'Initiate a project discussion, request an architecture review, or get in touch with our technical leadership in Vadodara.',
          category: 'core',
          icon: LucideMail,
          badge: 'Get in Touch',
          priority: '0.8',
        },
      ],
    },
    {
      id: 'engineering-services',
      category: 'services',
      title: 'Technical Capabilities & Solutions',
      description: 'Detailed service areas covering full-stack web architectures, cross-platform mobile, AI, and cloud DevOps.',
      icon: LucideCpu,
      badge: 'Capabilities',
      links: [
        {
          title: 'Custom Enterprise Software Development',
          path: '/services#custom-software',
          description: 'Scalable SPA/SSR systems built with modern Angular, React, Node.js, and clean domain-driven architecture.',
          category: 'services',
          icon: LucideCode2,
          badge: 'Web & API',
          priority: '0.7',
        },
        {
          title: 'Mobile App Engineering (iOS & Android)',
          path: '/services#mobile-development',
          description: 'High-performance React Native and native mobile applications with offline-first synchronization.',
          category: 'services',
          icon: LucideSmartphone,
          badge: 'Mobile',
          priority: '0.7',
        },
        {
          title: 'Cloud Infrastructure, DevOps & Telemetry',
          path: '/services#cloud-devops',
          description: 'Automated CI/CD pipelines, Docker containerization, Kubernetes clustering, and 24/7 telemetry monitoring.',
          category: 'services',
          icon: LucideCloud,
          badge: 'Cloud',
          priority: '0.7',
        },
        {
          title: 'AI-Powered Engineering & Workflow Automation',
          path: '/services#ai-solutions',
          description: 'Human-guided LLM integration, intelligent document extraction, RAG pipelines, and automated business workflows.',
          category: 'services',
          icon: LucideSparkles,
          badge: 'AI & Data',
          priority: '0.7',
        },
        {
          title: 'Product Strategy & UI/UX Design System',
          path: '/services#product-strategy',
          description: 'User experience research, wireframing, modern design systems, micro-interactions, and conversion-focused design.',
          category: 'services',
          icon: LucideWorkflow,
          badge: 'Design',
          priority: '0.7',
        },
        {
          title: 'Automated QA & Security Testing',
          path: '/services#qa-testing',
          description: 'Rigorous unit testing, end-to-end regression suites, performance benchmarking, and static code analysis.',
          category: 'services',
          icon: LucideCheckCircle2,
          badge: 'Testing',
          priority: '0.7',
        },
      ],
    },
    {
      id: 'product-ecosystem',
      category: 'products',
      title: 'In-House Platforms & Ecosystem',
      description: 'Proprietary software products and tools developed and maintained in-house by Aaditya Softwares.',
      icon: LucideLayers,
      badge: 'In-House',
      links: [
        {
          title: 'StickyJi Productivity Platform',
          path: 'https://stickyji.com/',
          description: 'Our proprietary modern digital productivity and note-taking ecosystem built for high-velocity teams and professionals.',
          category: 'products',
          icon: LucideSparkles,
          badge: 'Live Platform',
          isExternal: true,
          priority: '0.8',
        },
      ],
    },
    {
      id: 'legal-governance',
      category: 'legal',
      title: 'Legal, Compliance & Data Governance',
      description: 'Official corporate policies, terms of service engagement, data protection adherence, and compliance disclosures.',
      icon: LucideShieldCheck,
      badge: 'Governance',
      links: [
        {
          title: 'Privacy Policy & Data Governance',
          path: '/privacy-policy',
          description: 'Detailed disclosure of our data collection practices, zero monetization policy, AES-256 encryption, and DPDP/GDPR rights.',
          category: 'legal',
          icon: LucideShieldCheck,
          badge: 'DPDP & GDPR',
          priority: '0.5',
        },
        {
          title: 'Terms of Use & Service Engagement',
          path: '/terms-of-use',
          description: 'Master service agreement terms, 100% intellectual property ownership assignment, milestone sign-offs, and 60-day warranty SLA.',
          category: 'legal',
          icon: LucideFileText,
          badge: 'MSA & SLA',
          priority: '0.5',
        },
        {
          title: 'Legal Notice & Corporate Compliance',
          path: '/legal',
          description: 'Statutory registration in Vadodara, Gujarat, trademark notices, comprehensive cookie disclosures, and Vulnerability Disclosure Program.',
          category: 'legal',
          icon: LucideBuilding,
          badge: 'Corporate',
          priority: '0.5',
        },
        {
          title: 'XML Search Engine Sitemap (sitemap.xml)',
          path: '/sitemap.xml',
          description: 'The raw, machine-readable XML sitemap file generated for Google, Bing, and other search engines following the Sitemaps protocol.',
          category: 'legal',
          icon: LucideFileCode,
          badge: 'Machine XML',
          isExternal: true,
          priority: '0.6',
        },
      ],
    },
  ];

  readonly filteredGroups = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const activeCat = this.activeCategory();

    return this.sitemapGroups
      .map((group) => {
        // Filter by category
        if (activeCat !== 'all' && group.category !== activeCat) {
          return null;
        }

        // Filter by query
        if (!query) {
          return group;
        }

        const matchingLinks = group.links.filter(
          (link) =>
            link.title.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query) ||
            link.path.toLowerCase().includes(query) ||
            (link.badge && link.badge.toLowerCase().includes(query)),
        );

        if (
          matchingLinks.length > 0 ||
          group.title.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query)
        ) {
          return {
            ...group,
            links: matchingLinks.length > 0 ? matchingLinks : group.links,
          };
        }

        return null;
      })
      .filter((group): group is SiteMapCategoryGroup => group !== null);
  });

  constructor() {
    afterNextRender(() => {
      const tl = this.gsapService.animatePageHero(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => {
        tl?.kill();
      });
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  navigateTo(path: string, isExternal?: boolean, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (isExternal) {
      window.open(path, '_blank', 'noopener,noreferrer');
      return;
    }

    if (path.includes('#')) {
      const [routePath, anchor] = path.split('#');
      this.router.navigate([routePath]).then(() => {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el && typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      });
      return;
    }

    this.router.navigate([path]);
  }

  onContact(): void {
    this.router.navigate(['/contact']);
  }
}

