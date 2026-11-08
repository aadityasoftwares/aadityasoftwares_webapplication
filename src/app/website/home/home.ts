import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Services } from '../services/services';
import { Projects } from '../projects/projects';
import { WebsiteFooter } from '../website-footer/website-footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WebsiteHeader, Hero, About, Services, Projects, WebsiteFooter],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

