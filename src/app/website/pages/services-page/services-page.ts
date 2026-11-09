import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideCode2,
  LucideSmartphone,
  LucideCloud,
  LucideSparkles,
  LucidePalette,
  LucideShieldCheck,
  LucideSettings,
  LucideCheck,
  LucideLayers,
  LucideUsers,
  LucideClock,
  LucideAward,
  LucideCpu,
  LucideDatabase,
  LucideServer,
  LucideMapPin,
  LucidePhone,
  LucideMail,
  LucideRocket,
  LucideExternalLink,
  LucideChevronDown,
  LucideArrowUpRight,
  LucideEye,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface DetailedService {
  id: string;
  num: string;
  category: 'web' | 'mobile' | 'cloud' | 'ai' | 'uiux' | 'qa' | 'devops';
  badge: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  description: string;
  image: string;
  deliverables: string[];
  techStack: string[];
  icon: AppIconDefinition;
  idealFor: string;
}

export interface EngagementModel {
  title: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  icon: AppIconDefinition;
}

export interface ServiceShowcaseProject {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  tech: string[];
  image: string;
  statsLabel: string;
  statsValue: string;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPage {
  private readonly router = inject(Router);

  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideCode2 = LucideCode2;
  readonly LucideSmartphone = LucideSmartphone;
  readonly LucideCloud = LucideCloud;
  readonly LucideSparkles = LucideSparkles;
  readonly LucidePalette = LucidePalette;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideSettings = LucideSettings;
  readonly LucideCheck = LucideCheck;
  readonly LucideLayers = LucideLayers;
  readonly LucideUsers = LucideUsers;
  readonly LucideClock = LucideClock;
  readonly LucideAward = LucideAward;
  readonly LucideCpu = LucideCpu;
  readonly LucideDatabase = LucideDatabase;
  readonly LucideServer = LucideServer;
  readonly LucideMapPin = LucideMapPin;
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;
  readonly LucideRocket = LucideRocket;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideChevronDown = LucideChevronDown;
  readonly LucideArrowUpRight = LucideArrowUpRight;
  readonly LucideEye = LucideEye;

  readonly activeCategory = signal<string>('all');
  readonly activeRibbonId = signal<string>('custom-software');

  readonly services: DetailedService[] = [
    {
      id: 'custom-software',
      num: '01',
      category: 'web',
      badge: 'ENTERPRISE WEB PLATFORMS',
      title: 'Custom Software & Web Engineering',
      displayTitle: 'CUSTOM SOFTWARE & ARCHITECTURE',
      subtitle: 'Scalable, performant, and secure single-page web applications',
      description:
        'We design and build bespoke web platforms tailored to your business operations. By adopting component-driven architectures, modular boundaries, and strict type safety, we ensure your software remains fast, maintainable, and cost-effective over years of growth.',
      image: '/images/services/service-software.jpg',
      deliverables: [
        'High-Performance Angular & React SPAs',
        'Scalable REST & GraphQL Microservice APIs',
        'Role-Based Enterprise Dashboards & Admin Portals',
        'Database Modeling & Index Optimization (SQL / NoSQL)',
      ],
      techStack: ['Angular', 'React', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
      icon: LucideCode2,
      idealFor: 'B2B SaaS, Customer Portals, E-Commerce, Internal Business Tools',
    },
    {
      id: 'mobile-development',
      num: '02',
      category: 'mobile',
      badge: 'CROSS-PLATFORM MOBILE',
      title: 'Mobile Application Engineering',
      displayTitle: 'MOBILE APPLICATION ECOSYSTEMS',
      subtitle: 'Native-feel iOS and Android applications with unified codebases',
      description:
        'We engineer fluid mobile applications that provide intuitive user experiences, rapid frame rates, offline data synchronization, and seamless integration with hardware features like GPS, camera, biometric auth, and push notifications.',
      image: '/images/services/service-mobile.jpg',
      deliverables: [
        'Cross-Platform iOS & Android Apps (React Native / Flutter)',
        'Offline-First Data Synchronization & Local Storage',
        'Real-time Geolocation, GPS Tracking & Mapping',
        'App Store & Google Play Store Submission Management',
      ],
      techStack: ['React Native', 'Flutter', 'TypeScript', 'Firebase', 'Native APIs', 'Redux / Zustand'],
      icon: LucideSmartphone,
      idealFor: 'On-Demand Marketplaces, Consumer Apps, Field Operations, Logistics',
    },
    {
      id: 'cloud-devops',
      num: '03',
      category: 'cloud',
      badge: 'CLOUD INFRASTRUCTURE',
      title: 'Cloud Architecture & DevOps Automation',
      displayTitle: 'CLOUD & DEVOPS INFRASTRUCTURE',
      subtitle: 'Resilient, cost-efficient, and auto-scaling cloud deployments',
      description:
        'We design, configure, and maintain production cloud architectures that maximize uptime while optimizing infrastructure spend. From zero-downtime CI/CD deployment pipelines to serverless edge computing, your applications are engineered for 99.99% availability.',
      image: '/images/services/service-cloud.jpg',
      deliverables: [
        'Cloudflare Edge Storage (R2) & Serverless Workers',
        'Automated CI/CD Pipelines (GitHub Actions / GitLab CI)',
        'Containerization & Orchestration (Docker & Kubernetes)',
        'Infrastructure as Code, Auto-scaling & Disaster Recovery',
      ],
      techStack: ['Cloudflare', 'AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Nginx'],
      icon: LucideCloud,
      idealFor: 'High-Traffic Platforms, SaaS Companies, Multi-Region Deployments',
    },
    {
      id: 'ai-workflows',
      num: '04',
      category: 'ai',
      badge: 'INTELLIGENT WORKFLOWS',
      title: 'AI & Machine Learning Integration',
      displayTitle: 'AI & INTELLIGENT WORKFLOWS',
      subtitle: 'Pragmatic AI systems that automate tasks and elevate productivity',
      description:
        'We implement practical AI capabilities that create real business value rather than gimmicks. From intelligent semantic search and custom LLM agent workflows to automated data extraction and conversational interfaces, we make your applications smarter.',
      image: '/images/services/service-ai.jpg',
      deliverables: [
        'Custom LLM API Integrations & Agentic Workflows',
        'Retrieval-Augmented Generation (RAG) & Vector Search',
        'Automated Document Processing & Classification',
        'Predictive Analytics & Recommendation Engines',
      ],
      techStack: ['Python', 'OpenAI APIs', 'Gemini APIs', 'LangChain', 'Pinecone', 'FastAPI'],
      icon: LucideSparkles,
      idealFor: 'Customer Support Automation, Intelligent Search, Business Intelligence',
    },
    {
      id: 'ui-ux-design',
      num: '05',
      category: 'uiux',
      badge: 'PRODUCT DESIGN',
      title: 'UI/UX & Design Systems',
      displayTitle: 'UI/UX & DESIGN SYSTEMS',
      subtitle: 'Accessible, intuitive interfaces engineered for conversion',
      description:
        'Great engineering begins with thoughtful design. We craft interfaces that solve complex workflows through intuitive simplicity. Our design systems bridge the gap between design in Figma and production code in Angular and React.',
      image: '/images/services/service-uiux.jpg',
      deliverables: [
        'Comprehensive Component Design Systems in Figma',
        'Interactive High-Fidelity Clickable Prototypes',
        'User Journey Mapping, Information Architecture & Usability',
        'WCAG 2.1 Accessibility & Responsive Layouts',
      ],
      techStack: ['Figma', 'Design Tokens', 'Design Systems', 'Prototyping', 'Accessibility'],
      icon: LucidePalette,
      idealFor: 'New Product Launches, UX Redesigns, SaaS Dashboards',
    },
    {
      id: 'quality-assurance',
      num: '06',
      category: 'qa',
      badge: 'AUTOMATED TESTING',
      title: 'Quality Assurance & Automated Testing',
      displayTitle: 'QA AUTOMATION & SECURITY',
      subtitle: 'Comprehensive automated test suites for zero-defect releases',
      description:
        'We embed testing deeply into the development lifecycle. With automated unit, integration, and end-to-end test suites, your application remains resilient against regressions, security vulnerabilities, and unexpected load spikes.',
      image: '/images/services/service-qa.jpg',
      deliverables: [
        'Automated Unit & Component Test Suites (Vitest / Jest)',
        'End-to-End Automated Browser Testing (Playwright / Cypress)',
        'API Regression & Security Penetration Benchmarking',
        'Performance, Latency & Load Stress Testing',
      ],
      techStack: ['Vitest', 'Jest', 'Playwright', 'Cypress', 'Postman', 'k6 Load Testing'],
      icon: LucideShieldCheck,
      idealFor: 'Mission-Critical Applications, Enterprise Migrations, Fintech & Healthcare',
    },
    {
      id: 'maintenance-devops',
      num: '07',
      category: 'devops',
      badge: 'SUPPORT & EVOLUTION',
      title: 'Continuous Maintenance & DevOps SLA',
      displayTitle: 'CONTINUOUS SLA & DEV MAINTENANCE',
      subtitle: 'Proactive monitoring, security patching, and ongoing feature sprints',
      description:
        'Software requires ongoing care to stay fast and secure. We provide dedicated post-launch SLA support, real-time error telemetry, cloud infrastructure tuning, and continuous development sprints to keep your application ahead of competitors.',
      image: '/images/services/service-maintenance.jpg',
      deliverables: [
        '24/7 Production Telemetry & Real-Time Uptime Monitoring',
        'Regular Security Patches, Dependency Upgrades & Audits',
        'Database Query Tuning & Cloud Resource Cost Optimization',
        'Guaranteed SLA Response Times for Incident Management',
      ],
      techStack: ['Datadog', 'Sentry', 'Grafana', 'CloudWatch', 'Uptime Kuma', 'GitOps'],
      icon: LucideSettings,
      idealFor: 'Post-Launch Platforms, Mission-Critical Systems, Growing SaaS',
    },
  ];

  // Section 02 from Reference Image: Project Showcase Gallery
  readonly showcaseProjects: ServiceShowcaseProject[] = [
    {
      id: 'sgtc',
      name: 'SGTC India',
      category: 'Business Website & B2B Portal',
      badge: 'ANGULAR PRODUCTION',
      description:
        'A professional commercial website showcasing laboratory equipment, scientific consumables, and automated quote generation.',
      tech: ['Angular 22', 'TypeScript', 'SCSS', 'Node.js'],
      image: '/sgtc.png',
      statsLabel: 'Architecture',
      statsValue: 'Sub-second Load & SEO Tuned',
    },
    {
      id: 'oonloop',
      name: 'OonLoop Marketplace Ecosystem',
      category: 'Multi-Sided Commerce Platform',
      badge: '4-APP ECOSYSTEM',
      description:
        'Complete on-demand ecosystem interconnecting Customer Apps, Merchant Vendor Apps, Delivery Rider Apps, and Centralized Super-Admin.',
      tech: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Angular'],
      image: '/oonloop.png',
      statsLabel: 'Platforms',
      statsValue: '4 Dedicated Integrated Apps',
    },
    {
      id: 'stickyji',
      name: 'StickyJi Digital Workspace SaaS',
      category: 'Proprietary Cloud Product',
      badge: 'OUR OWN SAAS',
      description:
        'Our in-house digital workspace and task management SaaS platform featuring real-time sticky notes, Kanban workflows, and Cloudflare R2 storage.',
      tech: ['Angular', 'Node.js', 'Cloudflare R2', 'MongoDB'],
      image: '/companylogos/StickyJiHorizontalLogo.png',
      statsLabel: 'Cloud Storage',
      statsValue: 'Cloudflare Edge Mesh',
    },
  ];

  readonly engagementModels: EngagementModel[] = [
    {
      title: 'Dedicated Engineering Team',
      badge: 'SPRINT CAPACITY',
      tagline: 'Senior engineering talent embedded into your product roadmap',
      description:
        'Ideal for scaling startups and enterprises requiring continuous development velocity. We integrate directly into your daily standups, sprints, and communication tools.',
      features: [
        'Dedicated senior engineers matched to your stack',
        'Direct Slack, Teams & Video communication',
        'Transparent bi-weekly sprint delivery & velocity tracking',
        'Flexible capacity scaling as requirements evolve',
      ],
      bestFor: 'Growing Startups, Continuous Product Evolution, Scale-ups',
      icon: LucideUsers,
    },
    {
      title: 'Fixed-Scope Project Delivery',
      badge: 'MILESTONE-BASED',
      tagline: 'Guaranteed delivery with predefined scope, timeline and budget',
      description:
        'Ideal for distinct projects with clearly mapped requirements. We manage the entire lifecycle from discovery and architecture to deployment with fixed milestone commitments.',
      features: [
        'Predictable fixed-cost pricing with zero hidden fees',
        'Structured milestone deliveries & demonstration checkpoints',
        'Comprehensive documentation and automated test suites',
        'Post-launch 30-day warranty & support coverage',
      ],
      bestFor: 'MVPs, New Web & Mobile Platforms, Version 1.0 Launches',
      icon: LucideClock,
    },
    {
      title: 'CTO & Architecture Advisory',
      badge: 'STRATEGIC GUIDANCE',
      tagline: 'Senior technical leadership and architectural validation',
      description:
        'Strategic advisory for founders and leadership teams who need expert guidance on technology stack selection, system audits, cloud infrastructure optimization, or AI adoption.',
      features: [
        'Architecture audits & technical debt mitigation roadmaps',
        'Cloud infrastructure cost reduction & optimization',
        'Security & compliance readiness assessments',
        'AI strategy and workflow integration planning',
      ],
      bestFor: 'Founders, Non-Technical Leaders, Scaling Architecture Audits',
      icon: LucideAward,
    },
  ];

  filterCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  selectRibbon(id: string): void {
    this.activeRibbonId.set(id);
  }

  get filteredServices(): DetailedService[] {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.services;
    }
    return this.services.filter((s) => s.category === cat);
  }

  onContact(serviceTitle?: string): void {
    const queryParams = serviceTitle ? { service: serviceTitle } : undefined;
    this.router.navigate(['/contact'], {
      queryParams,
      fragment: 'contact-form',
    }).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onViewProjects(): void {
    this.router.navigate(['/projects']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
