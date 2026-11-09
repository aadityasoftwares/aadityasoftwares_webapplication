import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  LucideX,
  LucideSearch,
  LucideCpu,
  LucideActivity,
  LucideCheckCircle2,
  LucideZap,
  LucideBarChart3,
  LucideWorkflow,
  LucideRadio,
  LucidePlay,
  LucideAward,
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucidePhoneCall,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';
import { ScrollReveal } from '../scroll-reveal';

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface PlatformItem {
  name: string;
  role: string;
  icon: AppIconDefinition;
}

export interface FeatureItem {
  title: string;
  icon: AppIconDefinition;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Business Website' | 'E-commerce Marketplace' | 'Our SaaS Product';
  badgeLabel: string;
  isProprietarySaaS: boolean;
  shortDesc: string;
  detailedDesc: string;
  techStack: string[];
  specs: ProjectSpecification[];
  highlights?: string[];
  platforms?: PlatformItem[];
  features?: FeatureItem[];
  logoUrl: string;
  logoAlt: string;
  previewType: 'website' | 'ecosystem' | 'saas';
  accentColor: string;
  domainUrl: string;
  previewImage?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, AppIcon, Button, ScrollReveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
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
  readonly LucideX = LucideX;
  readonly LucideSearch = LucideSearch;
  readonly LucideCpu = LucideCpu;
  readonly LucideActivity = LucideActivity;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideZap = LucideZap;
  readonly LucideBarChart3 = LucideBarChart3;
  readonly LucideWorkflow = LucideWorkflow;
  readonly LucideRadio = LucideRadio;
  readonly LucidePlay = LucidePlay;
  readonly LucideAward = LucideAward;
  readonly LucideArrowUpRight = LucideArrowUpRight;
  readonly LucideChevronLeft = LucideChevronLeft;
  readonly LucideChevronRight = LucideChevronRight;
  readonly LucidePhoneCall = LucidePhoneCall;

  // Selected project for the interactive case-study drawer/modal
  readonly activeModalProject = signal<ProjectItem | null>(null);

  // Active highlighted project inside the 3D device showcase (defaults to center = index 1)
  readonly activeProjectIndex = signal<number>(1);
  readonly activeCategory = signal<string>('all');

  get activeProject(): ProjectItem {
    return this.projects[this.activeProjectIndex()] ?? this.projects[0];
  }

  selectProjectByIndex(index: number): void {
    if (index >= 0 && index < this.projects.length) {
      this.activeProjectIndex.set(index);
    }
  }

  nextProject(): void {
    this.activeProjectIndex.update((idx) => (idx + 1) % this.projects.length);
  }

  prevProject(): void {
    this.activeProjectIndex.update(
      (idx) => (idx - 1 + this.projects.length) % this.projects.length
    );
  }

