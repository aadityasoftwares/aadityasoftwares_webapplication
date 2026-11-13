import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './shared/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);
  protected readonly title = signal('AadityaSoftwares');

  ngOnInit(): void {
    this.seoService.initAutoSeo();
  }
}

