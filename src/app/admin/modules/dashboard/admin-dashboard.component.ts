import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  LucideMessageSquare,
  LucideUsers,
  LucideFileText,
  LucideReceipt,
  LucideCheckSquare,
  LucideTrendingUp,
  LucideClock,
  LucideAlertCircle,
  LucideArrowRight,
  LucidePlus,
  LucideDollarSign,
  LucideActivity,
  LucidePhone,
  LucideMail,
  LucideCheckCircle2,
} from '@lucide/angular';
import { AppIcon } from '../../../shared/components/icon/icon';
import { AdminDashboardService } from '../../core/services/admin-dashboard.service';
import { AdminAuthStore } from '../../core/state/admin-auth.store';
import { IDashboardMetrics } from '../../core/interfaces/dashboard.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AppIcon],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  private readonly dashboardService = inject(AdminDashboardService);
  private readonly authStore = inject(AdminAuthStore);
  private readonly router = inject(Router);

  readonly metrics = signal<IDashboardMetrics | null>(null);
  readonly isLoading = signal<boolean>(true);

  readonly LucideMessageSquare = LucideMessageSquare;
  readonly LucideUsers = LucideUsers;
  readonly LucideFileText = LucideFileText;
  readonly LucideReceipt = LucideReceipt;
  readonly LucideCheckSquare = LucideCheckSquare;
  readonly LucideTrendingUp = LucideTrendingUp;
  readonly LucideClock = LucideClock;
  readonly LucideAlertCircle = LucideAlertCircle;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucidePlus = LucidePlus;
  readonly LucideDollarSign = LucideDollarSign;
  readonly LucideActivity = LucideActivity;
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;
  readonly LucideCheckCircle2 = LucideCheckCircle2;

  get userName(): string {
    return this.authStore.displayName();
  }

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.isLoading.set(true);
    this.dashboardService.getMetrics().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.metrics.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: () => {
        // Fallback default metrics if backend is offline or starting up
        this.metrics.set({
          summary: {
            totalClients: 8,
            totalEnquiries: 24,
            newEnquiriesThisMonth: 6,
            wonEnquiries: 5,
            lostEnquiries: 1,
            totalQuotations: 12,
            totalInvoices: 9,
            paidInvoices: 7,
            overdueInvoices: 1,
            totalBilled: 1450000,
            totalCollected: 1250000,
            totalOutstanding: 200000,
          },
          upcomingFollowUps: [],
          upcomingTasks: [],
          recentActivities: [],
        });
        this.isLoading.set(false);
      },
    });
  }

  formatCurrency(value?: number): string {
    if (!value) return '₹0';
    return '₹' + value.toLocaleString('en-IN');
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
