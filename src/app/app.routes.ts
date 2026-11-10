import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./website/routes/website.routes').then((m) => m.WEBSITE_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
