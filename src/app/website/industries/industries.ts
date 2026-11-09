import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideTruck,
  LucideShoppingBag,
  LucideLayers,
  LucideStethoscope,
  LucideBuilding2,
  LucideGraduationCap,
  LucideArrowRight,
  LucideCheckCircle2,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface IndustryItem {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly capabilities: string[];
  readonly caseReference?: string;
  readonly icon: AppIconDefinition;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './industries.html',
  styleUrl: './industries.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Industries {
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideArrowRight = LucideArrowRight;

  readonly industries: IndustryItem[] = [
    {
      title: 'Logistics, Freight & Supply Chain',
      category: 'Enterprise Operations',
      description: 'Fleet management, automated shipping manifests, real-time vehicle telemetry, and catalog portals.',
      capabilities: ['Dynamic Freight Quoting', 'Live Consignment Tracking', 'Automated Dispatch Management'],
      caseReference: 'Proven by SGTC India (sgtcindia.com)',
      icon: LucideTruck,
    },
    {
      title: 'Hyperlocal E-Commerce & Marketplaces',
      category: 'Multi-App Platforms',
      description: 'Unified multi-actor ecosystems connecting consumers, storefront vendors, field riders, and back-office admins.',
      capabilities: ['4-App Connected Mesh', 'Geo-Fenced Dispatching', 'Instant Digital Payments'],
      caseReference: 'Proven by Oonloop (oonloop.com)',
      icon: LucideShoppingBag,
    },
    {
      title: 'Productivity & Collaborative SaaS',
      category: 'Cloud SaaS Platforms',
      description: 'High-availability software architectures with real-time state synchronization, Kanban workflows, and workspace sharing.',
      capabilities: ['Real-Time State Sync', 'Multi-Tenant Workspaces', 'Sub-Second Note Rendering'],
      caseReference: 'In-House Flagship StickyJi (stickyji.com)',
      icon: LucideLayers,
    },
    {
      title: 'Laboratory, Scientific & Healthcare',
      category: 'Compliance & Research',
      description: 'Interactive chemical catalogs, medical instrumentation inventories, ISO compliance, and digital requisition.',
      capabilities: ['Catalog Search by CAS/SKU', 'Automated RFQ Inquiries', 'Regulatory Compliance'],
      caseReference: 'Enterprise Equipment Portals',
      icon: LucideStethoscope,
    },
    {
      title: 'B2B Enterprise & Corporate Portals',
      category: 'Corporate Infrastructure',
      description: 'Custom internal operating systems, customer relationship portals, vendor self-service, and analytics dashboards.',
      capabilities: ['Role-Based Access Control', 'Automated ERP Integrations', 'Real-Time Executive KPI Dashboards'],
      caseReference: 'Custom Business Software',
      icon: LucideBuilding2,
    },
    {
      title: 'Education & Knowledge Platforms',
      category: 'Learning & EdTech',
      description: 'Digital course libraries, interactive student dashboards, real-time assessment submission, and knowledge bases.',
      capabilities: ['Interactive Learning Portals', 'Course Asset Management', 'Progress Telemetry'],
      caseReference: 'Modern Web Portals',
      icon: LucideGraduationCap,
    },
  ];
}
