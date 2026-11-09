import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  LucideCode2,
  LucideServer,
  LucideSmartphone,
  LucideDatabase,
  LucideCloud,
  LucideShieldCheck,
  LucideCpu,
  LucideLayers,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export type TechCategory = 'all' | 'frontend' | 'backend' | 'mobile' | 'cloud' | 'devops';

export interface TechItem {
  readonly name: string;
  readonly category: TechCategory;
  readonly categoryLabel: string;
  readonly role: string;
  readonly badge: string;
  readonly icon: AppIconDefinition;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStack {
  readonly activeCategory = signal<TechCategory>('all');

  readonly categories: { id: TechCategory; label: string }[] = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'mobile', label: 'Mobile Cross-Platform' },
    { id: 'cloud', label: 'Database & Cloud' },
    { id: 'devops', label: 'DevOps & QA' },
  ];

  readonly technologies: TechItem[] = [
    {
      name: 'Angular 22',
      category: 'frontend',
      categoryLabel: 'Frontend',
      role: 'Enterprise SPA Framework with Signals & Standalone Components',
      badge: 'Core Framework',
      icon: LucideCode2,
    },
    {
      name: 'React & Next.js',
      category: 'frontend',
      categoryLabel: 'Frontend',
      role: 'Component Architecture & Server-Side Rendering',
      badge: 'Modern Web',
      icon: LucideLayers,
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      categoryLabel: 'Frontend',
      role: 'Strict Typing, Robust Refactoring & Developer Ergonomics',
      badge: 'Strict Typings',
      icon: LucideCode2,
    },
    {
      name: 'SCSS & Design Tokens',
      category: 'frontend',
      categoryLabel: 'Frontend',
      role: 'Scalable Design Systems & Responsive Layouts',
      badge: 'Pixel Precision',
      icon: LucideLayers,
    },
    {
      name: 'Node.js & Express.js',
      category: 'backend',
      categoryLabel: 'Backend & APIs',
      role: 'High-Throughput Asynchronous REST & GraphQL APIs',
      badge: 'Production Backend',
      icon: LucideServer,
    },
    {
      name: 'Python & FastAPI',
      category: 'backend',
      categoryLabel: 'Backend & APIs',
      role: 'Data Pipelines, High-Speed APIs & Microservices',
      badge: 'High Performance',
      icon: LucideCpu,
    },
    {
      name: 'React Native',
      category: 'mobile',
      categoryLabel: 'Mobile Cross-Platform',
      role: 'Native Performance for iOS & Android (Powered Oonloop Multi-App)',
      badge: 'Native Mobile',
      icon: LucideSmartphone,
    },
    {
      name: 'Flutter',
      category: 'mobile',
      categoryLabel: 'Mobile Cross-Platform',
      role: 'Cross-Platform Mobile Applications with Unified UI Engine',
      badge: 'Multi-Platform',
      icon: LucideSmartphone,
    },
    {
      name: 'MongoDB',
      category: 'cloud',
      categoryLabel: 'Database & Cloud',
      role: 'NoSQL Document Store for Scalable SaaS Architectures',
      badge: 'High Availability',
      icon: LucideDatabase,
    },
    {
      name: 'PostgreSQL',
      category: 'cloud',
      categoryLabel: 'Database & Cloud',
      role: 'Relational ACID Data Integrity & Complex Queries',
      badge: 'Relational Store',
      icon: LucideDatabase,
    },
    {
      name: 'AWS & Cloudflare',
      category: 'cloud',
      categoryLabel: 'Database & Cloud',
      role: 'Edge Caching, Serverless Functions & Global CDN Delivery',
      badge: 'Global Edge',
      icon: LucideCloud,
    },
    {
      name: 'Docker & CI/CD',
      category: 'devops',
      categoryLabel: 'DevOps & QA',
      role: 'Containerization, GitHub Actions & Automated Zero-Downtime Deployments',
      badge: 'Automated CI/CD',
      icon: LucideShieldCheck,
    },
    {
      name: 'Vitest & Playwright',
      category: 'devops',
      categoryLabel: 'DevOps & QA',
      role: 'Unit & End-to-End Test Automation with Zero Defect Tolerance',
      badge: 'Quality First',
      icon: LucideShieldCheck,
    },
    {
      name: 'Redis',
      category: 'cloud',
      categoryLabel: 'Database & Cloud',
      role: 'In-Memory Caching, Pub/Sub Messaging & Rate Limiting',
      badge: 'Sub-Millisecond',
      icon: LucideDatabase,
    },
  ];

  readonly filteredTech = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') {
      return this.technologies;
    }
    return this.technologies.filter((t) => t.category === cat);
  });

  setCategory(cat: TechCategory): void {
    this.activeCategory.set(cat);
  }
}
