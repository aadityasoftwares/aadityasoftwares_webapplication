import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideArrowUpRight, LucideChevronRight } from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description?: string;
  image?: string;
  linkText: string;
  href: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, AppIcon, ScrollReveal],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  readonly LucideArrowUpRight = LucideArrowUpRight;
  readonly LucideChevronRight = LucideChevronRight;

  readonly activeServiceId = signal<string>('02');

  readonly services: ServiceItem[] = [
    {
      id: '01',
      num: '01/',
      title: 'Software Design',
      description:
        'Human-centered UI/UX design, interactive prototyping, and modern design systems crafted for high conversion and intuitive user engagement.',
      image: '/images/service-mockup.jpg',
      linkText: 'More Information',
      href: '#contact',
    },
    {
      id: '02',
      num: '02/',
      title: 'Software Development',
      description:
        'We provide you the best and most innovative software and mobile app development services. Join us to build well-designed and fast-growing digital products.',
      image: '/images/service-mockup.jpg',
      linkText: 'More Information',
      href: '#contact',
    },
    {
      id: '03',
      num: '03/',
      title: 'Digital Marketing',
      description:
        'Data-driven digital marketing, technical SEO, content strategy, and performance growth channels designed to scale your software brand.',
      image: '/images/service-mockup.jpg',
      linkText: 'More Information',
      href: '#contact',
    },
    {
      id: '04',
      num: '04/',
      title: 'Cloud & DevOps',
      description:
        'Resilient cloud architecture, automated CI/CD pipelines, containerization, and 24/7 high-availability infrastructure deployments.',
      image: '/images/service-mockup.jpg',
      linkText: 'More Information',
      href: '#contact',
    },
  ];

  @Output() selectService = new EventEmitter<ServiceItem>();

  toggleService(service: ServiceItem): void {
    this.activeServiceId.set(service.id);
    this.selectService.emit(service);
  }
}

