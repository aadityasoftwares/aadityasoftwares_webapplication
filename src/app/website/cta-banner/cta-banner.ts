import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideExternalLink,
  LucideShieldCheck,
  LucideClock,
  LucideAward,
  LucideBriefcase,
  LucideSparkles,
} from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';
import { ScrollReveal } from '../scroll-reveal';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [AppIcon, Button, ScrollReveal],
  templateUrl: './cta-banner.html',
  styleUrl: './cta-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaBanner {
  private readonly router = inject(Router);
  readonly contactClick = output<void>();

  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideClock = LucideClock;
  readonly LucideAward = LucideAward;
  readonly LucideBriefcase = LucideBriefcase;
  readonly LucideSparkles = LucideSparkles;

  readonly trustStats = [
    { value: '3+', label: 'Years Experience' },
    { value: '100%', label: 'Client Happy Ratio' },
    { value: '12+', label: 'Delivered Projects' },
    { value: '1', label: 'Own SaaS Product' },
  ];

  onDiscuss(): void {
    this.contactClick.emit();
    this.router.navigate(['/contact'], { fragment: 'contact-form' }).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
