import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideGlobe,
  LucideArrowUp,
  LucideArrowRight,
  LucideExternalLink,
  LucideCheck,
  LucideShield,
  LucideHeart,
  LucideSend,
  LucideSparkles,
} from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  ariaLabel: string;
  hoverColor: string;
  iconPath: string;
}

export interface FooterNavCol {
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
    badge?: string;
  }[];
}

@Component({
  selector: 'app-website-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, AppIcon],
  templateUrl: './website-footer.html',
  styleUrl: './website-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteFooter {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router, { optional: true });

  readonly currentYear = new Date().getFullYear();
  readonly newsletterEmail = signal<string>('');
  readonly isSubscribed = signal<boolean>(false);

  readonly LucideMail = LucideMail;
  readonly LucidePhone = LucidePhone;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideGlobe = LucideGlobe;
  readonly LucideArrowUp = LucideArrowUp;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideCheck = LucideCheck;
  readonly LucideShield = LucideShield;
  readonly LucideHeart = LucideHeart;
  readonly LucideSend = LucideSend;
  readonly LucideSparkles = LucideSparkles;

  readonly socialLinks: SocialLink[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/aadityasoftwares/',
      ariaLabel: 'Connect with Aaditya Softwares on LinkedIn',
      hoverColor: '#0a66c2',
      iconPath:
        'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: 'https://www.facebook.com/aadityasoftwares',
      ariaLabel: 'Connect with Aaditya Softwares on Facebook',
      hoverColor: '#1877f2',
      iconPath:
        'M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.196h3.312z',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      href: 'https://x.com/aadityasoft_in',
      ariaLabel: 'Follow Aaditya Softwares on X',
      hoverColor: '#38bdf8',
      iconPath:
        'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: 'https://www.instagram.com/aaditya.softwares/',
      ariaLabel: 'Follow Aaditya Softwares on Instagram',
      hoverColor: '#e1306c',
      iconPath:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      href: 'https://youtube.com/@aadityasoftwares',
      ariaLabel: 'Watch Aaditya Softwares tech videos on YouTube',
      hoverColor: '#ff0000',
      iconPath:
        'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      id: 'discord',
      name: 'Discord',
      href: 'https://discord.gg/aadityasoftwares',
      ariaLabel: 'Join the Aaditya Softwares Discord community',
      hoverColor: '#5865f2',
      iconPath:
        'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
    },
  ];

  readonly footerCols: FooterNavCol[] = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Engineering Philosophy', href: '/about' },
        { label: 'Client Work & Case Studies', href: '/projects' },
        { label: 'Engineering Blog', href: '/blog' },
        { label: 'StickyJi Platform', href: 'https://stickyji.com/', isExternal: true, badge: 'In-House' },
        { label: 'Careers', href: '/contact', badge: 'Hiring' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Services & Capabilities',
      links: [
        { label: 'Custom Software Development', href: '/services' },
        { label: 'Product Strategy & UI/UX', href: '/services' },
        { label: 'AI-Powered Engineering', href: '/services' },
        { label: 'Mobile App Development (iOS & Android)', href: '/services' },
        { label: 'QA & Automated Testing', href: '/services' },
        { label: 'Cloud Infrastructure & DevOps', href: '/services' },
        { label: 'Maintenance & 24/7 Telemetry', href: '/services' },
      ],
    },
  ];

  onSubscribe(event: Event): void {
    event.preventDefault();
    const email = this.newsletterEmail().trim();
    if (email && email.includes('@')) {
      this.isSubscribed.set(true);
      this.newsletterEmail.set('');
    }
  }

  scrollToSection(href: string, event: Event): void {
    if (href.startsWith('/')) {
      event.preventDefault();
      this.router?.navigate([href]);
      return;
    }

    if (href.startsWith('#')) {
      event.preventDefault();
      const targetId = href.slice(1);
      const element = this.document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        const routeMap: Record<string, string> = {
          about: '/about',
          services: '/services',
          projects: '/projects',
          contact: '/contact',
          home: '/',
          'privacy-policy': '/privacy-policy',
          privacy: '/privacy-policy',
          'terms-of-use': '/terms-of-use',
          terms: '/terms-of-use',
          legal: '/legal',
          'legal-notice': '/legal',
          'site-map': '/site-map',
          sitemap: '/site-map',
        };
        const targetRoute = routeMap[targetId] || '/';
        this.router?.navigate([targetRoute]);
      }
    }
  }

  scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
