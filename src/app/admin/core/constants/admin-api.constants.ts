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
  blogs: {
    base: `${ADMIN_API_BASE}/blogs`,
    byId: (id: string) => `${ADMIN_API_BASE}/blogs/${id}`,
    publish: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/publish`,
    unpublish: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/unpublish`,
    schedule: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/schedule`,
    archive: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/archive`,
    preview: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/preview`,
    revisions: (id: string) => `${ADMIN_API_BASE}/blogs/${id}/revisions`,
    restoreRevision: (id: string, revisionId: string) =>
      `${ADMIN_API_BASE}/blogs/${id}/revisions/${revisionId}/restore`,
    websites: {
      base: `${ADMIN_API_BASE}/blogs/websites`,
      byId: (id: string) => `${ADMIN_API_BASE}/blogs/websites/${id}`,
      status: (id: string) => `${ADMIN_API_BASE}/blogs/websites/${id}/status`,
    },
    categories: {
      base: `${ADMIN_API_BASE}/blogs/categories`,
      byId: (id: string) => `${ADMIN_API_BASE}/blogs/categories/${id}`,
    },
    tags: {
      base: `${ADMIN_API_BASE}/blogs/tags`,
      byId: (id: string) => `${ADMIN_API_BASE}/blogs/tags/${id}`,
    },
    authors: {
      base: `${ADMIN_API_BASE}/blogs/authors`,
      byId: (id: string) => `${ADMIN_API_BASE}/blogs/authors/${id}`,
    },
    redirects: {
      base: `${ADMIN_API_BASE}/blogs/redirects`,
      byId: (id: string) => `${ADMIN_API_BASE}/blogs/redirects/${id}`,
    },
  },
  media: {
    requestUpload: `${ADMIN_API_BASE}/media/requestupload`,
    completeUpload: (id: string) => `${ADMIN_API_BASE}/media/${id}/complete`,
    getAll: `${ADMIN_API_BASE}/media/getall`,
    getById: (id: string) => `${ADMIN_API_BASE}/media/get/${id}`,
    delete: (id: string) => `${ADMIN_API_BASE}/media/delete/${id}`,
  },
  user: {
    base: `${ADMIN_API_BASE}/user`,
    profile: `${ADMIN_API_BASE}/userprofile`,
    preferences: `${ADMIN_API_BASE}/userpreference`,
  },
};
