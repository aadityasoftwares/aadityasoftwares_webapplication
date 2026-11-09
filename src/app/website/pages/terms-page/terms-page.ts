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
  LucideFileText,
  LucideShieldCheck,
  LucideScale,
  LucideClock,
  LucideCheckCircle2,
  LucideCheck,
  LucideAlertCircle,
  LucideLock,
  LucideLayers,
  LucideCreditCard,
  LucideCode2,
  LucideBuilding,
  LucideHelpCircle,
  LucideArrowRight,
  LucideExternalLink,
  LucideMapPin,
  LucideMail,
  LucidePhone,
  LucideCpu,
  LucideZap,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface TermsTocSection {
  id: string;
  number: string;
  title: string;
  icon: AppIconDefinition;
}

export interface TermsHighlight {
  num: string;
  badge: string;
  badgeClass: 'blue' | 'cyan' | 'green';
  title: string;
  description: string;
  icon: AppIconDefinition;
  footerNote: string;
}

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './terms-page.html',
  styleUrl: './terms-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPage implements OnInit {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);
  private readonly document = inject(DOCUMENT);

  readonly lastUpdated = 'November 9, 2026';
  readonly version = 'v3.1';
  readonly activeSection = signal<string>('agreement-acceptance');

  readonly LucideFileText = LucideFileText;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideScale = LucideScale;
  readonly LucideClock = LucideClock;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideCheck = LucideCheck;
  readonly LucideAlertCircle = LucideAlertCircle;
  readonly LucideLock = LucideLock;
  readonly LucideLayers = LucideLayers;
  readonly LucideCreditCard = LucideCreditCard;
  readonly LucideCode2 = LucideCode2;
  readonly LucideBuilding = LucideBuilding;
  readonly LucideHelpCircle = LucideHelpCircle;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideMail = LucideMail;
  readonly LucidePhone = LucidePhone;
  readonly LucideCpu = LucideCpu;
  readonly LucideZap = LucideZap;

  readonly highlights: TermsHighlight[] = [
    {
      num: '01',
      badge: '100% IP Transfer',
      badgeClass: 'blue',
      title: 'Full Deliverable Ownership',
      description:
        'Upon complete invoice settlement, you retain full, unencumbered intellectual property, source repositories, and deployment scripts with no licensing traps.',
      icon: LucideShieldCheck,
      footerNote: 'Zero Vendor Lock-in',
    },
    {
      num: '02',
      badge: 'Milestone Agility',
      badgeClass: 'cyan',
      title: 'Transparent Statements of Work',
      description:
        'Every project is governed by clearly articulated Statements of Work (SOWs), defined sprint deliverables, and verifiable milestone sign-offs.',
      icon: LucideLayers,
      footerNote: 'Predetermined Sprint Scopes',
    },
    {
      num: '03',
      badge: 'Quality SLA',
      badgeClass: 'green',
      title: '60-Day Post-Launch Warranty',
      description:
        'All custom code deliverables come with a 60-day defect remediation warranty against documented technical specifications at zero additional cost.',
      icon: LucideCheckCircle2,
      footerNote: 'Guaranteed Code Resilience',
    },
  ];

  readonly tocSections: TermsTocSection[] = [
    { id: 'agreement-acceptance', number: '01', title: 'Acceptance of Terms', icon: LucideFileText },
    { id: 'engagement-models', number: '02', title: 'Engagement Models & SOWs', icon: LucideLayers },
    { id: 'ip-ownership', number: '03', title: 'Intellectual Property & IP Handover', icon: LucideShieldCheck },
    { id: 'invoicing-payment', number: '04', title: 'Invoicing & Milestone Payments', icon: LucideCreditCard },
    { id: 'client-responsibilities', number: '05', title: 'Client Obligations', icon: LucideBuilding },
    { id: 'warranties-sla', number: '06', title: 'Warranties & 60-Day SLA', icon: LucideCheckCircle2 },
    { id: 'confidentiality-non-solicitation', number: '07', title: 'Confidentiality & Non-Solicitation', icon: LucideLock },
    { id: 'limitation-liability', number: '08', title: 'Limitation of Liability', icon: LucideScale },
    { id: 'third-party-oss', number: '09', title: 'Third-Party APIs & OSS Licenses', icon: LucideCpu },
    { id: 'termination-handover', number: '10', title: 'Termination & Clean Handover', icon: LucideClock },
    { id: 'governing-law', number: '11', title: 'Governing Law & Jurisdiction', icon: LucideMapPin },
    { id: 'legal-contact', number: '12', title: 'Legal Inquiries & Notices', icon: LucideMail },
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

