import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideArrowUpRight,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCheck,
  LucideX,
  LucideShieldCheck,
  LucideCpu,
  LucideCode2,
  LucideCircleCheck,
  LucideZap,
  LucideRocket,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';
import { ScrollReveal } from '../scroll-reveal';

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  highlight: string;
  description: string;
  deliverables: string[];
  image: string;
  isFeatured?: boolean;
}

export interface PrincipleItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: AppIconDefinition;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, AppIcon, Button, ScrollReveal],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  private readonly router = inject(Router);
  @ViewChild('cardsTrack') cardsTrackRef?: ElementRef<HTMLDivElement>;

  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideArrowUpRight = LucideArrowUpRight;
  readonly LucideChevronLeft = LucideChevronLeft;
  readonly LucideChevronRight = LucideChevronRight;
  readonly LucideCheck = LucideCheck;
  readonly LucideX = LucideX;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideCpu = LucideCpu;
  readonly LucideCode2 = LucideCode2;
  readonly LucideCircleCheck = LucideCircleCheck;
  readonly LucideZap = LucideZap;
  readonly LucideRocket = LucideRocket;

  @Output() ctaClick = new EventEmitter<void>();

  readonly scrollProgress = signal<number>(0);
  readonly selectedService = signal<ServiceItem | null>(null);

  readonly services: ServiceItem[] = [
    {
      id: 'ui-ux',
      num: '01',
      title: 'Product Strategy & UI/UX Design',
      category: 'Design with purpose',
      highlight: 'Design with purpose. Build with clarity.',
      description:
        'We transform your ideas into intuitive digital experiences through thoughtful planning, user-focused design and modern interfaces.',
      deliverables: [
        'Product planning and requirement analysis',
        'User journey and workflow design',
        'Wireframes and interactive prototypes',
        'Modern UI/UX design systems',
        'Responsive web and mobile interfaces',
        'Figma-based design handoff',
      ],
      image: '/images/services/service-uiux.jpg',
      isFeatured: true,
    },
    {
      id: 'custom-software',
      num: '02',
      title: 'Custom Software Development',
      category: 'Tailored for your business',
      highlight: 'Software built around your business.',
      description:
        'We build tailored software applications designed around your business requirements, with clean architecture, reliable functionality and room to grow.',
      deliverables: [
        'Custom web application development',
        'SaaS product development',
        'Business management systems',
        'Admin panels and dashboards',
        'REST API development and integrations',
        'Database architecture and optimization',
        'Third-party service integrations',
      ],
      image: '/images/services/service-software.jpg',
    },
    {
      id: 'ai-engineering',
      num: '03',
      title: 'AI-Powered Engineering',
      category: 'Human expertise + AI efficiency',
      highlight: 'Human expertise. AI-powered efficiency.',
      description:
        'We combine experienced engineering with modern AI tools to improve development workflows, solve complex problems and deliver software more efficiently.',
      deliverables: [
        'AI-assisted development workflows',
        'AI-powered features and integrations',
        'Intelligent automation solutions',
        'AI API integration',
        'Development productivity improvements',
        'Human-reviewed AI-generated code',
      ],
      image: '/images/services/service-ai.jpg',
    },
    {
      id: 'mobile-apps',
      num: '04',
      title: 'Mobile App Development',
      category: 'One experience across platforms',
      highlight: 'One experience. Multiple platforms.',
      description:
        'We create smooth, scalable and user-friendly mobile applications that connect your business with customers wherever they are.',
      deliverables: [
        'Android and iOS applications',
        'React Native development',
        'Cross-platform applications',
        'E-commerce mobile apps',
        'API and backend integration',
        'Push notifications and real-time features',
        'App performance optimization',
      ],
      image: '/images/services/service-mobile.jpg',
    },
    {
      id: 'qa-testing',
      num: '05',
      title: 'Quality Assurance & Testing',
      category: 'Find issues early',
      highlight: 'Find issues early. Release with confidence.',
      description:
        'We make quality an essential part of development, identifying issues early and validating every important workflow before software reaches users.',
      deliverables: [
        'Manual software testing',
        'Functional and regression testing',
        'API testing',
        'Cross-browser and device testing',
        'Bug tracking and reporting',
        'Release validation',
        'Quality checks before production deployment',
      ],
      image: '/images/services/service-qa.jpg',
    },
    {
      id: 'cloud-devops',
      num: '06',
      title: 'Cloud Infrastructure & DevOps',
      category: 'Reliable cloud environments',
      highlight: 'Reliable infrastructure. Smoother deployments.',
      description:
        'We help applications run reliably with secure infrastructure, streamlined deployments and performance-focused cloud environments.',
      deliverables: [
        'Cloud infrastructure setup',
        'Server configuration and management',
        'CI/CD pipeline setup',
        'Production deployment',
        'Database and storage configuration',
        'Application monitoring',
        'Backup and recovery planning',
      ],
      image: '/images/services/service-cloud.jpg',
    },
    {
      id: 'maintenance',
      num: '07',
      title: 'Maintenance & Continuous Support',
      category: 'Long-term partnership',
      highlight: 'Long-term partnership. Ongoing value.',
      description:
        'Our work doesn\'t end at launch. We help keep your applications updated, secure and ready for changing business needs.',
      deliverables: [
        'Bug fixes and troubleshooting',
        'Performance optimization',
        'Security updates and patching',
        'Code refactoring and debt reduction',
        'Feature enhancements',
        'Dependency and framework upgrades',
        'Long-term technical support',
      ],
      image: '/images/services/service-maintenance.jpg',
    },
  ];

  readonly principles: PrincipleItem[] = [
    {
      id: 'p1',
      num: '01',
      title: 'Security First',
      description: 'Secure development practices at every stage.',
      icon: LucideShieldCheck,
    },
    {
      id: 'p2',
      num: '02',
      title: 'AI + Human Expertise',
      description: 'Smarter workflows backed by developer experience.',
      icon: LucideCpu,
    },
    {
      id: 'p3',
      num: '03',
      title: 'Clean Architecture',
      description: 'Maintainable and scalable codebases.',
      icon: LucideCode2,
    },
    {
      id: 'p4',
      num: '04',
      title: 'Quality Driven',
      description: 'Testing and reviews before every release.',
      icon: LucideCircleCheck,
    },
    {
      id: 'p5',
      num: '05',
      title: 'Performance Focused',
      description: 'Applications optimized for speed and reliability.',
      icon: LucideZap,
    },
    {
      id: 'p6',
      num: '06',
      title: 'Reliable Delivery',
      description: 'Structured development and deployment processes.',
      icon: LucideRocket,
    },
  ];

  scrollPrev(): void {
    const el = this.cardsTrackRef?.nativeElement;
    if (el) {
      el.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  scrollNext(): void {
    const el = this.cardsTrackRef?.nativeElement;
    if (el) {
      el.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }

  onTrackScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) return;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) {
      this.scrollProgress.set(0);
    } else {
      const progress = Math.min(100, Math.max(0, (target.scrollLeft / maxScroll) * 100));
      this.scrollProgress.set(progress);
    }
  }

  openDetail(service: ServiceItem): void {
    this.selectedService.set(service);
  }

  closeDetail(): void {
    this.selectedService.set(null);
  }

  onServiceClick(service: ServiceItem, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/contact'], {
      queryParams: { service: service.title },
      fragment: 'contact-form',
    });
  }

  scrollToTrack(event?: Event): void {
    if (event) event.preventDefault();
    const track = this.cardsTrackRef?.nativeElement;
    if (track) {
      track.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onDiscussProject(event?: MouseEvent, serviceTitle?: string): void {
    event?.preventDefault();
    this.ctaClick.emit();
    this.closeDetail();
    const queryParams = serviceTitle || this.selectedService()?.title
      ? { service: serviceTitle || this.selectedService()?.title }
      : undefined;
    this.router.navigate(['/contact'], {
      queryParams,
      fragment: 'contact-form',
    });
  }
}
