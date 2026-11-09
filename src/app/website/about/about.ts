import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideShieldCheck,
  LucideCode2,
  LucideSparkles,
  LucideRocket,
  LucideUsers,
  LucideCircleCheck,
  LucideCpu,
  LucideCheck,
  LucideLayers,
  LucideTarget,
  LucideZap,
  LucideStar,
  LucideExternalLink,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface ApproachItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: AppIconDefinition;
}

export interface DifferentiatorItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: AppIconDefinition;
  tag: string;
}

export interface TrustPoint {
  icon: AppIconDefinition;
  title: string;
  desc: string;
}

export interface PillarDetail {
  title: string;
  description: string;
  metric: string;
  icon: AppIconDefinition;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AppIcon, ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  private readonly router = inject(Router);
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideCode2 = LucideCode2;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideRocket = LucideRocket;
  readonly LucideUsers = LucideUsers;
  readonly LucideCircleCheck = LucideCircleCheck;
  readonly LucideCpu = LucideCpu;
  readonly LucideCheck = LucideCheck;
  readonly LucideLayers = LucideLayers;
  readonly LucideTarget = LucideTarget;
  readonly LucideZap = LucideZap;
  readonly LucideStar = LucideStar;
  readonly LucideExternalLink = LucideExternalLink;

  /**
   * Methodology bullet points matching reference layout.
   */
  readonly methodologyPoints: string[] = [
    'Clear and focused strategy',
    'Clean architecture designed for scale',
    'Direct developer collaboration without chaos',
    'Predictable sprint releases that build momentum',
    'Smart solutions, tailored for you',
  ];

  /**
   * 4-Card key metrics matching reference layout.
   */
  readonly metrics = {
    experience: {
      label: 'Years of Experience',
      value: '3+',
      note: 'Full-stack engineering expertise across modern stacks.',
    },
    satisfaction: {
      ratingLabel: 'Client Happy Ratio',
      value: '100%',
      note: '100% happy clients dedicated to code quality and reliable delivery.',
    },
    projects: {
      label: 'Projects Delivered',
      value: '12+',
      note: 'High-performance web apps, marketplace ecosystems & SaaS platforms.',
    },
    brands: {
      label: 'Own SaaS Product',
      value: '1 (StickyJi)',
      displayValue: '1',
      productName: 'StickyJi',
      productUrl: 'https://stickyji.com/',
      note: 'In-house sticky notes & productivity SaaS platform.',
    },
  };

  /* Retained for backward-compatibility & testing */
  readonly pillars = ['SECURITY', 'QUALITY', 'PERFORMANCE', 'SCALABILITY'] as const;

  readonly pillarDetails: Record<
    (typeof this.pillars)[number],
    PillarDetail
  > = {
    SECURITY: {
      title: 'Security by Design',
      description:
        'OWASP-standard compliance, role-based access control, data encryption and zero-trust engineering principles.',
      metric: 'Zero-Trust Standard',
      icon: LucideShieldCheck,
    },
    QUALITY: {
      title: 'Engineered Quality',
      description:
        'Clean modular code, strict typing, automated test pipelines and rigorous peer reviews for zero-defect releases.',
      metric: 'Continuous QA',
      icon: LucideCircleCheck,
    },
    PERFORMANCE: {
      title: 'Optimized Performance',
      description:
        'Sub-second API latency, lean assets, intelligent caching strategies and tuned database queries built for speed.',
      metric: 'Sub-Second Latency',
      icon: LucideZap,
    },
    SCALABILITY: {
      title: 'Built to Scale',
      description:
        'Elastic cloud-native architecture designed to handle concurrent traffic spikes and future growth seamlessly.',
      metric: 'Elastic Architecture',
      icon: LucideLayers,
    },
  };

  readonly approaches: ApproachItem[] = [
    {
      id: 'app-1',
      num: '01',
      title: 'Understand Before We Build',
      description:
        'We take time to understand your business, requirements and goals before choosing the right technical approach.',
      icon: LucideTarget,
    },
    {
      id: 'app-2',
      num: '02',
      title: 'Engineer With Purpose',
      description:
        'We focus on clean architecture, secure development practices, maintainable code and thoughtful technical decisions.',
      icon: LucideCode2,
    },
    {
      id: 'app-3',
      num: '03',
      title: 'Use Technology Smarter',
      description:
        'We embrace modern frameworks, AI-assisted development and automation to improve productivity and solve problems efficiently.',
      icon: LucideSparkles,
    },
    {
      id: 'app-4',
      num: '04',
      title: 'Deliver With Confidence',
      description:
        'We prioritize testing, code reviews, performance and careful deployment to deliver dependable software.',
      icon: LucideRocket,
    },
  ];

  readonly differentiators: DifferentiatorItem[] = [
    {
      id: 'diff-1',
      num: '01',
      title: 'Engineering-First Mindset',
      description:
        'We prioritize technical quality, robust architecture and long-term maintainability over quick shortcuts.',
      icon: LucideCode2,
      tag: 'Clean Architecture',
    },
    {
      id: 'diff-2',
      num: '02',
      title: 'AI-Enhanced Workflows',
      description:
        'We use modern AI tools to accelerate development velocity while keeping all engineering decisions strictly human-led.',
      icon: LucideCpu,
      tag: 'High Velocity',
    },
    {
      id: 'diff-3',
      num: '03',
      title: 'Quality at Every Stage',
      description:
        'Continuous testing, automated validation and peer code reviews are deeply embedded into our daily sprints.',
      icon: LucideCircleCheck,
      tag: 'Zero Defects',
    },
    {
      id: 'diff-4',
      num: '04',
      title: 'Built for Growth',
      description:
        'We engineer systems with modularity and elastic scale in mind, so your platform grows effortlessly with your business.',
      icon: LucideZap,
      tag: 'Elastic Scale',
    },
    {
      id: 'diff-5',
      num: '05',
      title: 'Collaborative Development',
      description:
        'Direct communication, bi-weekly demos, transparent roadmaps and close alignment ensure you are always in control.',
      icon: LucideUsers,
      tag: 'Direct Sprints',
    },
    {
      id: 'diff-6',
      num: '06',
      title: 'Long-Term Thinking',
      description:
        'We engineer solutions designed to be dependable, easy to hand over and valuable well beyond initial launch.',
      icon: LucideShieldCheck,
      tag: 'Future-Proof',
    },
  ];

  readonly trustPoints: TrustPoint[] = [
    {
      icon: LucideShieldCheck,
      title: '100% Code Ownership',
      desc: 'Complete IP rights & repository access with zero vendor lock-in.',
    },
    {
      icon: LucideUsers,
      title: 'Direct Engineer Access',
      desc: 'Speak directly with your developers on Slack, Teams or video.',
    },
    {
      icon: LucideRocket,
      title: 'Predictable Sprints',
      desc: 'Bi-weekly releases with clear milestones and measurable velocity.',
    },
  ];

  @Output() contactClick = new EventEmitter<void>();

  onWorkTogether(event?: MouseEvent): void {
    event?.preventDefault();
    this.contactClick.emit();
    this.router.navigate(['/contact'], { fragment: 'contact-form' }).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
