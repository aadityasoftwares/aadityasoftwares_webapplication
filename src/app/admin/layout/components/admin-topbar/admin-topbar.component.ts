import { ChangeDetectionStrategy, Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideMenu,
  LucideSearch,
  LucideBell,
  LucideUser,
  LucideLogOut,
  LucideSettings,
  LucideShield,
} from '@lucide/angular';
import { AppIcon } from '../../../../shared/components/icon/icon';
import { AdminAuthStore } from '../../../core/state/admin-auth.store';
import { AdminAuthService } from '../../../core/services/admin-auth.service';

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [CommonModule, AppIcon],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  private readonly authStore = inject(AdminAuthStore);
  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);

  readonly LucideMenu = LucideMenu;
  readonly LucideSearch = LucideSearch;
  readonly LucideBell = LucideBell;
  readonly LucideUser = LucideUser;
  readonly LucideLogOut = LucideLogOut;
  readonly LucideSettings = LucideSettings;
  readonly LucideShield = LucideShield;

  get displayName(): string {
    return this.authStore.displayName();
  }

  get userEmail(): string {
    return this.authStore.userEmail() || 'admin@aadityasoftwares.in';
  }

  get userRole(): string {
    return this.authStore.role();
  }

  get initials(): string {
    const name = this.displayName;
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  onSettings(): void {
    this.router.navigate(['/admin/settings']);
  }

  onLogout(): void {
    this.authService.logout().subscribe();
  }
}
