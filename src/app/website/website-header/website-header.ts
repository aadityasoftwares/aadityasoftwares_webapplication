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
import { LucideMenu, LucideX, LucideSparkles, LucideArrowRight } from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';

export interface HeaderNavItem {
  label: string;
  href: string;
  active?: boolean;
}

@Component({
  selector: 'app-website-header',
  standalone: true,
  imports: [AppIcon],
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

  readonly navItems: HeaderNavItem[] = [
    { label: 'Home', href: '#home', active: true },
    { label: 'About', href: '#about' },
    { label: 'Service', href: '#services' },
    { label: 'Project', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  @Output() signupClick = new EventEmitter<void>();
  @Output() navSelect = new EventEmitter<HeaderNavItem>();

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen.set(false);
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

    if (item.href.startsWith('#')) {
      const targetId = item.href.slice(1);
      const element = this.document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onSignup(event: MouseEvent): void {
    event.preventDefault();
    this.signupClick.emit();
  }
}
