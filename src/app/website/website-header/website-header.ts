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
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  LucideMenu,
  LucideX,
  LucidePhone,
  LucideHouse,
  LucideUsers,
  LucideLayers,
  LucideBriefcase,
  LucideMail,
  LucideMapPin,
  LucideArrowRight,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { Button } from '../../shared/components/button/button';

export interface HeaderNavItem {
  label: string;
  href: string;
  route: string;
  icon?: AppIconDefinition;
  active?: boolean;
}

export interface HeaderSocialLink {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
  hoverColor: string;
  iconPath: string;
}

@Component({
  selector: 'app-website-header',
  standalone: true,
  imports: [AppIcon, RouterLink, Button],
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
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideArrowRight = LucideArrowRight;

  readonly phoneUrl = 'tel:+918849863872';
  readonly emailUrl = 'mailto:contact@aadityasoftwares.in';
  readonly addressText = 'Vadodara, Gujarat, India';

  readonly socialLinks: HeaderSocialLink[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/aadityasoftwares',
      ariaLabel: 'Follow Aaditya Softwares on LinkedIn',
      hoverColor: '#0a66c2',
      iconPath:
        'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    },
    {
      id: 'github',
      name: 'GitHub',
      href: 'https://github.com/aadityasoftwares',
      ariaLabel: 'Follow Aaditya Softwares on GitHub',
      hoverColor: '#0f172a',
      iconPath:
        'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      href: 'https://x.com/aadityasoftware',
      ariaLabel: 'Follow Aaditya Softwares on X',
      hoverColor: '#38bdf8',
      iconPath:
        'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://instagram.com/aadityasoftwares',
      ariaLabel: 'Follow Aaditya Softwares on Instagram',
      hoverColor: '#e1306c',
      iconPath:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      href: 'https://youtube.com/@aadityasoftwares',
      ariaLabel: 'Follow Aaditya Softwares on YouTube',
      hoverColor: '#ff0000',
      iconPath:
        'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      id: 'discord',
      name: 'Discord',
      href: 'https://discord.gg/aadityasoftwares',
      ariaLabel: 'Follow Aaditya Softwares on Discord',
      hoverColor: '#5865f2',
      iconPath:
        'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
    },
  ];

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
    this.updateActivePathFromUrl(this.router.url || '/');
    const initialScrollY = this.document.defaultView?.scrollY ?? 0;
    this.isScrolled.set(initialScrollY > 20);

    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mobileMenuOpen.set(false);
        const url = event.urlAfterRedirects || event.url;
        this.updateActivePathFromUrl(url);
      }
    });
  }

  private updateActivePathFromUrl(url: string): void {
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

  onLogoClick(event?: MouseEvent): void {
    event?.preventDefault();
    this.activePath.set('Home');
    this.closeMobileMenu();

    const currentUrl = (this.router.url || '/').split('?')[0].split('#')[0];
    if (currentUrl === '' || currentUrl === '/') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    this.router
      .navigate(['/'])
      .catch(() => {})
      .then(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  onNavClick(item: HeaderNavItem, event?: MouseEvent): void {
    event?.preventDefault();
    this.activePath.set(item.label);
    this.closeMobileMenu();
    this.navSelect.emit(item);

    const targetRoute = item.route || item.href;
    const currentUrl = (this.router.url || '/').split('?')[0].split('#')[0];

    // If user is already on the selected route, smoothly scroll to top
    if (
      currentUrl === targetRoute ||
      (targetRoute === '/' && (currentUrl === '' || currentUrl === '/'))
    ) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Navigate to the target page and scroll to top
    this.router
      .navigate([targetRoute])
      .catch(() => {})
      .then(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  onBookCall(event?: MouseEvent): void {
    this.onSignup(event);
  }

  onSignup(event?: MouseEvent): void {
    event?.preventDefault();
    this.signupClick.emit();
    this.closeMobileMenu();

    const currentUrl = (this.router.url || '/').split('?')[0].split('#')[0];
    if (currentUrl === '/contact') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

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
