import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { GsapAnimationService } from '../shared/services/gsap-animation.service';

/**
 * High-performance GSAP ScrollTrigger directive.
 * Automatically coordinates staggered reveals for section text and card boxes.
 * Degrades gracefully when JavaScript animations or reduced motion is preferred.
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollReveal {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  private readonly gsapService = inject(GsapAnimationService);

  constructor() {
    afterNextRender(() => {
      const viewport = this.element.ownerDocument?.defaultView;
      if (!viewport) {
        return;
      }

      const motion = viewport.matchMedia('(prefers-reduced-motion: reduce)');
      if (motion.matches) {
        return;
      }

      const trigger = this.gsapService.animateSection(this.element);

      this.destroyRef.onDestroy(() => {
        if (trigger) {
          trigger.kill();
        }
      });
    });
  }
}
