import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Character } from '../../../core/services/characters.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { RatingBadgeComponent } from '../rating-badge/rating-badge.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, RatingBadgeComponent],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, OnChanges {
  @Input() character!: Character;
  isFav = false;
  imgSrc = '';

  constructor(private favorites: FavoritesService) {}

  async ngOnInit() {
    if (this.character?.id) {
      this.isFav = await this.favorites.isFavorite(this.character.id);
      this.imgSrc = this.character.image || this.placeholder;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && this.character?.id) {
      this.isFav = await this.favorites.isFavorite(this.character.id);
      this.imgSrc = this.character.image || this.placeholder;
    }
  }

  async toggleFavorite(ev?: Event) {
    ev?.stopPropagation();
    if (!this.character) return;
    this.isFav = await this.favorites.toggle(this.character.id);
  }

  onImgError() {
    this.imgSrc = this.placeholder;
  }

  private readonly placeholder =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'>
  <rect width='100%' height='100%' fill='%23e9ecef'/>
  <g fill='%239aa0a6' font-family='Arial, Helvetica, sans-serif' font-size='10' text-anchor='middle'>
    <text x='60' y='42'>Imagen no disponible</text>
  </g>
</svg>`);
}
