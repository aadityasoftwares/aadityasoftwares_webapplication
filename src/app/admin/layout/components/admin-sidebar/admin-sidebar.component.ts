import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideLayoutDashboard,
  LucideMessageSquare,
  LucideUsers,
  LucideFileText,
  LucideReceipt,
  LucideCheckSquare,
  LucideTrendingDown,
  LucideSettings,
  LucideGlobe,
  LucideChevronRight,
  LucideSparkles,
  LucideLogOut,
  LucideX,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../../../shared/components/icon/icon';
import { AdminAuthStore } from '../../../core/state/admin-auth.store';
import { AdminAuthService } from '../../../core/services/admin-auth.service';

export interface NavItem {
  label: string;
  route: string;
  icon: AppIconDefinition;
  badge?: string;
  badgeClass?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AppIcon],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  private readonly authStore = inject(AdminAuthStore);
  private readonly authService = inject(AdminAuthService);

  readonly LucideGlobe = LucideGlobe;
  readonly LucideChevronRight = LucideChevronRight;
  readonly LucideSparkles = LucideSparkles;
  readonly LucideLogOut = LucideLogOut;
  readonly LucideX = LucideX;

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', icon: LucideLayoutDashboard },
    { label: 'Enquiries', route: '/admin/enquiries', icon: LucideMessageSquare, badge: 'Active', badgeClass: 'blue' },
    { label: 'Clients', route: '/admin/clients', icon: LucideUsers },
    { label: 'Quotations', route: '/admin/quotations', icon: LucideFileText },
    { label: 'Invoices', route: '/admin/invoices', icon: LucideReceipt },
    { label: 'Tasks', route: '/admin/tasks', icon: LucideCheckSquare },
    { label: 'Expenses', route: '/admin/expenses', icon: LucideTrendingDown },
    { label: 'Settings', route: '/admin/settings', icon: LucideSettings },
  ];

  get displayName(): string {
    return this.authStore.displayName();
  }

  get userRole(): string {
    return this.authStore.role();
  }

  onLogout(): void {
    this.authService.logout().subscribe();
  }
}
