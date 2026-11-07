import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TooltipTone =
  | 'dark'
  | 'light'
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type TooltipSize = 'sm' | 'md' | 'lg';
export type TooltipTrigger = 'hover-focus' | 'hover' | 'focus' | 'click' | 'manual';

interface TooltipCoordinates {
  left: number;
  top: number;
}

let nextTooltipId = 0;

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  exportAs: 'appTooltip',
})
export class Tooltip implements AfterViewInit, OnChanges, OnDestroy {
  @Input({
    alias: 'appTooltip',
    required: true,
    transform: (value: unknown) => String(value ?? ''),
  })
  text = '';

  @Input() tooltipPosition: TooltipPosition = 'top';
  @Input() tooltipTone: TooltipTone = 'dark';
  @Input() tooltipSize: TooltipSize = 'md';
  @Input() tooltipTrigger: TooltipTrigger = 'hover';

  @Input() tooltipDelay = 180;
  @Input() tooltipHideDelay = 80;
  @Input() tooltipOffset = 8;
  @Input() tooltipMaxWidth = 280;
  @Input() tooltipShowArrow = true;
  @Input() tooltipDisabled = false;
  @Input() tooltipOpen = false;

  @Output() tooltipOpenChange = new EventEmitter<boolean>();

  private readonly tooltipId = `app-tooltip-${++nextTooltipId}`;
  private readonly isBrowser: boolean;

  private anchorElement?: HTMLElement;
  private tooltipElement?: HTMLDivElement;
  private arrowElement?: HTMLSpanElement;

  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private visible = false;
  private hovered = false;
  private focused = false;
  private initialized = false;

  private readonly removeAnchorListeners: Array<() => void> = [];

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.anchorElement = this.elementRef.nativeElement;
    this.bindAnchorEvents();
    this.initialized = true;

    if (this.tooltipTrigger === 'manual' && this.tooltipOpen) {
      this.show();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) {
      return;
    }

    if (changes['text'] && this.tooltipElement) {
      const textNode = this.tooltipElement.querySelector('.app-tooltip-text');
      if (textNode) {
        textNode.textContent = this.text.trim();
      }
    }

    if (changes['tooltipOpen'] && this.tooltipTrigger === 'manual') {
      if (this.tooltipOpen) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.removeAnchorListeners.forEach((remove) => remove());
    this.destroyTooltipElement();
  }

  show(): void {
    if (this.tooltipDisabled || !this.text.trim() || !this.anchorElement) {
      return;
    }

    this.clearTimers();
    this.showTimer = setTimeout(() => {
      this.createTooltipElement();
      this.positionTooltip();
      this.visible = true;
      this.tooltipOpenChange.emit(true);
    }, this.tooltipDelay);
  }

  hide(): void {
    this.clearTimers();
    this.hideTimer = setTimeout(() => {
      this.destroyTooltipElement();
      this.visible = false;
      this.tooltipOpenChange.emit(false);
    }, this.tooltipHideDelay);
  }

  private clearTimers(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  private bindAnchorEvents(): void {
    if (!this.anchorElement) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const onEnter = () => {
        this.hovered = true;
        this.show();
      };
      const onLeave = () => {
        this.hovered = false;
        if (!this.focused) {
          this.hide();
        }
      };
      const onFocus = () => {
        this.focused = true;
        this.show();
      };
      const onBlur = () => {
        this.focused = false;
        if (!this.hovered) {
          this.hide();
        }
      };

      this.removeAnchorListeners.push(
        this.renderer.listen(this.anchorElement, 'mouseenter', onEnter),
        this.renderer.listen(this.anchorElement, 'mouseleave', onLeave),
        this.renderer.listen(this.anchorElement, 'focusin', onFocus),
        this.renderer.listen(this.anchorElement, 'focusout', onBlur),
      );
    });
  }

  private createTooltipElement(): void {
    if (this.tooltipElement) {
      return;
    }

    const panel = this.renderer.createElement('div') as HTMLDivElement;
    panel.id = this.tooltipId;
    panel.className = `app-tooltip-panel app-tooltip-${this.tooltipTone} app-tooltip-${this.tooltipSize}`;
    panel.setAttribute('role', 'tooltip');
    panel.style.maxWidth = `${this.tooltipMaxWidth}px`;

    const textSpan = this.renderer.createElement('span');
    textSpan.className = 'app-tooltip-text';
    textSpan.textContent = this.text.trim();
    this.renderer.appendChild(panel, textSpan);

    if (this.tooltipShowArrow) {
      this.arrowElement = this.renderer.createElement('span');
      this.arrowElement!.className = 'app-tooltip-arrow';
      this.renderer.appendChild(panel, this.arrowElement!);
    }

    this.renderer.appendChild(this.document.body, panel);
    this.tooltipElement = panel;

    // Trigger animation
    requestAnimationFrame(() => {
      panel.classList.add('app-tooltip-ready');
    });
  }

  private destroyTooltipElement(): void {
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.renderer.removeChild(this.tooltipElement.parentNode, this.tooltipElement);
      this.tooltipElement = undefined;
      this.arrowElement = undefined;
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipElement || !this.anchorElement) {
      return;
    }

    const anchorRect = this.anchorElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const offset = this.tooltipOffset;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
      default:
        top = anchorRect.top - tooltipRect.height - offset;
        left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = anchorRect.bottom + offset;
        left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
        left = anchorRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
        left = anchorRect.right + offset;
        break;
    }

    // Viewport bounds
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    this.tooltipElement.style.top = `${top + scrollY}px`;
    this.tooltipElement.style.left = `${Math.max(8, left + scrollX)}px`;
  }
}

