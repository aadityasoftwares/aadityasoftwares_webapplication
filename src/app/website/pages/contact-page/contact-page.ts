import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideArrowRight,
  LucidePhone,
  LucideMail,
  LucideMapPin,
  LucideClock,
  LucideShieldCheck,
  LucideUsers,
  LucideCheck,
  LucideCheckCircle2,
  LucideMessageSquare,
  LucideHelpCircle,
  LucideChevronDown,
  LucideSparkles,
  LucideSend,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface FaqItem {
  question: string;
  answer: string;
  open?: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceCategory: string;
  budgetRange: string;
  projectDetails: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideClock = LucideClock;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideUsers = LucideUsers;
  readonly LucideCheck = LucideCheck;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideMessageSquare = LucideMessageSquare;
  readonly LucideHelpCircle = LucideHelpCircle;
  readonly LucideChevronDown = LucideChevronDown;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideSend = LucideSend;

  readonly isSubmitting = signal(false);
  readonly isSubmitted = signal(false);
  readonly errorMessage = signal('');

  formData: ContactFormData = {
    fullName: '',
    email: '',
    phone: '',
    serviceCategory: 'Custom Software & Web Engineering',
    budgetRange: '$15k - $30k',
    projectDetails: '',
  };

  readonly faqs = signal<FaqItem[]>([
    {
      question: 'How quickly can we start development on our project?',
      answer:
        'Following our initial architectural discovery call (usually scheduled within 24 to 48 hours), we provide a formal technical roadmap and resource allocation proposal. Development can typically kick off within 1 to 2 weeks.',
      open: true,
    },
    {
      question: 'Who owns the intellectual property and code repository?',
      answer:
        'You do—100%. From the very first sprint commit, all code, documentation, designs, and cloud infrastructure configurations belong entirely to you with zero vendor lock-in.',
      open: false,
    },
    {
      question: 'How do you structure communication and sprint updates?',
      answer:
        'We establish direct communication channels on Slack or Microsoft Teams with our senior engineers. We hold bi-weekly sprint review demos, deliver continuous Git commits, and provide transparent velocity reports.',
      open: false,
    },
    {
      question: 'Can you work with our existing codebase or legacy cloud system?',
      answer:
        'Yes. We regularly conduct comprehensive architectural and codebase audits to safely refactor legacy systems, migrate on-premise apps to the cloud, or modernize frontend stacks to Angular 22 and React.',
      open: false,
    },
    {
      question: 'Do you offer post-launch maintenance, monitoring, and SLA support?',
      answer:
        'Yes. We offer flexible post-launch SLA support plans that include 24/7 uptime telemetry, database optimization, routine security audits, and continuous iterative sprint capacity.',
      open: false,
    },
  ]);

  toggleFaq(index: number): void {
    this.faqs.update((items) =>
      items.map((item, idx) => {
        if (idx === index) {
          return { ...item, open: !item.open };
        }
        return item;
      })
    );
  }

  onSubmit(): void {
    if (!this.formData.fullName.trim() || !this.formData.email.trim() || !this.formData.projectDetails.trim()) {
      this.errorMessage.set('Please fill out all required fields (Name, Email, and Project Details).');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 600);
  }

  resetForm(): void {
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      serviceCategory: 'Custom Software & Web Engineering',
      budgetRange: '$15k - $30k',
      projectDetails: '',
    };
    this.isSubmitted.set(false);
    this.errorMessage.set('');
  }
}

