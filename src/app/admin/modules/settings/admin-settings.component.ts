import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { AdminAuthStore } from '../../core/state/admin-auth.store';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent implements OnInit {
  readonly authStore = inject(AdminAuthStore);
  private readonly authService = inject(AdminAuthService);

  readonly environment = environment;

  // Signals
  readonly isCheckingHealth = signal<boolean>(false);
  readonly apiHealthStatus = signal<'CONNECTED' | 'DISCONNECTED' | 'CHECKING'>('CHECKING');
  readonly apiLatency = signal<number | null>(null);

  readonly isChangingPassword = signal<boolean>(false);
  readonly passwordError = signal<string | null>(null);
  readonly passwordSuccess = signal<string | null>(null);

  // Form Model
  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  ngOnInit(): void {
    this.checkApiConnectivity();
  }

  checkApiConnectivity(): void {
    this.isCheckingHealth.set(true);
    this.apiHealthStatus.set('CHECKING');
    const start = performance.now();

    this.authService.getCurrentUser().subscribe({
      next: () => {
        const elapsed = Math.round(performance.now() - start);
        this.apiLatency.set(elapsed);
        this.apiHealthStatus.set('CONNECTED');
        this.isCheckingHealth.set(false);
      },
      error: () => {
        this.apiHealthStatus.set('DISCONNECTED');
        this.isCheckingHealth.set(false);
      },
    });
  }

  changePassword(): void {
    this.passwordError.set(null);
    this.passwordSuccess.set(null);

    if (!this.passwordForm.currentPassword || !this.passwordForm.newPassword) {
      this.passwordError.set('Please provide both current and new passwords.');
      return;
    }

    if (this.passwordForm.newPassword.length < 6) {
      this.passwordError.set('New password must be at least 6 characters long.');
      return;
    }

    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.passwordError.set('New password and confirmation do not match.');
      return;
    }

    this.isChangingPassword.set(true);
    this.authService
      .changePassword({
        currentPassword: this.passwordForm.currentPassword,
        newPassword: this.passwordForm.newPassword,
      })
      .subscribe({
        next: () => {
          this.isChangingPassword.set(false);
          this.passwordSuccess.set('Password updated successfully. Please use your new password next time.');
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          };
        },
        error: (err: any) => {
          this.isChangingPassword.set(false);
          this.passwordError.set(err?.error?.message || 'Failed to change password.');
        },
      });
  }
}