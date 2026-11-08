import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  LucideMapPin,
  LucidePhone,
  LucideMail,
  LucideCalendar,
  LucideAward,
  LucideWorkflow,
  LucideCheckCircle2,
  LucideSearch,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface FoundationalCommitment {
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: AppIconDefinition;
}

export interface ProcessStage {
  step: string;
  title: string;
  tagline: string;
  description: string;
  icon: AppIconDefinition;
}

export interface PracticeCard {
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tag: string;
  icon: AppIconDefinition;
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
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
  readonly LucideMapPin = LucideMapPin;
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;
  readonly LucideCalendar = LucideCalendar;
  readonly LucideAward = LucideAward;
  readonly LucideWorkflow = LucideWorkflow;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideSearch = LucideSearch;

  // 4 Foundational Commitments (Matching Top-Right 2x2 Clean Cards in Reference)
  readonly commitments: FoundationalCommitment[] = [
    {
      num: '01',
      badge: 'CLEAN ARCHITECTURE',
      title: 'Clean Formulations',
      subtitle: 'Without unnecessary dependencies or brittle hacks',
      description:
        'We write strictly typed, modular codebases designed to be read, tested, and maintained with zero technical debt.',
      icon: LucideCode2,
    },
    {
      num: '02',
      badge: 'INTENTIONAL CRAFT',
      title: 'Thoughtful Sourcing',
      subtitle: 'Selected with quality, security, and integrity',
      description:
        'Every framework, database schema, and third-party library is evaluated for long-term viability, licensing, and security.',
      icon: LucideCircleCheck,
    },
    {
      num: '03',
      badge: 'PRODUCTION STABILITY',
      title: 'Daily Reliability',
      subtitle: 'Created for sustainable, uninterrupted operations',
      description:
        'Built for 99.99% uptime with automated error telemetry, edge caching, and auto-scaling cloud microservices.',
      icon: LucideLayers,
    },
    {
      num: '04',
      badge: 'HUMAN-LED AI',
      title: 'Science-Informed',
      subtitle: 'Guided by empirical research and automated benchmarks',
      description:
        'We harness modern AI tools to accelerate velocity, while every architectural decision is strictly human-governed.',
      icon: LucideCpu,
    },
  ];

  // 4 Process Stages Flanking Central Core (Matching Middle-Right Layout in Reference)
  readonly processStages: ProcessStage[] = [
    {
      step: '01',
      title: 'Research',
      tagline: 'Understanding business domain & user requirements',
      description:
        'We unpack domain problems, interview stakeholders, and analyze technical constraints before touching a code editor.',
      icon: LucideSearch,
    },
    {
      step: '02',
      title: 'Formulate',
      tagline: 'Creating balanced, purposeful system blueprints',
      description:
        'Designing modular schemas, component design systems, and stateless API contracts engineered for durability.',
      icon: LucideTarget,
    },
    {
      step: '03',
      title: 'Test',
      tagline: 'Ensuring zero-defect releases with automated CI/CD',
      description:
        'Automated unit, integration, and load stress testing integrated directly into continuous deployment pipelines.',
      icon: LucideShieldCheck,
    },
    {
      step: '04',
      title: 'Deliver',
      tagline: 'Zero-downtime deployment & seamless operations',
      description:
        'Smooth cloud release, complete documentation, 100% intellectual property transfer, and ongoing telemetry SLA.',
      icon: LucideRocket,
    },
  ];

  // 3 Practice Cards (Matching Bottom-Right Routine Showcase in Reference)
  readonly practiceCards: PracticeCard[] = [
    {
      num: '01',
      title: 'Morning Velocity',
      tagline: 'Transparent bi-weekly sprint cadence',
      description:
        'Direct Slack/Teams developer communication, live sprint demos, and continuous progress visibility without middlemen.',
      image: '/images/hero-team.jpg',
      tag: 'Agile Cadence',
      icon: LucideUsers,
    },
    {
      num: '02',
      title: 'Daily Balance',
      tagline: 'Sub-second performance & enterprise security',
      description:
        'Optimized bundle sizes, automated vulnerability audits, and resilient cloud architectures that scale smoothly with growth.',
      image: '/images/services/service-software.jpg',
      tag: 'Enterprise Ready',
      icon: LucideZap,
    },
    {
      num: '03',
      title: 'Enduring Partnership',
      tagline: '100% IP rights & dedicated developer access',
      description:
        'You retain complete ownership of all repositories and infrastructure with zero vendor lock-in and dedicated engineering support.',
      image: '/images/services/service-cloud.jpg',
      tag: 'Full Ownership',
      icon: LucideShieldCheck,
    },
  ];

  onContact(): void {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onViewServices(): void {
    this.router.navigate(['/services']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onViewProjects(): void {
    this.router.navigate(['/projects']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
