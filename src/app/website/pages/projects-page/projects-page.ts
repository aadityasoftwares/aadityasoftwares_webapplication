import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideExternalLink,
  LucideCheck,
  LucideSparkles,
  LucideLayers,
  LucideGlobe,
  LucideSmartphone,
  LucideStore,
  LucideBike,
  LucideLayoutDashboard,
  LucideStickyNote,
  LucideUsers,
  LucideKanban,
  LucideTag,
  LucideCloud,
  LucideShieldCheck,
  LucideCode2,
  LucideDatabase,
  LucideServer,
  LucideClock,
  LucideX,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface PlatformItem {
  name: string;
  role: string;
  stack: string;
  icon: AppIconDefinition;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: AppIconDefinition;
}

export interface CaseStudy {
  id: string;
  filterKey: 'website' | 'ecosystem' | 'saas';
  title: string;
  category: 'Business Website' | 'E-commerce Marketplace' | 'Our SaaS Product';
  badgeLabel: string;
  isProprietarySaaS: boolean;
  shortDesc: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  techStack: string[];
  specs: ProjectSpec[];
  platforms?: PlatformItem[];
  features?: FeatureItem[];
  logoUrl: string;
  logoAlt: string;
  previewType: 'website' | 'ecosystem' | 'saas';
  domainUrl: string;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  private readonly router = inject(Router);

  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideCheck = LucideCheck;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideLayers = LucideLayers;
  readonly LucideGlobe = LucideGlobe;
  readonly LucideSmartphone = LucideSmartphone;
  readonly LucideStore = LucideStore;
  readonly LucideBike = LucideBike;
  readonly LucideLayoutDashboard = LucideLayoutDashboard;
  readonly LucideStickyNote = LucideStickyNote;
  readonly LucideUsers = LucideUsers;
  readonly LucideKanban = LucideKanban;
  readonly LucideTag = LucideTag;
  readonly LucideCloud = LucideCloud;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideCode2 = LucideCode2;
  readonly LucideDatabase = LucideDatabase;
  readonly LucideServer = LucideServer;
  readonly LucideClock = LucideClock;
  readonly LucideX = LucideX;

  readonly activeFilter = signal<string>('all');

