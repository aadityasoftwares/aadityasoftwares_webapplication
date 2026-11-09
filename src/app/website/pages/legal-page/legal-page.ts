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
  LucideBuilding,
  LucideShield,
  LucideShieldCheck,
  LucideFileText,
  LucideScale,
  LucideCheckCircle2,
  LucideCheck,
  LucideClock,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideArrowRight,
  LucideExternalLink,
  LucideCookie,
  LucideLock,
  LucideAlertCircle,
  LucideKey,
  LucideLayers,
  LucideCpu,
  LucideSearch,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../shared/components/icon/icon';
import { Button } from '../../../shared/components/button/button';
import { ScrollReveal } from '../../scroll-reveal';
import { WebsiteHeader } from '../../website-header/website-header';
import { WebsiteFooter } from '../../website-footer/website-footer';

export interface LegalTocSection {
  id: string;
  number: string;
  title: string;
  icon: AppIconDefinition;
}

export interface LegalHighlight {
  num: string;
  badge: string;
  badgeClass: 'blue' | 'cyan' | 'green';
  title: string;
  description: string;
  icon: AppIconDefinition;
  footerNote: string;
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [
    CommonModule,
    AppIcon,
    Button,
    ScrollReveal,
    WebsiteHeader,
    WebsiteFooter,
  ],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPage implements OnInit {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);
  private readonly document = inject(DOCUMENT);

  readonly lastUpdated = 'November 9, 2026';
  readonly version = 'v2.1';
  readonly activeSection = signal<string>('entity-information');

  readonly LucideBuilding = LucideBuilding;
  readonly LucideShield = LucideShield;
  readonly LucideShieldCheck = LucideShieldCheck;
  readonly LucideFileText = LucideFileText;
  readonly LucideScale = LucideScale;
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideCheck = LucideCheck;
  readonly LucideClock = LucideClock;
  readonly LucideMail = LucideMail;
  readonly LucidePhone = LucidePhone;
  readonly LucideMapPin = LucideMapPin;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideExternalLink = LucideExternalLink;
  readonly LucideCookie = LucideCookie;
  readonly LucideLock = LucideLock;
  readonly LucideAlertCircle = LucideAlertCircle;
  readonly LucideKey = LucideKey;
  readonly LucideLayers = LucideLayers;
  readonly LucideCpu = LucideCpu;
  readonly LucideSearch = LucideSearch;

  readonly highlights: LegalHighlight[] = [
    {
      num: '01',
      badge: 'Corporate Disclosure',
      badgeClass: 'blue',
      title: 'Statutory Transparency',
      description:
        'Official business entity disclosures, engineering center registration in Vadodara, and verified legal representation contacts.',
      icon: LucideBuilding,
      footerNote: 'Gujarat Commercial Registry',
    },
    {
      num: '02',
      badge: 'Security Program',
      badgeClass: 'cyan',
      title: 'Coordinated Vulnerability Disclosure',
      description:
        'Formal safe harbor policy and bug reporting guidelines for ethical security researchers with a guaranteed 48-hour triage response.',
      icon: LucideShieldCheck,
      footerNote: 'Responsible White-Hat Channel',
    },
    {
      num: '03',
      badge: 'Ethical Conduct',
      badgeClass: 'green',
      title: 'Anti-Corruption & Global Ethics',
      description:
        'Zero tolerance for bribery, strict non-discrimination, fair labor standards, and full regulatory compliance with Indian and international laws.',
      icon: LucideScale,
      footerNote: 'Uncompromising Governance',
    },
  ];

  readonly tocSections: LegalTocSection[] = [
    { id: 'entity-information', number: '01', title: 'Entity Details & Contacts', icon: LucideBuilding },
    { id: 'ip-trademarks', number: '02', title: 'Trademarks & IP Notice', icon: LucideShieldCheck },
    { id: 'cookie-policy', number: '03', title: 'Cookie & Tracking Disclosures', icon: LucideCookie },
    { id: 'vdp-security', number: '04', title: 'Vulnerability Disclosure Policy', icon: LucideLock },
    { id: 'ethics-compliance', number: '05', title: 'Ethics & Anti-Corruption', icon: LucideScale },
    { id: 'disclaimers', number: '06', title: 'Disclaimers & Liability Limits', icon: LucideFileText },
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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onContact(): void {
    this.router.navigate(['/contact']);
  }
}

