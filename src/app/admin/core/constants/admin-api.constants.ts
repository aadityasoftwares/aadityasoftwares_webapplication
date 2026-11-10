import { environment } from '../../../../environments/environment';

export const ADMIN_API_BASE = environment.apiUrl;

export const ADMIN_API_ENDPOINTS = {
  auth: {
    login: `${ADMIN_API_BASE}/auth/login`,
    register: `${ADMIN_API_BASE}/auth/register`,
    refreshToken: `${ADMIN_API_BASE}/auth/refreshtoken`,
    logout: `${ADMIN_API_BASE}/auth/logout`,
    forgotPassword: `${ADMIN_API_BASE}/auth/forgotpassword`,
    resetPassword: `${ADMIN_API_BASE}/auth/resetpassword`,
    changePassword: `${ADMIN_API_BASE}/auth/changepassword`,
    sessions: `${ADMIN_API_BASE}/auth/sessions`,
    me: `${ADMIN_API_BASE}/auth/me`,
  },
  dashboard: {
    metrics: `${ADMIN_API_BASE}/dashboard/metrics`,
  },
  enquiries: {
    base: `${ADMIN_API_BASE}/enquiries`,
    byId: (id: string) => `${ADMIN_API_BASE}/enquiries/${id}`,
    assign: (id: string) => `${ADMIN_API_BASE}/enquiries/${id}/assign`,
    convert: (id: string) => `${ADMIN_API_BASE}/enquiries/${id}/convert`,
    followUps: (id: string) => `${ADMIN_API_BASE}/enquiries/${id}/follow-ups`,
  },
  clients: {
    base: `${ADMIN_API_BASE}/clients`,
    byId: (id: string) => `${ADMIN_API_BASE}/clients/${id}`,
  },
  quotations: {
    base: `${ADMIN_API_BASE}/quotations`,
    byId: (id: string) => `${ADMIN_API_BASE}/quotations/${id}`,
  },
  invoices: {
    base: `${ADMIN_API_BASE}/invoices`,
    byId: (id: string) => `${ADMIN_API_BASE}/invoices/${id}`,
  },
  payments: {
    base: `${ADMIN_API_BASE}/payments`,
    byId: (id: string) => `${ADMIN_API_BASE}/payments/${id}`,
  },
  tasks: {
    base: `${ADMIN_API_BASE}/tasks`,
    byId: (id: string) => `${ADMIN_API_BASE}/tasks/${id}`,
  },
  expenses: {
    base: `${ADMIN_API_BASE}/expenses`,
    byId: (id: string) => `${ADMIN_API_BASE}/expenses/${id}`,
  },
  reports: {
    base: `${ADMIN_API_BASE}/reports`,
  },
  user: {
    base: `${ADMIN_API_BASE}/user`,
    profile: `${ADMIN_API_BASE}/userprofile`,
    preferences: `${ADMIN_API_BASE}/userpreference`,
  },
};
