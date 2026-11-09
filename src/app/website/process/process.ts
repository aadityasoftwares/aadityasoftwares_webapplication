import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import {
  LucideShieldCheck,
  LucideCpu,
  LucideCode2,
  LucideCircleCheck,
  LucideCheckCircle2,
  LucideRocket,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface ProcessStep {
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly duration: string;
  readonly headline: string;
  readonly description: string;
  readonly deliverables: string[];
  readonly icon: AppIconDefinition;
  readonly posLeft: string;
  readonly posTop: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, AppIcon, ScrollReveal],
  templateUrl: './process.html',
  styleUrl: './process.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process implements OnInit, OnDestroy {
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideCpu = LucideCpu;
  readonly LucideCode2 = LucideCode2;
  readonly LucideCircleCheck = LucideCircleCheck;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideRocket = LucideRocket;

  readonly activeStepIndex = signal<number>(0);
  readonly isPaused = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  readonly steps: ProcessStep[] = [
    {
      id: '01',
      name: 'Secure by Design',
      tag: 'Protected',
      duration: 'Week 1',
      headline: 'Your data stays protected',
      description:
        'Secure authentication, access control and data protection built into every application.',
      deliverables: [
        'OWASP Top 10 Security Architecture',
        'Role-Based Access Control (RBAC)',
        'Data Encryption at Rest & In-Transit',
        'Zero-Trust Secrets & Credential Management',
      ],
      icon: LucideShieldCheck,
      posLeft: '50%',
      posTop: '8.7%',
    },
    {
      id: '02',
      name: 'AI-Powered Development',
      tag: 'AI Assisted',
      duration: 'Week 1 - 2',
      headline: 'Smarter development with AI',
      description:
        'AI-assisted coding, faster workflows and smarter problem-solving with developer oversight.',
      deliverables: [
        'AI-Accelerated Code Scaffolding',
        'Automated PR Review Heuristics',
        'Intelligent Refactoring & Code Linting',
        'Senior Engineer Manual Verification',
      ],
      icon: LucideCpu,
      posLeft: '89.3%',
      posTop: '37.2%',
    },
    {
      id: '03',
      name: 'Clean Code Quality',
      tag: 'Maintainable',
      duration: '2-Week Cycles',
      headline: 'Better code. Better products.',
      description:
        'Structured architecture, reusable components and maintainable code.',
      deliverables: [
        'Modular Component Architecture',
        'Strict TypeScript & Type-Safe APIs',
        'Reusable Design System Tokens',
        'Maintainable Clean Architecture Standards',
      ],
      icon: LucideCode2,
      posLeft: '74.3%',
      posTop: '83.4%',
    },
    {
      id: '04',
      name: 'Tested Before Release',
      tag: 'Quality Checked',
      duration: 'Continuous',
      headline: 'Catch issues before users do',
      description:
        'Testing, code reviews and validation to reduce bugs and production risks.',
      deliverables: [
        'Automated Unit & Integration Test Suites',
        'End-to-End User Flow Validation',
        'Cross-Browser & Responsive Stress Tests',
        'Lighthouse Performance 95+ Score Checks',
      ],
      icon: LucideCircleCheck,
      posLeft: '25.7%',
      posTop: '83.4%',
    },
    {
      id: '05',
      name: 'Reliable Deployment',
      tag: 'Production Ready',
      duration: 'Launch & Scale',
      headline: 'Deploy with confidence',
      description:
        'Careful releases, environment configuration and deployment checks to minimize downtime.',
      deliverables: [
        'Automated CI/CD Pipeline Automation',
        'Zero-Downtime Blue/Green Deployments',
        'Cloud Health Alarms & Uptime Telemetry',
        '100% Repository & IP Ownership Handover',
      ],
      icon: LucideRocket,
      posLeft: '10.7%',
      posTop: '37.2%',
    },
  ];

  readonly activeStep = computed(() => this.steps[this.activeStepIndex()]);

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused()) {
        this.nextStep();
      }
    }, 4500);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  pauseAutoPlay(): void {
    this.isPaused.set(true);
  }

  resumeAutoPlay(): void {
    this.isPaused.set(false);
  }

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  selectStep(index: number): void {
    if (this.activeStepIndex() === index) return;
    this.activeStepIndex.set(index);
    this.startAutoPlay();
    this.animateStepChange();
  }

  nextStep(): void {
    this.activeStepIndex.update((current) => (current + 1) % this.steps.length);
    this.animateStepChange();
  }

  private animateStepChange(): void {
    if (typeof window === 'undefined') return;
    const cards = this.elementRef.nativeElement.querySelectorAll('.deliverable-card');
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
      );
    }
  }
}
