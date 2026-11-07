import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsiteHeader } from '../website-header/website-header';
import { Hero } from '../hero/hero';
import { Services } from '../services/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WebsiteHeader, Hero, Services],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

