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
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('../pages/privacy-policy-page/privacy-policy-page').then(
            (m) => m.PrivacyPolicyPage,
          ),
        title: 'Privacy Policy - AadityaSoftwares | Data Protection & Security',
      },
      {
        path: 'privacy',
        redirectTo: 'privacy-policy',
        pathMatch: 'full',
      },
      {
        path: 'terms-of-use',
        loadComponent: () =>
          import('../pages/terms-page/terms-page').then((m) => m.TermsPage),
        title: 'Terms of Use - AadityaSoftwares | Master Service Agreement & Legal Terms',
      },
      {
        path: 'terms',
        redirectTo: 'terms-of-use',
        pathMatch: 'full',
      },
      {
        path: 'legal',
        loadComponent: () =>
          import('../pages/legal-page/legal-page').then((m) => m.LegalPage),
        title: 'Legal Notice & Compliance - AadityaSoftwares | Corporate Disclosures',
      },
      {
        path: 'legal-notice',
        redirectTo: 'legal',
        pathMatch: 'full',
      },
      {
        path: 'site-map',
        loadComponent: () =>
          import('../pages/site-map-page/site-map-page').then((m) => m.SiteMapPage),
        title: 'Site Map & Page Directory - AadityaSoftwares',
      },
      {
        path: 'sitemap',
        redirectTo: 'site-map',
        pathMatch: 'full',
      },
    ],
  },
];

