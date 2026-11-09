import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucidePlay,
  LucideArrowRight,
  LucideX,
  LucideExternalLink,
  LucideShieldCheck,
  LucideCpu,
  LucideCode2,
  LucideCircleCheck,
  LucideRocket,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';
import { GsapAnimationService } from '../../shared/services/gsap-animation.service';

export interface DevelopmentStep {
  id: string;
  name: string;
  tag: string;
  headline: string;
  description: string;
  icon: AppIconDefinition;
  posLeft: string;
  posTop: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AppIcon, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly LucidePlay = LucidePlay;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideX = LucideX;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideCpu = LucideCpu;
  readonly LucideCode2 = LucideCode2;
  readonly LucideCircleCheck = LucideCircleCheck;
  readonly LucideRocket = LucideRocket;

  readonly isVideoModalOpen = signal(false);
  readonly activeStepIndex = signal(0);
  readonly isPaused = signal(false);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      const tl = this.gsapService.animateHero(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => {
        tl?.kill();
      });
    });
  }

  readonly steps: DevelopmentStep[] = [
    {
      id: '01',
      name: 'Secure by Design',
      tag: 'Protected',
      headline: 'Your data stays protected',
      description:
        'Secure authentication, access control and data protection built into every application.',
      icon: LucideShieldCheck,
      posLeft: '50%',
      posTop: '8.7%',
    },
    {
      id: '02',
      name: 'AI-Powered Development',
      tag: 'AI Assisted',
      headline: 'Smarter development with AI',
      description:
        'AI-assisted coding, faster workflows and smarter problem-solving with developer oversight.',
      icon: LucideCpu,
      posLeft: '89.3%',
      posTop: '37.2%',
    },
    {
      id: '03',
      name: 'Clean Code Quality',
      tag: 'Maintainable',
      headline: 'Better code. Better products.',
      description: 'Structured architecture, reusable components and maintainable code.',
      icon: LucideCode2,
      posLeft: '74.3%',
      posTop: '83.4%',
    },
    {
      id: '04',
      name: 'Tested Before Release',
      tag: 'Quality Checked',
      headline: 'Catch issues before users do',
      description:
        'Testing, code reviews and validation to reduce bugs and production risks.',
      icon: LucideCircleCheck,
      posLeft: '25.7%',
      posTop: '83.4%',
    },
    {
      id: '05',
      name: 'Reliable Deployment',
      tag: 'Production Ready',
      headline: 'Deploy with confidence',
      description:
        'Careful releases, environment configuration and deployment checks to minimize downtime.',
      icon: LucideRocket,
      posLeft: '10.7%',
      posTop: '37.2%',
    },
  ];

  readonly activeStep = computed(() => this.steps[this.activeStepIndex()]);

  @Output() exploreClick = new EventEmitter<void>();
  @Output() playClick = new EventEmitter<void>();

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

  selectStep(index: number): void {
    this.activeStepIndex.set(index);
    this.startAutoPlay();
  }

  nextStep(): void {
    this.activeStepIndex.update((current) => (current + 1) % this.steps.length);
  }

  onExplore(): void {
    this.exploreClick.emit();
    this.router.navigate(['/projects']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onPlay(): void {
    this.isVideoModalOpen.set(true);
    this.playClick.emit();
  }

  closeVideoModal(): void {
    this.isVideoModalOpen.set(false);
  }
}
