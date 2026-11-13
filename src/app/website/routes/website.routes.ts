import { Routes } from '@angular/router';
import { SeoConfig, SeoService } from '../../shared/services/seo.service';

export const WEBSITE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../website/website').then((m) => m.Website),
    children: [
      {
        path: '',
        loadComponent: () => import('../home/home').then((m) => m.Home),
        title: 'Aaditya Softwares | Leading Software Company in Vadodara, Gujarat',
        data: {
          seo: {
            title: 'Aaditya Softwares - Leading Software Company in Vadodara, Gujarat',
            description:
              'Aaditya Softwares is a top software development company in Vadodara, Gujarat. We engineer custom enterprise software, web apps (Angular, React), mobile apps, cloud architectures, and AI solutions.',
            keywords:
              'software companies in vadodara, software company in vadodara, best software company in vadodara, top IT company vadodara, web development vadodara, mobile app development vadodara, custom software development gujarat, software engineering company vadodara, Aaditya Softwares',
            canonicalUrl: 'https://aadityasoftwares.in/',
            ogType: 'website',
            ogTitle: 'Aaditya Softwares - Leading Software Company in Vadodara, Gujarat',
            ogDescription:
              'Engineering custom software, enterprise web applications, and scalable mobile apps. Headquartered in Vadodara, Gujarat, India.',
            jsonLd: [
              SeoService.getLocalBusinessSchema(),
              SeoService.getWebSiteSchema(),
              SeoService.getFaqPageSchema([
                {
                  question: 'Are you based in Vadodara, Gujarat, and do you work with local and global clients?',
                  answer:
                    'Yes! Aaditya Softwares is proudly headquartered in Vadodara, Gujarat. We deliver engineering solutions for businesses across Vadodara, Ahmedabad, Surat, and across India, as well as clients in the USA, UK, and Europe.',
                },
                {
                  question: 'Why choose Aaditya Softwares among software companies in Vadodara?',
                  answer:
                    'Unlike traditional IT agencies in Vadodara, Aaditya Softwares is an engineering-first studio. You collaborate directly with senior full-stack software architects specializing in modern frameworks (Angular, React, Node.js, Cloud, AI). We provide 100% IP ownership, transparent agile sprints, and production-tested code.',
                },
                {
                  question: 'What software development services does Aaditya Softwares provide?',
                  answer:
                    'We engineer enterprise web applications, cross-platform mobile apps (React Native, iOS, Android), SaaS platforms, cloud infrastructure (DevOps, Docker, CI/CD), and AI-driven automation workflows.',
                },
                {
                  question: 'Do we receive 100% intellectual property and source code ownership?',
                  answer:
                    'Yes, absolutely. From day one, all source code, Git repositories, deployment scripts, and intellectual property belong 100% to your organization with zero vendor lock-in.',
                },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'about',
        loadComponent: () => import('../pages/about-page/about-page').then((m) => m.AboutPage),
        title: 'About Us | Aaditya Softwares - Software Engineering Studio in Vadodara',
        data: {
          seo: {
            title: 'About Us | Aaditya Softwares - Software Engineering Studio in Vadodara',
            description:
              'Discover Aaditya Softwares, a software company based in Vadodara, Gujarat. Learn about our engineering principles, agile sprint methodology, and 100% client code ownership.',
            keywords:
              'about aaditya softwares, software company in vadodara, IT company profile vadodara, software architects vadodara, software developers in gujarat',
            canonicalUrl: 'https://aadityasoftwares.in/about',
            ogTitle: 'About Aaditya Softwares | Software Company in Vadodara, Gujarat',
            ogDescription:
              'Software excellence begins with simplicity. Discover our engineering journey, Vadodara development center, and production-tested solutions.',
            jsonLd: [
              SeoService.getLocalBusinessSchema(),
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'About Us', url: '/about' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'services',
        loadComponent: () => import('../pages/services-page/services-page').then((m) => m.ServicesPage),
        title: 'Software Development Services in Vadodara | Aaditya Softwares',
        data: {
          seo: {
            title: 'Software Development Services in Vadodara | Aaditya Softwares',
            description:
              'Full-cycle software development services in Vadodara, Gujarat: custom web applications, mobile apps (React Native), AI engineering, cloud DevOps, and UI/UX design.',
            keywords:
              'software development services vadodara, custom web development vadodara, mobile app development vadodara, hire developers vadodara, react native development vadodara, angular development vadodara, cloud devops services',
            canonicalUrl: 'https://aadityasoftwares.in/services',
            ogTitle: 'Software Development Services in Vadodara | Aaditya Softwares',
            ogDescription:
              'Explore full-stack software development services: custom business software, mobile apps, SaaS, and cloud systems engineered in Vadodara.',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Services', url: '/services' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'projects',
        loadComponent: () => import('../pages/projects-page/projects-page').then((m) => m.ProjectsPage),
        title: 'Featured Projects & Case Studies | Aaditya Softwares Vadodara',
        data: {
          seo: {
            title: 'Featured Projects & Case Studies | Aaditya Softwares Vadodara',
            description:
              'Case studies of software solutions delivered by Aaditya Softwares in Vadodara: enterprise logistics platforms (SGTC India), multi-app ecosystem (Oonloop), and StickyJi SaaS.',
            keywords:
              'software case studies vadodara, software projects portfolio, enterprise software examples, stickyji platform, web app portfolio vadodara',
            canonicalUrl: 'https://aadityasoftwares.in/projects',
            ogTitle: 'Featured Projects & Case Studies | Aaditya Softwares',
            ogDescription:
              'Explore verified software case studies: from multi-sided marketplaces to proprietary SaaS platforms engineered to scale.',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Projects', url: '/projects' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('../pages/blog/blog-list/blog-list.component').then((m) => m.PublicBlogListComponent),
        title: 'Engineering & Technology Blog | Aaditya Softwares Vadodara',
        data: {
          seo: {
            title: 'Engineering & Technology Blog | Aaditya Softwares Vadodara',
            description:
              'Technical insights, framework benchmarks, full-stack architecture, and software development guides written by the engineers at Aaditya Softwares Vadodara.',
            keywords:
              'software engineering blog, tech articles vadodara, angular tutorials, nodejs architecture, software development blog gujarat',
            canonicalUrl: 'https://aadityasoftwares.in/blog',
            ogTitle: 'Engineering & Technology Blog | Aaditya Softwares',
            ogDescription:
              'Architectural dispatches, framework benchmarks, and software engineering deep-dives from our Vadodara studio.',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'blog/category/:slug',
        loadComponent: () =>
          import('../pages/blog/blog-list/blog-list.component').then((m) => m.PublicBlogListComponent),
      },
      {
        path: 'blog/tag/:slug',
        loadComponent: () =>
          import('../pages/blog/blog-list/blog-list.component').then((m) => m.PublicBlogListComponent),
      },
      {
        path: 'blog/author/:slug',
        loadComponent: () =>
          import('../pages/blog/blog-list/blog-list.component').then((m) => m.PublicBlogListComponent),
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('../pages/blog/blog-detail/blog-detail.component').then((m) => m.PublicBlogDetailComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('../pages/contact-page/contact-page').then((m) => m.ContactPage),
        title: 'Contact Aaditya Softwares | Software Company in Vadodara, Gujarat',
        data: {
          seo: {
            title: 'Contact Aaditya Softwares | Software Company in Vadodara, Gujarat',
            description:
              'Consult directly with senior software engineers in Vadodara, Gujarat. Phone: +91 88498 63872, Email: contact@aadityasoftwares.in. Free technical consultation & NDA.',
            keywords:
              'contact software company vadodara, software developer vadodara contact, hire software engineers vadodara, it company address vadodara, software consultation gujarat',
            canonicalUrl: 'https://aadityasoftwares.in/contact',
            ogTitle: 'Contact Aaditya Softwares | Software Company in Vadodara, Gujarat',
            ogDescription:
              'Have a product idea or engineering challenge? Speak directly with senior software architects in Vadodara, Gujarat. 24h technical assessment response.',
            jsonLd: [
              SeoService.getLocalBusinessSchema(),
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Contact Us', url: '/contact' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('../pages/privacy-policy-page/privacy-policy-page').then(
            (m) => m.PrivacyPolicyPage,
          ),
        title: 'Privacy Policy | Aaditya Softwares Vadodara',
        data: {
          seo: {
            title: 'Privacy Policy | Aaditya Softwares Vadodara',
            description:
              'Read the Privacy Policy and data protection standards of Aaditya Softwares, registered software studio in Vadodara, Gujarat, India.',
            canonicalUrl: 'https://aadityasoftwares.in/privacy-policy',
            robots: 'index, follow',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Privacy Policy', url: '/privacy-policy' },
              ]),
            ],
          } as SeoConfig,
        },
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
        title: 'Terms of Use & Master Service Agreement | Aaditya Softwares',
        data: {
          seo: {
            title: 'Terms of Use & Master Service Agreement | Aaditya Softwares',
            description:
              'Review the Terms of Use, Master Service Agreement, and corporate governance for Aaditya Softwares, Vadodara, Gujarat, India.',
            canonicalUrl: 'https://aadityasoftwares.in/terms-of-use',
            robots: 'index, follow',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Terms of Use', url: '/terms-of-use' },
              ]),
            ],
          } as SeoConfig,
        },
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
        title: 'Legal Notice & Corporate Disclosures | Aaditya Softwares Vadodara',
        data: {
          seo: {
            title: 'Legal Notice & Corporate Disclosures | Aaditya Softwares Vadodara',
            description:
              'Corporate disclosures, regulatory compliance, and statutory registrations for Aaditya Softwares in Vadodara, Gujarat, India.',
            canonicalUrl: 'https://aadityasoftwares.in/legal',
            robots: 'index, follow',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Legal Notice', url: '/legal' },
              ]),
            ],
          } as SeoConfig,
        },
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
        title: 'Site Map & Page Directory | Aaditya Softwares',
        data: {
          seo: {
            title: 'Site Map & Page Directory | Aaditya Softwares',
            description:
              'Explore the complete architectural directory and public page index for Aaditya Softwares website.',
            canonicalUrl: 'https://aadityasoftwares.in/site-map',
            robots: 'index, follow',
            jsonLd: [
              SeoService.getBreadcrumbSchema([
                { name: 'Home', url: '/' },
                { name: 'Site Map', url: '/site-map' },
              ]),
            ],
          } as SeoConfig,
        },
      },
      {
        path: 'sitemap',
        redirectTo: 'site-map',
        pathMatch: 'full',
      },
    ],
  },
];
