import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideChevronDown, LucideHelpCircle } from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
  readonly category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq {
  readonly LucideChevronDown = LucideChevronDown;
  readonly LucideHelpCircle = LucideHelpCircle;

  readonly openIndex = signal<number | null>(0);

  readonly faqs: FaqItem[] = [
    {
      category: 'Experience & Background',
      question: 'How much experience does Aaditya Softwares have?',
      answer:
        'Aaditya Softwares brings 3+ years of specialized full-stack engineering experience. We have delivered 12+ commercial software solutions spanning enterprise web portals, mobile marketplaces, and cloud SaaS platforms—maintaining a 100% client happy ratio. Furthermore, we own and scale our in-house productivity SaaS product, StickyJi (stickyji.com).',
    },
    {
      category: 'Ownership & IP',
      question: 'Do we receive 100% intellectual property and code ownership?',
      answer:
        'Yes, absolutely. From day one, all source code, Git repositories, deployment configurations, and intellectual property belong 100% to your organization. There are zero vendor lock-in terms or proprietary licensing fees.',
    },
    {
      category: 'Client Satisfaction',
      question: 'What is your verified client happiness ratio?',
      answer:
        'We maintain a 100% client happy ratio across all our delivered projects. We achieve this by having senior software engineers interact directly with founders and product leads, eliminating bloated agency middle-layers and upholding transparent 2-week sprint reviews.',
    },
    {
      category: 'Services & Products',
      question: 'What types of software solutions do you deliver?',
      answer:
        'We engineer responsive business web applications (Angular/React), interconnected cross-platform mobile apps (such as the 4-app Oonloop ecosystem built in React Native), and high-availability cloud SaaS systems. We also leverage our experience as founders of StickyJi to architect scalable platforms.',
    },
    {
      category: 'Process & Sprints',
      question: 'How do your development sprints and delivery timelines work?',
      answer:
        'We operate in disciplined 2-week agile sprints. You receive scheduled demo releases, real-time code access, and clear backlog visibility. This rapid feedback loop guarantees predictable delivery and avoids chaotic last-minute releases.',
    },
    {
      category: 'Getting Started',
      question: 'How do we start a project consultation with your engineers?',
      answer:
        'You can book a free strategy call or send us your project requirements. A senior software engineer will review your scope, outline an architectural roadmap, and respond within 24 hours under strict mutual NDA protection.',
    },
  ];

  toggle(index: number): void {
    if (this.openIndex() === index) {
      this.openIndex.set(null);
    } else {
      this.openIndex.set(index);
    }
  }
}
