import { Routes } from '@angular/router';
import { adminAuthGuard, adminGuestGuard } from '../core/guards/admin-auth.guard';
import { AdminLayoutComponent } from '../layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [adminGuestGuard],
    loadComponent: () =>
      import('../modules/auth/login/admin-login.component').then((m) => m.AdminLoginComponent),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../modules/dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'enquiries',
        loadComponent: () =>
          import('../modules/enquiries/enquiry-list/enquiry-list.component').then(
            (m) => m.EnquiryListComponent
          ),
      },
      {
        path: 'clients',
        loadComponent: () =>
          import('../modules/clients/client-list/client-list.component').then(
            (m) => m.ClientListComponent
          ),
      },
      {
        path: 'quotations',
        loadComponent: () =>
          import('../modules/quotations/quotation-list/quotation-list.component').then(
            (m) => m.QuotationListComponent
          ),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('../modules/invoices/invoice-list/invoice-list.component').then(
            (m) => m.InvoiceListComponent
          ),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('../modules/tasks/task-list/task-list.component').then((m) => m.TaskListComponent),
      },
      {
        path: 'expenses',
        loadComponent: () =>
          import('../modules/expenses/expense-list/expense-list.component').then(
            (m) => m.ExpenseListComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../modules/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent
          ),
      },
    ],
  },
];
