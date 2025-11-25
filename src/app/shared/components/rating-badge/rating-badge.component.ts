import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rating-badge',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './rating-badge.component.html',
  styleUrls: ['./rating-badge.component.scss']
})
export class RatingBadgeComponent {
  @Input() rating = 0;
  get stars() {
    const full = Math.round(this.rating);
    return new Array(5).fill(0).map((_, i) => i < full);
  }
}
