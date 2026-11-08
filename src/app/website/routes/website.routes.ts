import { Routes } from '@angular/router';

export const WEBSITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../website/website').then((m) => m.Website),
    children: [
      {
        path: '',
        loadComponent: () => import('../home/home').then((m) => m.Home),
        title: 'AadityaSoftwares - Creating Softwares & Digital Excellence',
      },
      {
        path: 'about',
        loadComponent: () => import('../pages/about-page/about-page').then((m) => m.AboutPage),
        title: 'About Us - AadityaSoftwares | Software Engineering & Product Studio',
      },
      {
        path: 'services',
        loadComponent: () => import('../pages/services-page/services-page').then((m) => m.ServicesPage),
        title: 'Our Services - AadityaSoftwares | Full-Cycle Engineering & AI Solutions',
      },
      {
        path: 'projects',
        loadComponent: () => import('../pages/projects-page/projects-page').then((m) => m.ProjectsPage),
        title: 'Featured Projects & Case Studies - AadityaSoftwares',
      },
      {
        path: 'contact',
        loadComponent: () => import('../pages/contact-page/contact-page').then((m) => m.ContactPage),
        title: 'Contact Us - AadityaSoftwares | Start Your Project',
      },
    ],
  },
];

