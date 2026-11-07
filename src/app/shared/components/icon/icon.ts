import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { NgClass, NgComponentOutlet } from '@angular/common';
import type { LucideIcon as LucideIconComponent } from '@lucide/angular';
import { Tooltip } from '../tooltip/tooltip';

export type AppIconDefinition = LucideIconComponent;

export type AppIconSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export type AppIconTone =
  | 'inherit'
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'muted'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type AppIconSurface = 'none' | 'soft' | 'white' | 'dark' | 'primary' | 'accent';

export type AppIconShape = 'square' | 'rounded' | 'circle';

export type AppIconFlip = 'none' | 'horizontal' | 'vertical' | 'both';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [Tooltip, NgClass, NgComponentOutlet],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.title]': 'null',
    '[class.app-icon-host-fit]': 'isFit',
  },
})
export class AppIcon {
  protected readonly hostTooltip = inject(Tooltip, { optional: true, self: true });

  @Input({ required: true })
  icon!: AppIconDefinition;

  @Input()
  size: AppIconSize = 'md';

  @Input()
  tone: AppIconTone = 'inherit';

  @Input()
  surface: AppIconSurface = 'none';

  @Input()
  shape: AppIconShape = 'rounded';

  @Input()
  color?: string;

  @Input()
  strokeWidth = 2;

  @Input()
  absoluteStrokeWidth = false;

  @Input()
  fill = 'none';

  @Input()
  rotate = 0;

  @Input()
  flip: AppIconFlip = 'none';

  @Input()
  spin = false;

  @Input()
  pulse = false;

  @Input()
  fit = false;

  @Input()
  ariaLabel?: string;

  @Input()
  title?: string;

  get isFit(): boolean {
    return this.fit || this.size === 'inherit';
  }

  get resolvedSize(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }

    const sizes: Record<Exclude<AppIconSize, number>, string> = {
      inherit: '100%',
      xs: '14px',
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '28px',
      '2xl': '32px',
    };

    return sizes[this.size];
  }

  get lucideSize(): number {
    if (typeof this.size === 'number') {
      return this.size;
    }

    const sizes: Record<Exclude<AppIconSize, number>, number> = {
      inherit: 24,
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28,
      '2xl': 32,
    };

    return sizes[this.size];
  }

  get lucideInputs(): Record<string, unknown> {
    return {
      size: this.lucideSize,
      color: 'currentColor',
      strokeWidth: this.strokeWidth,
      absoluteStrokeWidth: this.absoluteStrokeWidth,
    };
  }

  get accessibleLabel(): string | null {
    return this.ariaLabel || this.title || null;
  }

  get isDecorative(): boolean {
    return !this.accessibleLabel;
  }

  get iconTransform(): string {
    const transforms: string[] = [];

    if (this.rotate !== 0) {
      transforms.push(`rotate(${this.rotate}deg)`);
    }

    switch (this.flip) {
      case 'horizontal':
        transforms.push('scaleX(-1)');
        break;
      case 'vertical':
        transforms.push('scaleY(-1)');
        break;
      case 'both':
        transforms.push('scale(-1)');
        break;
    }

    return transforms.length > 0 ? transforms.join(' ') : 'none';
  }

  get iconClasses(): Record<string, boolean> {
    return {
      [`app-icon-tone-${this.tone}`]: true,
      [`app-icon-surface-${this.surface}`]: true,
      [`app-icon-shape-${this.shape}`]: this.surface !== 'none',
      'app-icon-has-surface': this.surface !== 'none',
      'app-icon-pulse': this.pulse,
    };
  }
}

