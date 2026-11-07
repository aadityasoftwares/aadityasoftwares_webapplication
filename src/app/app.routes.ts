import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/routes/website.routes').then((m) => m.WEBSITE_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
