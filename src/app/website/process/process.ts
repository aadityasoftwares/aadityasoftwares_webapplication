import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  LucideSearch,
  LucideLayout,
  LucideCode2,
  LucideShieldCheck,
  LucideRocket,
  LucideCheckCircle2,
  LucideArrowRight,
} from '@lucide/angular';
import { AppIcon, type AppIconDefinition } from '../../shared/components/icon/icon';
import { ScrollReveal } from '../scroll-reveal';

export interface ProcessStep {
  readonly id: string;
  readonly name: string;
  readonly duration: string;
  readonly headline: string;
  readonly description: string;
  readonly deliverables: string[];
  readonly icon: AppIconDefinition;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [AppIcon, ScrollReveal],
  templateUrl: './process.html',
  styleUrl: './process.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process {
  readonly LucideCheckCircle2 = LucideCheckCircle2;
  readonly LucideArrowRight = LucideArrowRight;

  readonly activeStepIndex = signal<number>(0);

  readonly steps: ProcessStep[] = [
    {
      id: '01',
      name: 'Discovery & Architecture',
      duration: 'Week 1',
      headline: 'Foundational System Architecture & Scope Definition',
      description:
        'We deep-dive into your business objectives, data schemas, compliance constraints, and security requirements to craft an actionable technical roadmap.',
      deliverables: ['System Architecture Diagram', 'Database Schema Specification', 'API & Integration Contract', 'Sprint Delivery Plan'],
      icon: LucideSearch,
    },
    {
      id: '02',
      name: 'UI/UX & Design Systems',
      duration: 'Week 1 - 2',
      headline: 'Component Architecture & Accessible User Experience',
      description:
        'We create intuitive, high-fidelity interfaces and design tokens in Figma. Every user journey is wireframed and validated before writing code.',
      deliverables: ['Interactive Clickable Prototype', 'Design Token Guidelines', 'Component States & Responsive Layouts', 'User Journey Maps'],
      icon: LucideLayout,
    },
    {
      id: '03',
      name: 'Agile Engineering Sprints',
      duration: '2-Week Cycles',
      headline: 'Modular, High-Velocity Full-Stack Development',
      description:
        'Our engineers work in predictable 2-week agile sprints. You receive weekly demo builds and real-time Git progress without opaque agency barriers.',
      deliverables: ['Clean, Well-Documented Code', 'Modular Frontend & Backend APIs', '2-Week Sprint Releases', 'Direct Engineer Collaboration'],
      icon: LucideCode2,
    },
    {
      id: '04',
      name: 'Rigorous Quality & Security',
      duration: 'Continuous',
      headline: 'Automated Testing, Vulnerability Audits & Benchmarks',
      description:
        'Zero compromise on stability. We execute automated unit tests, cross-browser validation, OWASP security checks, and Lighthouse performance audits.',
      deliverables: ['Vitest / E2E Automated Suites', 'Security & OWASP Compliance Audit', 'Core Web Vitals Optimization', 'Zero-Defect Signoff'],
      icon: LucideShieldCheck,
    },
    {
      id: '05',
      name: 'Zero-Downtime Deployment',
      duration: 'Launch & Scale',
      headline: 'Cloud Infrastructure, Telemetry & 100% IP Handover',
      description:
        'We deploy your platform to production via automated CI/CD pipelines, configure telemetry alarms, and provide complete Git repository handover.',
      deliverables: ['Automated CI/CD Pipelines', 'Cloud Telemetry & Uptime Alarms', '100% Code & IP Ownership Handover', 'Post-Launch SLA Support'],
      icon: LucideRocket,
    },
  ];

  selectStep(index: number): void {
    this.activeStepIndex.set(index);
  }
}
