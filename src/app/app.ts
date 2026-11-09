import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursor } from './shared/components/custom-cursor/custom-cursor';
import { QuickContact } from './shared/components/quick-contact/quick-contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursor, QuickContact],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('AadityaSoftwares');
}
