import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  LucideRocket,
  LucideLayers,
  LucideArrowUpRight,
  LucideBuilding,
  LucideGlobe,
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
  firstName?: string;
  lastName?: string;
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
export class ContactPage implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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
  readonly LucideRocket = LucideRocket;
  readonly LucideLayers = LucideLayers;
  readonly LucideArrowUpRight = LucideArrowUpRight;
  readonly LucideBuilding = LucideBuilding;
  readonly LucideGlobe = LucideGlobe;

  readonly isSubmitting = signal(false);
  readonly isSubmitted = signal(false);
  readonly errorMessage = signal('');

  formData: ContactFormData = {
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    phone: '',
    serviceCategory: 'Custom Software Development',
    budgetRange: '$15k - $30k',
    projectDetails: '',
  };

  readonly serviceOptions = [
    'Custom Software Development',
    'Mobile App Development',
    'Cloud Infrastructure & DevOps',
    'AI-Powered Engineering',
    'Product Strategy & UI/UX Design',
    'Quality Assurance & Testing',
    'Maintenance & Continuous Support',
    'Full-Cycle Dedicated Team',
  ];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const serviceParam = params.get('service');
      if (serviceParam) {
        this.selectServiceCategory(serviceParam);
        setTimeout(() => this.scrollToForm(), 120);
      }
    });

    this.route.fragment.subscribe((frag) => {
      if (frag === 'contact-form') {
        setTimeout(() => this.scrollToForm(), 120);
      }
    });
  }

  private selectServiceCategory(query: string): void {
    if (!query) return;
    const cleanQuery = query.trim().toLowerCase();

    // Mapping known service IDs and slugs to standard service options
    const aliases: Record<string, string> = {
      'custom-software': 'Custom Software Development',
      'custom software': 'Custom Software Development',
      'custom software development': 'Custom Software Development',
      'custom software & web engineering': 'Custom Software Development',
      'web': 'Custom Software Development',
      'mobile-apps': 'Mobile App Development',
      'mobile app': 'Mobile App Development',
      'mobile app development': 'Mobile App Development',
      'mobile application engineering': 'Mobile App Development',
      'mobile application ecosystems (ios & android)': 'Mobile App Development',
      'cloud-devops': 'Cloud Infrastructure & DevOps',
      'cloud infrastructure & devops': 'Cloud Infrastructure & DevOps',
      'cloud architecture & devops automation': 'Cloud Infrastructure & DevOps',
      'cloud': 'Cloud Infrastructure & DevOps',
      'devops': 'Cloud Infrastructure & DevOps',
      'ai-engineering': 'AI-Powered Engineering',
      'ai-powered engineering': 'AI-Powered Engineering',
      'ai & machine learning workflows': 'AI-Powered Engineering',
      'ai': 'AI-Powered Engineering',
      'ui-ux': 'Product Strategy & UI/UX Design',
      'uiux': 'Product Strategy & UI/UX Design',
      'product strategy & ui/ux design': 'Product Strategy & UI/UX Design',
      'ui/ux & design systems': 'Product Strategy & UI/UX Design',
      'design': 'Product Strategy & UI/UX Design',
      'qa-testing': 'Quality Assurance & Testing',
      'quality assurance & testing': 'Quality Assurance & Testing',
      'qa automation & security audits': 'Quality Assurance & Testing',
      'qa': 'Quality Assurance & Testing',
      'testing': 'Quality Assurance & Testing',
      'maintenance': 'Maintenance & Continuous Support',
      'maintenance & continuous support': 'Maintenance & Continuous Support',
      'support': 'Maintenance & Continuous Support',
      'full-cycle': 'Full-Cycle Dedicated Team',
      'dedicated team': 'Full-Cycle Dedicated Team',
      'full-cycle dedicated team': 'Full-Cycle Dedicated Team',
    };

    if (aliases[cleanQuery]) {
      this.formData.serviceCategory = aliases[cleanQuery];
      return;
    }

    // Direct match against serviceOptions
    const exactMatch = this.serviceOptions.find(
      (opt) => opt.toLowerCase() === cleanQuery
    );
    if (exactMatch) {
      this.formData.serviceCategory = exactMatch;
      return;
    }

    // Substring/partial match
    const partialMatch = this.serviceOptions.find(
      (opt) =>
        opt.toLowerCase().includes(cleanQuery) ||
        cleanQuery.includes(opt.toLowerCase())
    );
    if (partialMatch) {
      this.formData.serviceCategory = partialMatch;
    }
  }

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

  scrollToForm(): void {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

  onSubmit(): void {
    const name =
      this.formData.fullName.trim() ||
      `${this.formData.firstName || ''} ${this.formData.lastName || ''}`.trim();

    if (!name || !this.formData.email.trim() || !this.formData.projectDetails.trim()) {
      this.errorMessage.set('Please fill out all required fields (Name, Email, and Project Details).');
      return;
    }

    this.formData.fullName = name;
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
      firstName: '',
      lastName: '',
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
