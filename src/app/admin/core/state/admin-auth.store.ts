import { Injectable, computed, signal } from '@angular/core';
import { AdminUser, AuthSessionData } from '../interfaces/auth.interface';

const ADMIN_STORAGE_KEY = 'aaditya_admin_session';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthStore {
  private readonly userState = signal<AdminUser | null>(null);
  private readonly accessTokenState = signal<string | null>(null);
  private readonly sessionIdState = signal<string | null>(null);
  private readonly initializedState = signal(false);
  private readonly loadingState = signal(false);

  readonly user = this.userState.asReadonly();
  readonly accessToken = this.accessTokenState.asReadonly();
  readonly sessionId = this.sessionIdState.asReadonly();
  readonly initialized = this.initializedState.asReadonly();
  readonly isLoading = this.loadingState.asReadonly();

  readonly isAuthenticated = computed(() => Boolean(this.userState() && this.accessTokenState()));
  readonly userId = computed(() => this.userState()?._id || this.userState()?.id || null);
  readonly userEmail = computed(() => this.userState()?.email || null);
  readonly displayName = computed(() => {
    const u = this.userState();
    if (!u) return 'Administrator';
    if (u.displayName) return u.displayName;
    if (u.firstName) return `${u.firstName} ${u.lastName || ''}`.trim();
    return u.email.split('@')[0];
  });
  readonly role = computed(() => {
    const u = this.userState();
    if (!u) return 'ADMIN';
    if (typeof u.globalRoleId === 'object' && u.globalRoleId?.code) return u.globalRoleId.code;
    return u.role || 'SUPER_ADMIN';
  });

  constructor() {
    this.initializeFromStorage();
  }

  setLoading(loading: boolean): void {
    this.loadingState.set(loading);
  }

  setSession(session: AuthSessionData): void {
    this.userState.set(session.user);
    this.accessTokenState.set(session.tokens?.accessToken || null);
    this.sessionIdState.set(session.sessionId || null);
    this.initializedState.set(true);
    this.saveToStorage(session);
  }

  updateUser(user: Partial<AdminUser>): void {
    const current = this.userState();
    if (current) {
      const updated = { ...current, ...user };
      this.userState.set(updated);
      const session = this.getStoredSession();
      if (session) {
        session.user = updated;
        this.saveToStorage(session);
      }
    }
  }

  setAccessToken(token: string): void {
    this.accessTokenState.set(token);
    const session = this.getStoredSession();
    if (session && session.tokens) {
      session.tokens.accessToken = token;
      this.saveToStorage(session);
    }
  }

  clearSession(): void {
    this.userState.set(null);
    this.accessTokenState.set(null);
    this.sessionIdState.set(null);
    this.initializedState.set(true);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      } catch {}
    }
  }

  private initializeFromStorage(): void {
    if (typeof window === 'undefined') {
      this.initializedState.set(true);
      return;
    }

    try {
      const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw) as AuthSessionData;
        if (session && session.user && session.tokens?.accessToken) {
          this.userState.set(session.user);
          this.accessTokenState.set(session.tokens.accessToken);
          this.sessionIdState.set(session.sessionId || null);
        }
      }
    } catch {
      // ignore parsing error
    } finally {
      this.initializedState.set(true);
    }
  }

  private saveToStorage(session: AuthSessionData): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
    } catch {}
  }

  private getStoredSession(): AuthSessionData | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}