  readonly projects: CaseStudy[] = [
    {
      id: 'sgtc-india',
      filterKey: 'website',
      title: 'SGTC India',
      category: 'Business Website',
      badgeLabel: 'BUSINESS WEBSITE',
      isProprietarySaaS: false,
      shortDesc:
        'A professional business website showcasing laboratory equipment, scientific products and consumables through a clean and responsive digital experience.',
      challenge:
        'SGTC India required a high-performance digital presence to present an extensive catalog of scientific glassware, chemical reagents, and precision laboratory instruments to institutional researchers and procurement teams without sluggish page loads.',
      solution:
        'We designed and engineered an Angular Single Page Application (SPA) with responsive client-side filtering, optimized imagery, structured technical specifications tables, and an intuitive product inquiry dispatch flow.',
      outcomes: [
        'Sub-second page transitions powered by Angular client-side routing',
        'Structured product catalog indexing hundreds of lab instruments',
        'Mobile-first responsive design ensuring seamless access in laboratories',
        'Direct inquiry dispatch streamlining buyer quotation requests',
      ],
      techStack: ['Angular', 'TypeScript', 'SCSS', 'Responsive Web', 'SEO Optimization'],
      specs: [
        { label: 'Client / Domain', value: 'Scientific & Laboratory Consumables' },
        { label: 'Architecture', value: 'Angular Single Page Application (SPA)' },
        { label: 'Key Deliverable', value: 'Responsive Web Portal & Digital Catalog' },
        { label: 'Engineering Scope', value: 'Frontend Development & UI/UX Architecture' },
      ],
      logoUrl: '/sgtc.png',
      logoAlt: 'SGTC India Scientific Glassware Logo',
      previewType: 'website',
      domainUrl: 'sgtcindia.com',
    },
    {
      id: 'oonloop',
      filterKey: 'ecosystem',
      title: 'OonLoop',
      category: 'E-commerce Marketplace',
      badgeLabel: 'MULTI-PLATFORM ECOSYSTEM',
      isProprietarySaaS: false,
      shortDesc:
        'A complete e-commerce ecosystem connecting customers, vendors and delivery riders through dedicated applications and a centralized administration platform.',
      challenge:
        'Managing live, high-frequency commerce across four interdependent stakeholders requires synchronized real-time data flows, reliable order state machines, automated commission splits, and zero latency in delivery dispatch.',
      solution:
        'We engineered a coordinated multi-application architecture composed of three React Native cross-platform mobile apps (User, Vendor, Rider) and an executive Angular web dashboard, powered by a unified Node.js / Express.js REST API with distributed MongoDB persistence.',
      outcomes: [
        'Coordinated 4-application real-time mesh operating from a single backend core',
        'Real-time GPS delivery tracking with live status updates',
        'Automated merchant settlement, revenue calculations, and payouts ledger',
        'Centralized operations dashboard with deep platform telemetry and dispute moderation',
      ],
      techStack: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'Angular'],
      specs: [
        { label: 'Ecosystem Architecture', value: '4 Interconnected Production Applications' },
        { label: 'Backend REST API', value: 'Node.js & Express.js Microservice Architecture' },
        { label: 'Persistence Layer', value: 'MongoDB Distributed Cluster' },
        { label: 'Admin Management', value: 'Angular Enterprise Dashboard Suite' },
      ],
      platforms: [
        {
          name: 'User Application',
          role: 'Customer storefront, instant cart, payments & live map tracking',
          stack: 'React Native (iOS / Android)',
          icon: LucideSmartphone,
        },
        {
          name: 'Vendor Application',
          role: 'Inventory management, store catalog & live order dispatch',
          stack: 'React Native (iOS / Android)',
          icon: LucideStore,
        },
        {
          name: 'Rider Application',
          role: 'Real-time GPS routing, delivery confirmation & earnings ledger',
          stack: 'React Native (iOS / Android)',
          icon: LucideBike,
        },
        {
          name: 'Admin Dashboard',
          role: 'Central operations hub, vendor payouts, commission & analytics',
          stack: 'Angular 22 SPA',
          icon: LucideLayoutDashboard,
        },
      ],
      logoUrl: '/oonloop.png',
      logoAlt: 'OonLoop E-Commerce Marketplace Logo',
      previewType: 'ecosystem',
      domainUrl: 'oonloop.app',
    },
    {
      id: 'stickyji',
      filterKey: 'saas',
      title: 'StickyJi',
      category: 'Our SaaS Product',
      badgeLabel: 'OUR PROPRIETARY SAAS PRODUCT',
      isProprietarySaaS: true,
      shortDesc:
        'Our own sticky-notes and workspace management SaaS platform, designed to help individuals and teams organize notes, collaborate and manage daily tasks.',
      challenge:
        'Modern knowledge workers and teams struggle with fragmented notes, cluttered task apps, and expensive per-seat software that locks away digital notes and attachments.',
      solution:
        'We conceived, architected, and built StickyJi from scratch as Aaditya Softwares’ flagship in-house SaaS product. It pairs fluid digital sticky notes and multi-user workspaces with drag-and-drop Kanban task boards and cost-effective Cloudflare R2 edge object storage.',
      outcomes: [
        'In-house SaaS platform operating live with active users and multi-workspace support',
        'Zero-downtime Cloudflare R2 edge file storage with instant attachment delivery',
        'Fluid drag-and-drop Kanban task organization with custom priorities & checklists',
        'Role-based permissions, JWT authentication, and multi-tenant security architecture',
      ],
      techStack: [
        'Angular',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Cloudflare',
        'Cloudflare R2',
      ],
      specs: [
        { label: 'Product Model', value: 'In-House Multi-Tenant Workspace SaaS' },
        { label: 'Object Storage', value: 'Cloudflare R2 Edge Object Storage' },
        { label: 'Frontend Client', value: 'Angular High-Performance SPA' },
        { label: 'Security & Access', value: 'Role-Based Auth & Granular Permissions' },
      ],
      features: [
        {
          title: 'Digital Sticky Notes',
          description: 'Fast, colorful markdown-ready sticky notes with pin controls and instant search.',
          icon: LucideStickyNote,
        },
        {
          title: 'Workspaces and Collaboration',
          description: 'Dedicated team workspaces with live multi-user collaboration and permission sharing.',
          icon: LucideUsers,
        },
        {
          title: 'Kanban Task Organization',
          description: 'Visual drag-and-drop task columns tracking backlog, in-progress, review, and done states.',
          icon: LucideKanban,
        },
        {
          title: 'Labels and Checklists',
          description: 'Granular color-coded tagging, priority flags, and interactive subtask checklists.',
          icon: LucideTag,
        },
        {
          title: 'Cloud File Storage',
          description: 'High-speed document and image uploads backed by Cloudflare R2 edge infrastructure.',
          icon: LucideCloud,
        },
        {
          title: 'Authentication and Permissions',
          description: 'Enterprise-grade JWT authentication with workspace-level role permissions.',
          icon: LucideShieldCheck,
        },
      ],
      logoUrl: '/companylogos/StickyJiLogo.png',
      logoAlt: 'StickyJi Mascot Logo',
      previewType: 'saas',
      domainUrl: 'stickyji.com',
    },
  ];

  filterProjects(key: string): void {
    this.activeFilter.set(key);
  }

  get filteredProjects(): CaseStudy[] {
    const f = this.activeFilter();
    if (f === 'all') {
      return this.projects;
    }
    return this.projects.filter((p) => p.filterKey === f);
  }

  onContact(): void {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

