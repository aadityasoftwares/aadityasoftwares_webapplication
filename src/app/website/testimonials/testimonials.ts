import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  LucideQuote,
  LucideStar,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCheckCircle2,
  LucideSparkles,
} from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface TestimonialItem {
  readonly clientName: string;
  readonly role: string;
  readonly company: string;
  readonly logoUrl?: string;
  readonly quote: string;
  readonly outcome: string;
  readonly rating: number;
  readonly verifiedType: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonials {
  readonly LucideQuote = LucideQuote;
  readonly LucideStar = LucideStar;
  readonly LucideChevronLeft = LucideChevronLeft;
  readonly LucideChevronRight = LucideChevronRight;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideSparkles = LucideSparkles;

  readonly activeIndex = signal<number>(0);

  readonly testimonials: TestimonialItem[] = [
    {
      clientName: 'Leadership Team',
      role: 'Operations & Strategy',
      company: 'SGTC INDIA',
      logoUrl: '/sgtc.png',
      quote:
        'Aaditya Softwares engineered our digital catalog with remarkable performance and precision. Their technical expertise structured a massive inventory of lab instruments into an intuitive web experience that our enterprise buyers love.',
      outcome: 'Streamlined quote inquiries & sub-second search catalog',
      rating: 5,
      verifiedType: 'Enterprise Client',
    },
    {
      clientName: 'Founding Team',
      role: 'Product & Technology',
      company: 'oonloop',
      logoUrl: '/oonloop.png',
      quote:
        'Building a 4-application marketplace across Customer, Storefront, Rider, and Admin applications was a massive engineering undertaking. Aaditya Softwares executed every sprint cleanly with zero downtime and total transparency.',
      outcome: '4 Connected Applications launched with zero downtime',
      rating: 5,
      verifiedType: 'E-Commerce Marketplace',
    },
    {
      clientName: 'Product Director',
      role: 'VP of Technology',
      company: 'High-Growth Tech Venture',
      logoUrl: '/companylogos/StickyJiLogo.png',
      quote:
        'What sets Aaditya Softwares apart is their real SaaS builder DNA. They do not just write code for hire—they own and scale StickyJi, which gives them unparalleled insight into state sync, scalability, and UX craftsmanship.',
      outcome: '100% Code ownership & seamless 2-week sprint releases',
      rating: 5,
      verifiedType: 'Cloud SaaS Platform',
    },
  ];

  next(): void {
    const nextIdx = (this.activeIndex() + 1) % this.testimonials.length;
    this.activeIndex.set(nextIdx);
  }

  prev(): void {
    const prevIdx = (this.activeIndex() - 1 + this.testimonials.length) % this.testimonials.length;
    this.activeIndex.set(prevIdx);
  }

  select(idx: number): void {
    this.activeIndex.set(idx);
  }
}
