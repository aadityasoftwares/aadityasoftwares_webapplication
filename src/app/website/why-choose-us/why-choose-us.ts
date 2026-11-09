import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideShieldCheck,
  LucideClock,
  LucideAward,
  LucideCheckCircle2,
  LucideSparkles,
  LucideZap,
  LucideX,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface WhyPillar {
  readonly title: string;
  readonly description: string;
  readonly badge: string;
  readonly icon: AppIconDefinition;
}

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyChooseUs {
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideX = LucideX;

  readonly pillars: WhyPillar[] = [
    {
      title: '100% Client Happy Ratio',
      description: 'Every client receives direct engineer access, weekly sprint reviews, and unwavering commitment to satisfaction.',
      badge: '100% Happiness',
      icon: LucideAward,
    },
    {
      title: '3+ Years of Deep Expertise',
      description: 'Senior full-stack engineering with battle-tested architectures across modern web, mobile, and cloud environments.',
      badge: '3+ Years',
      icon: LucideClock,
    },
    {
      title: '12+ Production Solutions Delivered',
      description: 'From enterprise catalog systems (SGTC India) to multi-tier marketplace apps (Oonloop), we deliver on time.',
      badge: '12+ Projects',
      icon: LucideZap,
    },
    {
      title: 'Proprietary SaaS Founders (StickyJi)',
      description: 'We do not just build for others; we engineer and scale our own live productivity platform at stickyji.com.',
      badge: 'Own SaaS',
      icon: LucideSparkles,
    },
    {
      title: '100% Intellectual Property Transfer',
      description: 'Complete code ownership, deployment scripts, and architecture blueprints belong to you from day one.',
      badge: 'Zero Lock-in',
      icon: LucideShieldCheck,
    },
    {
      title: 'Predictable 2-Week Sprint Releases',
      description: 'Agile delivery with rapid feedback loops, continuous automated testing, and direct senior engineer communication.',
      badge: 'Agile Cadence',
      icon: LucideCheckCircle2,
    },
  ];

  readonly comparisonRows = [
    { feature: 'Code & IP Ownership', traditional: 'Vendor lock-in & licensing fees', aaditya: '100% Full ownership from day one' },
    { feature: 'Communication', traditional: 'Account managers & lost context', aaditya: 'Direct senior engineer access' },
    { feature: 'Production Experience', traditional: 'Theoretical concepts only', aaditya: '12+ Shipped projects & 1 own SaaS (StickyJi)' },
    { feature: 'Release Velocity', traditional: 'Months of waiting & vague updates', aaditya: '2-Week predictable sprint demos' },
    { feature: 'Client Happiness Ratio', traditional: 'Variable & inconsistent results', aaditya: '100% Verified client happy ratio' },
  ];

  onExplore(): void {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