  getProjectPosition(index: number): 'center' | 'left' | 'right' {
    const current = this.activeProjectIndex();
    const total = this.projects.length;
    const diff = (index - current + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    return 'left';
  }

  selectCategory(cat: string): void {
    this.activeCategory.set(cat);
    if (cat === 'saas') {
      this.activeProjectIndex.set(2);
    } else if (cat === 'marketplace') {
      this.activeProjectIndex.set(1);
    } else if (cat === 'website') {
      this.activeProjectIndex.set(0);
    }
  }

  readonly projects: ProjectItem[] = [
    {
      id: 'sgtc-india',
      title: 'SGTC India',
      category: 'Business Website',
      badgeLabel: 'BUSINESS WEB APPLICATION',
      isProprietarySaaS: false,
      shortDesc:
        'A professional business website showcasing laboratory equipment, scientific products and consumables through a clean and responsive digital experience.',
      detailedDesc:
        'Engineered as a modern digital showcase and product catalog for SGTC India. The platform structures an extensive inventory of laboratory glassware, scientific instruments, and chemical consumables into an intuitive, high-performance web experience with instant search, technical specs, and seamless customer inquiry workflows.',
      techStack: ['Angular', 'TypeScript', 'SCSS', 'Responsive Architecture'],
      highlights: [
        'Comprehensive Laboratory Catalog & Instant Search',
        'Responsive Angular SPA with High Performance',
        'Interactive Chemical & Glassware Specifications',
        'Direct B2B Customer Quote Inquiry Pipeline',
      ],
      specs: [
        { label: 'Industry', value: 'Scientific & Laboratory Consumables' },
        { label: 'Architecture', value: 'Angular Single Page Application (SPA)' },
        { label: 'Core Deliverable', value: 'Responsive Web Portal & Catalog' },
        { label: 'Engineering Scope', value: 'Frontend Development & UI/UX Design' },
      ],
      logoUrl: '/sgtc.png',
      logoAlt: 'SGTC India Laboratory Equipment Logo',
      previewType: 'website',
      accentColor: '#3b82f6',
      domainUrl: 'sgtcindia.com',
      previewImage: '/images/services/service-software.jpg',
    },
    {
      id: 'oonloop',
      title: 'OonLoop',
      category: 'E-commerce Marketplace',
      badgeLabel: 'MULTI-PLATFORM MARKETPLACE ECOSYSTEM',
      isProprietarySaaS: false,
      shortDesc:
        'A complete e-commerce ecosystem connecting customers, vendors and delivery riders through dedicated applications and a centralized administration platform.',
      detailedDesc:
        'A full-scale commercial multi-sided ecosystem designed to orchestrate complex real-time commerce. OonLoop connects four distinct user roles through specialized applications: intuitive customer ordering and live tracking, vendor store management and order processing, rider GPS dispatch, and a centralized enterprise admin operations hub.',
      techStack: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'Angular'],
      highlights: [
        '4 Real-Time Synchronized Client & Admin Applications',
        'Distributed Node.js & Express REST Microservices',
        'MongoDB High-Throughput Cluster Architecture',
        'Live Geolocation Tracking & Route Dispatch',
      ],
      specs: [
        { label: 'Ecosystem', value: '4 Interconnected Production Platforms' },
        { label: 'Backend Architecture', value: 'Node.js & Express.js REST API' },
        { label: 'Database & Cache', value: 'MongoDB Distributed Cluster' },
        { label: 'Admin Hub', value: 'Angular Enterprise Management Suite' },
      ],
      platforms: [
        {
          name: 'User Application',
          role: 'Customer storefront, instant cart & live order tracking',
          icon: LucideSmartphone,
        },
        {
          name: 'Vendor Application',
          role: 'Storefront inventory, order dispatch & earnings analytics',
          icon: LucideStore,
        },
        {
          name: 'Rider Application',
          role: 'Real-time GPS routing, delivery confirmation & payouts',
          icon: LucideBike,
        },
        {
          name: 'Admin Dashboard',
          role: 'Central operations hub, vendor payouts & analytics',
          icon: LucideLayoutDashboard,
        },
      ],
      logoUrl: '/oonloop.png',
      logoAlt: 'OonLoop Multi-Platform Marketplace Logo',
      previewType: 'ecosystem',
      accentColor: '#06b6d4',
      domainUrl: 'oonloop.app',
      previewImage: '/images/services/service-mobile.jpg',
    },
    {
      id: 'stickyji',
      title: 'StickyJi',
      category: 'Our SaaS Product',
      badgeLabel: 'OUR PROPRIETARY SAAS PRODUCT',
      isProprietarySaaS: true,
      shortDesc:
        'Our own sticky-notes and workspace management SaaS platform, designed to help individuals and teams organize notes, collaborate and manage daily tasks.',
      detailedDesc:
        'StickyJi is Aaditya Softwares’ flagship in-house SaaS product. Conceived and engineered entirely by our software engineering team, it reimagines digital workspace organization through fluid digital sticky notes, collaborative team workspaces, drag-and-drop Kanban task boards, and ultra-fast Cloudflare R2 cloud file storage.',
      techStack: [
        'Angular',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Cloudflare',
        'Cloudflare R2',
      ],
      highlights: [
        'Proprietary Multi-Tenant Workspace & Note Platform',
        'Cloudflare R2 Zero-Egress Cloud Storage Engine',
        'Real-Time Drag-and-Drop Kanban Task Orchestration',
        'Granular Role-Based Permissions & Encryption',
      ],
      specs: [
        { label: 'Product Model', value: 'Proprietary In-House Multi-Tenant SaaS' },
        { label: 'Storage Infrastructure', value: 'Cloudflare R2 Edge Object Storage' },
        { label: 'Frontend Stack', value: 'Angular High-Performance SPA' },
        { label: 'Security & Access', value: 'Role-Based Authentication & Permissions' },
      ],
      features: [
        { title: 'Digital Sticky Notes', icon: LucideStickyNote },
        { title: 'Workspaces and Collaboration', icon: LucideUsers },
        { title: 'Kanban Task Organization', icon: LucideKanban },
        { title: 'Labels and Checklists', icon: LucideTag },
        { title: 'Cloud File Storage', icon: LucideCloud },
        { title: 'Authentication and Permissions', icon: LucideShieldCheck },
      ],
      logoUrl: '/companylogos/StickyJiLogo.png',
      logoAlt: 'StickyJi Digital Workspace SaaS Logo',
      previewType: 'saas',
      accentColor: '#f59e0b',
      domainUrl: 'stickyji.com',
      previewImage: '/images/software-dev-workspace.jpg',
    },
  ];

  @Output() contactClick = new EventEmitter<void>();

  openProjectModal(project: ProjectItem): void {
    this.activeModalProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.activeModalProject.set(null);
    document.body.style.overflow = '';
  }

  onDiscussProject(): void {
    this.closeProjectModal();
    this.contactClick.emit();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'contact';
    }
  }
}

