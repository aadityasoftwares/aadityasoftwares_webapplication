import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucideChevronUp, LucidePlus, LucideArrowRight, LucideSparkles } from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';
import { TechIcon } from './tech-icon';

export type TechCategory = 'all' | 'frontend' | 'backend' | 'mobile' | 'cloud' | 'devops';

export interface TechItem {
  readonly name: string;
  readonly iconKey: string;
  readonly category: TechCategory;
  readonly categoryLabel: string;
  readonly role: string;
  readonly badge: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TechIcon, AppIcon, ScrollReveal],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStack {
  readonly LucideChevronUp = LucideChevronUp;
  readonly LucidePlus = LucidePlus;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideSparkles = LucideSparkles;

  readonly activeCategory = signal<TechCategory>('all');
  readonly showAll = signal<boolean>(false);
  readonly initialVisibleCount = 12;

  readonly categories: { id: TechCategory; label: string }[] = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'mobile', label: 'Mobile Cross-Platform' },
    { id: 'cloud', label: 'Database & Cloud' },
    { id: 'devops', label: 'DevOps & Testing' },
  ];

  readonly technologies: TechItem[] = [
    {
      name: 'Angular 22',
      iconKey: 'angular',
      category: 'frontend',
      categoryLabel: 'Frontend Framework',
      role: 'Enterprise Single-Page Applications with Signals & Standalone Architecture',
      badge: 'Core Framework',
    },
    {
      name: 'TypeScript',
      iconKey: 'typescript',
      category: 'frontend',
      categoryLabel: 'Programming Language',
      role: 'Strict Typing, Robust Refactoring, and Modern JavaScript Features',
      badge: 'Primary Language',
    },
    {
      name: 'JavaScript (ES6+)',
      iconKey: 'javascript',
      category: 'frontend',
      categoryLabel: 'Programming Language',
      role: 'High-Performance Client-Side Scripting & Dynamic Web Interactions',
      badge: 'Web Standard',
    },
    {
      name: 'React',
      iconKey: 'react',
      category: 'frontend',
      categoryLabel: 'UI Library',
      role: 'Declarative Component-Driven Interfaces & Interactive Dashboards',
      badge: 'Modern UI',
    },
    {
      name: 'Next.js',
      iconKey: 'nextjs',
      category: 'frontend',
      categoryLabel: 'Full-Stack Framework',
      role: 'Server-Side Rendering, Static Site Generation & Hybrid Web Apps',
      badge: 'Production SSR',
    },
    {
      name: 'Python',
      iconKey: 'python',
      category: 'backend',
      categoryLabel: 'Programming Language',
      role: 'Backend Microservices, Intelligent Automation & High-Performance Data APIs',
      badge: 'Core Backend',
    },
    {
      name: 'Node.js',
      iconKey: 'nodejs',
      category: 'backend',
      categoryLabel: 'Runtime Engine',
      role: 'Event-Driven Asynchronous Non-Blocking Microservices & APIs',
      badge: 'High Throughput',
    },
    {
      name: 'Express.js',
      iconKey: 'express',
      category: 'backend',
      categoryLabel: 'Backend Framework',
      role: 'Robust RESTful API Routing & Scalable Server Middleware',
      badge: 'Production APIs',
    },
    {
      name: 'FastAPI',
      iconKey: 'fastapi',
      category: 'backend',
      categoryLabel: 'API Framework',
      role: 'High-Speed Python Asynchronous APIs with Automated OpenAPI Docs',
      badge: 'High Speed',
    },
    {
      name: 'React Native',
      iconKey: 'reactnative',
      category: 'mobile',
      categoryLabel: 'Mobile Framework',
      role: 'Cross-Platform Native Apps for iOS & Android (Powers Oonloop Ecosystem)',
      badge: 'Native Mobile',
    },
    {
      name: 'Flutter',
      iconKey: 'flutter',
      category: 'mobile',
      categoryLabel: 'Mobile Framework',
      role: 'High-Fidelity Multi-Platform Mobile Apps with Unified UI Engine',
      badge: 'Cross-Platform',
    },
    {
      name: 'MongoDB',
      iconKey: 'mongodb',
      category: 'cloud',
      categoryLabel: 'NoSQL Database',
      role: 'Document Cloud Database Engineered for High Scale & Rapid Iteration',
      badge: 'Cloud Document',
    },
    {
      name: 'PostgreSQL',
      iconKey: 'postgresql',
      category: 'cloud',
      categoryLabel: 'Relational Database',
      role: 'ACID-Compliant Relational Data Store with Complex Query Performance',
      badge: 'Enterprise SQL',
    },
    {
      name: 'Redis',
      iconKey: 'redis',
      category: 'cloud',
      categoryLabel: 'In-Memory Store',
      role: 'Sub-Millisecond Caching, Pub/Sub Messaging, and High-Speed Rate Limiting',
      badge: 'Ultra Fast',
    },
    {
      name: 'Docker',
      iconKey: 'docker',
      category: 'devops',
      categoryLabel: 'Containerization',
      role: 'Isolated Reproducible Container Environments for Seamless Deployments',
      badge: 'DevOps Standard',
    },
    {
      name: 'AWS Cloud',
      iconKey: 'aws',
      category: 'cloud',
      categoryLabel: 'Cloud Platform',
      role: 'High-Availability Cloud Infrastructure, Auto-Scaling & Serverless Execution',
      badge: 'Global Cloud',
    },
    {
      name: 'Cloudflare',
      iconKey: 'cloudflare',
      category: 'cloud',
      categoryLabel: 'Edge & CDN',
      role: 'Edge Caching, DDoS Protection, DNS Routing & Zero-Trust Cloud Security',
      badge: 'Edge Network',
    },
    {
      name: 'Vitest & Playwright',
      iconKey: 'vitest',
      category: 'devops',
      categoryLabel: 'Test Automation',
      role: 'Blazing-Fast Unit, Integration & End-to-End Automated Test Suites',
      badge: 'Zero Defect',
    },
    {
      name: 'Tailwind CSS',
      iconKey: 'tailwind',
      category: 'frontend',
      categoryLabel: 'CSS Framework',
      role: 'Utility-First Scalable Styling for Rapid Responsive Interfaces',
      badge: 'Utility CSS',
    },
    {
      name: 'SCSS / Sass',
      iconKey: 'scss',
      category: 'frontend',
      categoryLabel: 'CSS Preprocessor',
      role: 'Modular Design Tokens, Clean Mixins, and Architectural Design Systems',
      badge: 'Design Tokens',
    },
    {
      name: 'Git & GitHub Actions',
      iconKey: 'git',
      category: 'devops',
      categoryLabel: 'CI/CD Automation',
      role: 'Version Control, Branch Protection & Automated Continuous Delivery Pipelines',
      badge: 'Automated CI/CD',
    },
    {
      name: 'NestJS',
      iconKey: 'nestjs',
      category: 'backend',
      categoryLabel: 'Backend Framework',
      role: 'Enterprise Scalable Node.js Server Architecture with Dependency Injection',
      badge: 'Enterprise Node',
    },
    {
      name: 'GraphQL & Apollo',
      iconKey: 'graphql',
      category: 'backend',
      categoryLabel: 'Query Language',
      role: 'Declarative Typed Data Fetching, Unified Schemas & Zero Over-Fetching',
      badge: 'Modern APIs',
    },
    {
      name: 'MySQL',
      iconKey: 'mysql',
      category: 'cloud',
      categoryLabel: 'Relational Database',
      role: 'ACID Transactions, High-Availability Replicas & Scalable Data Models',
      badge: 'Enterprise SQL',
    },
    {
      name: 'Supabase',
      iconKey: 'supabase',
      category: 'cloud',
      categoryLabel: 'Cloud Platform',
      role: 'Instant Realtime PostgreSQL Database, Authentication & Edge Serverless',
      badge: 'Realtime Cloud',
    },
    {
      name: 'Kubernetes (K8s)',
      iconKey: 'kubernetes',
      category: 'devops',
      categoryLabel: 'Orchestration',
      role: 'Automated Container Deployment, Scaling, Health Probes & Cluster Resilience',
      badge: 'Cloud Native',
    },
    {
      name: 'Nginx & Linux',
      iconKey: 'nginx',
      category: 'devops',
      categoryLabel: 'Web Server & OS',
      role: 'High-Concurrency Edge Reverse Proxy, SSL Offloading & Hardened Linux Hosts',
      badge: 'Edge Proxy',
    },
    {
      name: 'Electron',
      iconKey: 'electron',
      category: 'mobile',
      categoryLabel: 'Desktop Platform',
      role: 'Cross-Platform Native Desktop Software for macOS, Windows & Linux',
      badge: 'Desktop Apps',
    },
    {
      name: 'Prisma ORM',
      iconKey: 'prisma',
      category: 'backend',
      categoryLabel: 'Database Toolkit',
      role: 'Next-Generation Type-Safe Database Modeling, Migrations & Query Engine',
      badge: 'Type-Safe ORM',
    },
    {
      name: 'Redux & NgRx',
      iconKey: 'redux',
      category: 'frontend',
      categoryLabel: 'State Management',
      role: 'Predictable Reactive State Architecture with Store DevTools & Signal Stores',
      badge: 'State Store',
    },
  ];

  readonly filteredTech = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.technologies;
    }
    return this.technologies.filter((t) => t.category === cat);
  });

  readonly displayedTech = computed(() => {
    const list = this.filteredTech();
    if (this.activeCategory() === 'all' && !this.showAll()) {
      return list.slice(0, this.initialVisibleCount);
    }
    return list;
  });

  readonly hasMoreToSee = computed(() => {
    return this.activeCategory() === 'all' && this.filteredTech().length > this.initialVisibleCount;
  });

  readonly remainingCount = computed(() => {
    return Math.max(0, this.filteredTech().length - this.initialVisibleCount);
  });

  setCategory(cat: TechCategory): void {
    this.activeCategory.set(cat);
  }

  toggleShowMore(): void {
    this.showAll.update((v) => !v);
  }
}
