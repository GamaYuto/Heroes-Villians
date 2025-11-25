import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  @Input() title = 'Nada aquí';
  @Input() message = '';
  @Input() actionText?: string;
}
