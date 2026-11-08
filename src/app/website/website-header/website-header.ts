import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  LucideMenu,
  LucideX,
  LucideSparkles,
  LucideArrowRight,
  LucideHouse,
  LucideUsers,
  LucideLayers,
  LucideBriefcase,
  LucideMail,
  LucideUserPlus,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';

export interface HeaderNavItem {
  label: string;
  href: string;
  route?: string;
  icon: AppIconDefinition;
  active?: boolean;
}

@Component({
  selector: 'app-website-header',
  standalone: true,
  imports: [AppIcon, Button],
  templateUrl: './website-header.html',
  styleUrl: './website-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.header-scrolled]': 'isScrolled()',
    '[class.menu-open]': 'mobileMenuOpen()',
  },
})
export class WebsiteHeader {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  readonly isScrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  readonly activePath = signal('Home');

  readonly LucideMenu = LucideMenu;
  readonly LucideX = LucideX;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideUserPlus = LucideUserPlus;

  readonly navItems: HeaderNavItem[] = [
    { label: 'Home', href: '/', route: '/', icon: LucideHouse, active: true },
    { label: 'About', href: '/about', route: '/about', icon: LucideUsers },
    { label: 'Service', href: '/services', route: '/services', icon: LucideLayers },
    { label: 'Project', href: '/projects', route: '/projects', icon: LucideBriefcase },
    { label: 'Contact', href: '/contact', route: '/contact', icon: LucideMail },
  ];

  @Output() signupClick = new EventEmitter<void>();
  @Output() navSelect = new EventEmitter<HeaderNavItem>();

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen.set(false);
        const url = event.urlAfterRedirects || event.url;
        if (url.startsWith('/about')) {
          this.activePath.set('About');
        } else if (url.startsWith('/services')) {
          this.activePath.set('Service');
        } else if (url.startsWith('/projects')) {
          this.activePath.set('Project');
        } else if (url.startsWith('/contact')) {
          this.activePath.set('Contact');
        } else {
          this.activePath.set('Home');
        }
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = this.document.defaultView?.scrollY ?? 0;
    this.isScrolled.set(scrollY > 20);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  onNavClick(item: HeaderNavItem, event: MouseEvent): void {
    event.preventDefault();
    this.activePath.set(item.label);
    this.closeMobileMenu();
    this.navSelect.emit(item);

    if (item.route) {
      this.router
        .navigate([item.route])
        .catch(() => {})
        .then(() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
    } else if (item.href.startsWith('#')) {
      const targetId = item.href.slice(1);
      const element = this.document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onSignup(event?: MouseEvent): void {
    event?.preventDefault();
    this.signupClick.emit();
    this.router
      .navigate(['/contact'])
      .catch(() => {})
      .then(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}
