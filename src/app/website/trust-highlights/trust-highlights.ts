import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  LucideClock,
  LucideAward,
  LucideBriefcase,
  LucideSparkles,
  LucideShieldCheck,
  LucideCheckCircle2,
  LucideArrowRight,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface TrustHighlightStat {
  readonly value: string;
  readonly label: string;
  readonly description: string;
  readonly icon: AppIconDefinition;
  readonly tag: string;
}

@Component({
  selector: 'app-trust-highlights',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './trust-highlights.html',
  styleUrl: './trust-highlights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustHighlights {
  readonly contactClick = output<void>();

  readonly stats: TrustHighlightStat[] = [
    {
      value: '3+',
      label: 'Years of Experience',
      description: 'Dedicated full-stack craftsmanship, scalable architectures & modern engineering.',
      icon: LucideClock,
      tag: 'Proven Tenure',
    },
    {
      value: '100%',
      label: 'Client Happy Ratio',
      description: 'Every client receives direct engineer access, full transparency & on-time sprint delivery.',
      icon: LucideAward,
      tag: 'Total Trust',
    },
    {
      value: '12+',
      label: 'Projects Delivered',
      description: 'Business web applications, multi-tier marketplaces & production cloud systems.',
      icon: LucideBriefcase,
      tag: 'Track Record',
    },
    {
      value: '1',
      label: 'Own SaaS Product',
      description: 'Proud creators of StickyJi (stickyji.com), our flagship productivity platform.',
      icon: LucideSparkles,
      tag: 'In-House Platform',
    },
  ];

  readonly badges = [
    { label: '100% Code Ownership', icon: LucideShieldCheck },
    { label: '2-Week Agile Sprints', icon: LucideCheckCircle2 },
    { label: 'Zero Vendor Lock-in', icon: LucideShieldCheck },
    { label: 'Senior Engineers Only', icon: LucideCheckCircle2 },
  ];

  onContact(): void {
    this.contactClick.emit();
  }
}
