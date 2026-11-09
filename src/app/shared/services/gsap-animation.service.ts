import { Injectable, NgZone, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationService {
  private readonly ngZone = inject(NgZone);
  private isScrollTriggerRegistered = false;

  constructor() {
    this.registerPlugins();
  }

  private registerPlugins(): void {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function' && !this.isScrollTriggerRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      this.isScrollTriggerRegistered = true;
    }
  }

  /**
   * Staggered entrance animation for Hero section elements on page load
   */
  animateHero(heroElement: HTMLElement): gsap.core.Timeline | null {
    if (typeof window === 'undefined') return null;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReducedMotion) return null;

    return this.ngZone.runOutsideAngular(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const badge = heroElement.querySelector('.hero-badge');
      const titleLines = heroElement.querySelectorAll('.hero-title-line');
      const description = heroElement.querySelector('.hero-description');
      const actions = heroElement.querySelector('.hero-actions');
      const trustItems = heroElement.querySelectorAll('.hero-trust-strip .trust-item');
      const orbitalSystem = heroElement.querySelector('.orbital-system');
      const clientsBar = heroElement.querySelector('.hero-clients-bar');

      if (badge) {
        tl.fromTo(badge, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
      }

      if (titleLines.length) {
        tl.fromTo(
          titleLines,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
          0.2,
        );
      }

      if (description) {
        tl.fromTo(description, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45);
      }

      if (actions) {
        tl.fromTo(actions, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
      }

      if (trustItems.length) {
        tl.fromTo(
          trustItems,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.75,
        );
      }

      if (orbitalSystem) {
        tl.fromTo(
          orbitalSystem,
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.2)' },
          0.3,
        );
      }

      if (clientsBar) {
        tl.fromTo(
          clientsBar,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.9,
        );
      }

      // Gentle ambient floating glow
      const orbs = heroElement.querySelectorAll('.glow-orb');
      if (orbs.length) {
        gsap.to(orbs, {
          y: '+=14',
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5,
        });
      }

      return tl;
    });
  }

  /**
   * Staggered entrance animation for inner page heroes (About, Services, Projects, Contact)
   */
  animatePageHero(heroElement: HTMLElement): gsap.core.Timeline | null {
    if (typeof window === 'undefined') return null;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReducedMotion) return null;

    return this.ngZone.runOutsideAngular(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const eyebrow = heroElement.querySelector('.section-sub-eyebrow');
      const title = heroElement.querySelector('.page-hero-title');
      const subtitle = heroElement.querySelector('.page-hero-subtitle');
      const actions = heroElement.querySelector('.page-hero-actions');
      const cards = heroElement.querySelectorAll(
        '.metric-glass-card, .discipline-card, .projects-strategy-card, .projects-featured-deliverable, .guarantee-card, .about-metrics-deck > div, .services-disciplines-grid > div, .contact-guarantees-grid > div',
      );

      if (eyebrow) {
        tl.fromTo(eyebrow, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.55 }, 0.08);
      }

      if (title) {
        tl.fromTo(title, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.75 }, 0.18);
      }

      if (subtitle) {
        tl.fromTo(subtitle, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, 0.35);
      }

      if (actions) {
        tl.fromTo(actions, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.5);
      }

      if (cards.length) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 32, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.09, ease: 'power2.out' },
          0.6,
        );
      }

      // Gentle ambient floating glow for orbs
      const orbs = heroElement.querySelectorAll('.glow-orb');
      if (orbs.length) {
        gsap.to(orbs, {
          y: '+=14',
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.5,
        });
      }

      return tl;
    });
  }

  /**
   * ScrollTrigger-powered reveal for sections:
   * 1. Header texts (eyebrow, title, description) with staggered upward slide-in
   * 2. Content boxes / cards (grid items, metric cards, pillars) with scale & stagger
   */
  animateSection(sectionElement: HTMLElement): ScrollTrigger | null {
    if (typeof window === 'undefined') return null;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;
    if (prefersReducedMotion) return null;

    return this.ngZone.runOutsideAngular(() => {
      // Find header texts across Home and dedicated inner pages
      const headerTexts = sectionElement.querySelectorAll(
        '.process-eyebrow, .services-eyebrow, .portfolio-eyebrow, .section-eyebrow, .why-eyebrow, .tech-eyebrow, .industries-eyebrow, .testimonials-eyebrow, .faq-eyebrow, .about-eyebrow, .section-sub-eyebrow, h2, .process-lead, .services-lead-text, .portfolio-hero-desc, .why-lead, .tech-lead, .about-subtitle, .about-lead, .about-lead-paragraph, .faq-lead, .testimonials-lead, .section-lead, .split-title, .split-desc, .showcase-title, .showcase-lead, .reference-title, .reference-sub, .matrix-title, .matrix-subtitle, .contact-main-heading, .contact-lead-desc, .cta-banner-title, .cta-banner-subtitle, .cta-title, .cta-sub',
      );

      // Find cards / boxes across Home and dedicated inner pages
      const boxes = sectionElement.querySelectorAll(
        '.service-card, .deliverable-card, .tech-card, .project-card, .testimonial-card, .industry-card, .faq-item, .why-pillar-card, .pillar-card, .why-comparison-card, .trust-card, .about-metric-card, .metric-card, .about-middle-grid > div, .highlight-card, .detail-deliverables-panel, .cta-banner-card, .floating-newsletter-card, .balance-card, .commitment-card, .formula-step-card, .routine-card, .discipline-card, .metric-glass-card, .projects-strategy-card, .projects-featured-deliverable, .guarantee-card, .service-strip-card, .matrix-target-card, .gallery-project-card, .dp-card, .model-card, .feature-split-card, .arch-code-preview-card, .showcase-card, .showcase-row, .strategy-step-card, .testimonial-card-frame, .projects-cta-banner, .contact-info-col, .form-card-container, .contact-channels-strip',
      );

      // Orbital stage or centerpiece graphic
      const orbitalStage = sectionElement.querySelector('.process-orbital-stage, .orbital-system');

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top 82%',
          once: true,
        },
      });

      if (headerTexts.length) {
        tl.fromTo(
          headerTexts,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
        );
      }

      if (orbitalStage) {
        tl.fromTo(
          orbitalStage,
          { opacity: 0, scale: 0.94, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'back.out(1.15)' },
          '-=0.4',
        );
      }

      if (boxes.length) {
        tl.fromTo(
          boxes,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          '-=0.35',
        );
      }

      return tl.scrollTrigger ?? null;
    });
  }

  /**
   * Refreshes ScrollTrigger calculations (useful after dynamic content expands)
   */
  refresh(): void {
    if (typeof window !== 'undefined' && this.isScrollTriggerRegistered) {
      ScrollTrigger.refresh();
    }
  }
}
