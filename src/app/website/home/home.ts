import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { Hero } from '../hero/hero';
import { TrustHighlights } from '../trust-highlights/trust-highlights';
import { About } from '../about/about';
import { Services } from '../services/services';
import { WhyChooseUs } from '../why-choose-us/why-choose-us';
import { Process } from '../process/process';
import { TechStack } from '../tech-stack/tech-stack';
import { Projects } from '../projects/projects';
import { Industries } from '../industries/industries';
import { Testimonials } from '../testimonials/testimonials';
import { Faq } from '../faq/faq';
import { CtaBanner } from '../cta-banner/cta-banner';
import { WebsiteFooter } from '../website-footer/website-footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    WebsiteHeader,
    Hero,
    TrustHighlights,
    About,
    Services,
    WhyChooseUs,
    Process,
    TechStack,
    Projects,
    Industries,
    Testimonials,
    Faq,
    CtaBanner,
    WebsiteFooter,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }
}

