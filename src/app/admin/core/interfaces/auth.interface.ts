export interface AdminUser {
  _id: string;
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  avatarUrl?: string;
  role?: string;
  globalRoleId?: string | {
    _id: string;
    name: string;
    code: string;
    displayName?: string;
  };
  status?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface AuthSessionData {
  user: AdminUser;
  sessionId: string;
  tokens: AuthTokens;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

