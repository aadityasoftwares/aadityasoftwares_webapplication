import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './website.html',
  styleUrl: './website.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Website {}

