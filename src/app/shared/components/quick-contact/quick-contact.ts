import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucidePhone, LucideMail } from '@lucide/angular';
import { AppIcon } from '../icon/icon';

@Component({
  selector: 'app-quick-contact',
  standalone: true,
  imports: [CommonModule, AppIcon],
  templateUrl: './quick-contact.html',
  styleUrl: './quick-contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickContact {
  readonly LucidePhone = LucidePhone;
  readonly LucideMail = LucideMail;

  readonly whatsappUrl =
    'https://wa.me/918849863872?text=Hello%20Aaditya%20Softwares%2C%20I%20would%20like%20to%20discuss%20a%20project';
  readonly phoneUrl = 'tel:+918849863872';
  readonly emailUrl = 'mailto:contact@aadityasoftwares.in';
}

