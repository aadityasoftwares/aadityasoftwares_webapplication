import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.html',
  styleUrl: './custom-cursor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursor implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);

  protected readonly cursorRef = viewChild<ElementRef<HTMLDivElement>>('cursorDot');

  private mouseX = -100;
  private mouseY = -100;
  private isHovering = false;
  private isMouseDown = false;
  private isVisible = false;
  private isText = false;
  private rafId: number | null = null;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseDownBound = this.onMouseDown.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);
  private onMouseLeaveBound = this.onMouseLeave.bind(this);
  private onMouseEnterBound = this.onMouseEnter.bind(this);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check if device supports fine mouse pointer
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) {
      return;
    }

    // Run outside Angular zone so mouse movements do not trigger change detection cycles
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMoveBound, { passive: true });
      window.addEventListener('mousedown', this.onMouseDownBound, { passive: true });
      window.addEventListener('mouseup', this.onMouseUpBound, { passive: true });
      this.document.addEventListener('mouseleave', this.onMouseLeaveBound, { passive: true });
      this.document.addEventListener('mouseenter', this.onMouseEnterBound, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.onMouseMoveBound);
      window.removeEventListener('mousedown', this.onMouseDownBound);
      window.removeEventListener('mouseup', this.onMouseUpBound);
      this.document.removeEventListener('mouseleave', this.onMouseLeaveBound);
      this.document.removeEventListener('mouseenter', this.onMouseEnterBound);

      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
      }
    }
  }

  private onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (!this.isVisible) {
      this.isVisible = true;
    }

    const target = e.target as HTMLElement | null;
    if (target) {
      const isInput = !!target.closest('input, textarea, [contenteditable="true"]');
      const isClickable =
        !isInput &&
        !!target.closest(
          'a, button, [role="button"], [role="link"], app-button, .clickable, .client-card, .filter-tab-pill, summary, .routine-tab-card, .deliverable-tab-item, .mosaic-tile, .service-card, .trust-metric-card, .faq-summary, .action-link'
        );

      this.isText = isInput;
      this.isHovering = isClickable;
    }

    this.scheduleRender();
  }

  private onMouseDown(): void {
    this.isMouseDown = true;
    this.scheduleRender();
  }

  private onMouseUp(): void {
    this.isMouseDown = false;
    this.scheduleRender();
  }

  private onMouseLeave(): void {
    this.isVisible = false;
    this.scheduleRender();
  }

  private onMouseEnter(): void {
    this.isVisible = true;
    this.scheduleRender();
  }

  private scheduleRender(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.render();
    });
  }

  private render(): void {
    const el = this.cursorRef()?.nativeElement;
    if (!el) return;

    el.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate(-50%, -50%)`;

    if (!this.isVisible) {
      el.classList.add('cursor-hidden');
    } else {
      el.classList.remove('cursor-hidden');
    }

    if (this.isHovering) {
      el.classList.add('cursor-hover');
    } else {
      el.classList.remove('cursor-hover');
    }

    if (this.isMouseDown) {
      el.classList.add('cursor-pressed');
    } else {
      el.classList.remove('cursor-pressed');
    }

    if (this.isText) {
      el.classList.add('cursor-text');
    } else {
      el.classList.remove('cursor-text');
    }
  }
}

