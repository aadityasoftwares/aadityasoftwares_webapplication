import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  LucideMail,
  LucideLock,
  LucideEye,
  LucideEyeOff,
  LucideArrowRight,
  LucideShield,
  LucideAlertCircle,
  LucideCheckCircle2,
} from '@lucide/angular';
import { AppIcon } from '../../../../shared/components/icon/icon';
import { AdminAuthService } from '../../../core/services/admin-auth.service';
import { AdminAuthStore } from '../../../core/state/admin-auth.store';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppIcon],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  private readonly authService = inject(AdminAuthService);
  private readonly authStore = inject(AdminAuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  email = '';
  password = '';
  rememberMe = true;
  showPassword = false;

  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = this.authStore.isLoading;

  readonly LucideMail = LucideMail;
  readonly LucideLock = LucideLock;
  readonly LucideEye = LucideEye;
  readonly LucideEyeOff = LucideEyeOff;
  readonly LucideArrowRight = LucideArrowRight;
  readonly LucideShield = LucideShield;
  readonly LucideAlertCircle = LucideAlertCircle;
  readonly LucideCheckCircle2 = LucideCheckCircle2;

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage.set(null);

    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      this.errorMessage.set('Please enter both your email address and password.');
      return;
    }

    this.authService
      .login({
        email,
        password,
        rememberMe: this.rememberMe,
      })
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => {
          const msg =
            err?.error?.message ||
            err?.message ||
            'Unable to sign in. Please verify your credentials or server connection.';
          this.errorMessage.set(msg);
        },
      });
  }
}
