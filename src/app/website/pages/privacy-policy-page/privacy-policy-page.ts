import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { GsapAnimationService } from '../../../shared/services/gsap-animation.service';
import {
  LucideShield,
  LucideShieldCheck,
  LucideLock,
  LucideFileText,
  LucideCheckCircle2,
  LucideClock,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideArrowRight,
  LucideExternalLink,
  LucideDatabase,
  LucideServer,
  LucideEye,
  LucideKey,
  LucideAlertCircle,
  LucideLayers,
  LucideCheck,
  LucideChevronRight,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface TocSection {
  id: string;
  number: string;
  title: string;
  icon: AppIconDefinition;
}

export interface PrivacyHighlight {
  num: string;
  badge: string;
  badgeClass: 'blue' | 'cyan' | 'green';
  title: string;
  description: string;
  icon: AppIconDefinition;
  footerNote: string;
}

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './privacy-policy-page.html',
  styleUrl: './privacy-policy-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyPage implements OnInit {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);
  private readonly document = inject(DOCUMENT);

  readonly lastUpdated = 'November 9, 2026';
  readonly version = 'v2.4';
  readonly activeSection = signal<string>('scope-application');

  readonly LucideShield = LucideShield;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideLock = LucideLock;
  readonly LucideFileText = LucideFileText;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideClock = LucideClock;
  readonly LucideMail = LucideMail;
  readonly LucidePhone = LucidePhone;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideDatabase = LucideDatabase;
  readonly LucideServer = LucideServer;
  readonly LucideEye = LucideEye;
  readonly LucideKey = LucideKey;
  readonly LucideAlertCircle = LucideAlertCircle;
  readonly LucideLayers = LucideLayers;
  readonly LucideCheck = LucideCheck;
  readonly LucideChevronRight = LucideChevronRight;

  readonly highlights: PrivacyHighlight[] = [
    {
      num: '01',
      badge: 'Zero Monetization',
      badgeClass: 'blue',
      title: 'We Never Sell Your Data',
      description:
        'Your contact details, business communications, and engineering specifications are never rented, sold, or shared with third-party advertising brokers.',
      icon: LucideShieldCheck,
      footerNote: 'Strict Commercial Integrity',
    },
    {
      num: '02',
      badge: 'Enterprise Grade',
      badgeClass: 'cyan',
      title: 'AES-256 & TLS 1.3 Encryption',
      description:
        'All client project assets, credentials, and telemetry are encrypted in flight and at rest, housed within isolated tenant environments.',
      icon: LucideLock,
      footerNote: 'Zero-Leakage Architecture',
    },
    {
      num: '03',
      badge: 'Global Compliance',
      badgeClass: 'green',
      title: 'DPDP Act & GDPR Compliant',
      description:
        'Full compliance with the Digital Personal Data Protection Act 2023 (India), the General Data Protection Regulation (EU), and ISO security baselines.',
      icon: LucideCheckCircle2,
      footerNote: 'Statutory Data Rights Guaranteed',
    },
  ];

  readonly tocSections: TocSection[] = [
    { id: 'scope-application', number: '01', title: 'Scope & Application', icon: LucideFileText },
    { id: 'info-collection', number: '02', title: 'Information We Collect', icon: LucideEye },
    { id: 'processing-purposes', number: '03', title: 'Processing & Legal Basis', icon: LucideLayers },
    { id: 'ip-confidentiality', number: '04', title: 'Client IP & NDA Protection', icon: LucideShield },
    { id: 'subprocessors', number: '05', title: 'Subprocessors & Infrastructure', icon: LucideServer },
    { id: 'cross-border', number: '06', title: 'International Data Transfers', icon: LucideDatabase },
    { id: 'storage-security', number: '07', title: 'Storage & Security Controls', icon: LucideLock },
    { id: 'retention-deletion', number: '08', title: 'Retention & Right to Erasure', icon: LucideClock },
    { id: 'privacy-rights', number: '09', title: 'Your Statutory Rights', icon: LucideKey },
    { id: 'cookies-tracking', number: '10', title: 'Cookies & Tracking Tech', icon: LucideFileText },
    { id: 'incident-response', number: '11', title: 'Incident Response SLA', icon: LucideAlertCircle },
    { id: 'contact-dpo', number: '12', title: 'Contact Privacy Office', icon: LucideMail },
  ];

  constructor() {
    afterNextRender(() => {
      const tl = this.gsapService.animatePageHero(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => {
        tl?.kill();
      });
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.activeSection.set(sectionId);
    const element = this.document.getElementById(sectionId);
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onContact(): void {
    this.router.navigate(['/contact']);
  }
}

