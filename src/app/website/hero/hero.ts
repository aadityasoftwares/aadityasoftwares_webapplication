import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucidePlay, LucideArrowRight, LucideX } from '@lucide/angular';
import { AppIcon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, AppIcon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly LucidePlay = LucidePlay;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideX = LucideX;

  readonly isVideoModalOpen = signal(false);

  @Output() exploreClick = new EventEmitter<void>();
  @Output() playClick = new EventEmitter<void>();

  onExplore(): void {
    this.exploreClick.emit();
    const services = document.getElementById('services');
    if (services) {
      services.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onPlay(): void {
    this.isVideoModalOpen.set(true);
    this.playClick.emit();
  }

  closeVideoModal(): void {
    this.isVideoModalOpen.set(false);
  }
}
