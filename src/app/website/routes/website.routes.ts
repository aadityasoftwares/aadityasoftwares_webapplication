import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../website/website').then((m) => m.Website),
    children: [
      {
        path: '',
        loadComponent: () => import('../home/home').then((m) => m.Home),
        title: 'Aaditya Softwares - Creating Softwares & Digital Excellence',
      },
    ],
  },
];

