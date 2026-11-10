import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminBlogContextStore } from '../../../../core/state/admin-blog-context.store';

@Component({
  selector: 'app-blog-website-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="website-selector-bar">
      <div class="selector-label-wrap">
        <span class="pulse-indicator"></span>
        <span class="selector-label">Target Website Context:</span>
      </div>
      <div class="selector-controls">
        @for (site of contextStore.websites(); track site._id) {
          <button
            type="button"
            class="site-chip-btn"
            [class.is-active]="site._id === contextStore.selectedWebsiteId()"
            (click)="contextStore.setWebsiteId(site._id)"
          >
            <span class="chip-dot" [class.dot-aaditya]="site.slug === 'aaditya-softwares'" [class.dot-stickyji]="site.slug === 'stickyji'"></span>
            <span class="chip-name">{{ site.name }}</span>
            <span class="chip-domain">{{ site.domain }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .website-selector-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1.25rem;
      background: linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(30, 58, 138, 0.02));
      border: 1px solid rgba(29, 78, 216, 0.15);
      border-radius: 12px;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .selector-label-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .pulse-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
      70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .selector-label {
      font-size: 0.8125rem;
      font-weight: 600;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .selector-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .site-chip-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.875rem;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 9999px;
      font-size: 0.8125rem;
      font-weight: 500;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3b82f6;
        color: #1e3a8a;
      }

      &.is-active {
        background: #1d4ed8;
        border-color: #1d4ed8;
        color: #ffffff;
        box-shadow: 0 4px 10px rgba(29, 78, 216, 0.25);

        .chip-domain {
          color: rgba(255, 255, 255, 0.75);
        }
      }
    }

    .chip-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #94a3b8;

      &.dot-aaditya {
        background: #3b82f6;
      }
      &.dot-stickyji {
        background: #f59e0b;
      }
    }

    .chip-domain {
      font-size: 0.6875rem;
      color: #94a3b8;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogWebsiteSelectorComponent {
  readonly contextStore = inject(AdminBlogContextStore);
}

