import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CustomCursor } from '../../shared/components/custom-cursor/custom-cursor';
import { QuickContact } from '../../shared/components/quick-contact/quick-contact';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet, CustomCursor, QuickContact],
  templateUrl: './website.html',
  styleUrl: './website.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Website implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (!event.urlAfterRedirects.includes('#')) {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        }
      });
  }
}
