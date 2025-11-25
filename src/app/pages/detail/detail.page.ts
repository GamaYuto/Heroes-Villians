import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RatingBadgeComponent } from '../../shared/components/rating-badge/rating-badge.component';
import { ActivatedRoute } from '@angular/router';
import { CharactersService, Character } from '../../core/services/characters.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, shareSocial } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, IonicModule, RatingBadgeComponent],
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  character?: Character;
  loading = true;
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private cs: CharactersService,
    private fav: FavoritesService
  ) {
    addIcons({ heart, heartOutline, shareSocial });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cs.getById(id).subscribe(async (c) => {
        this.character = c;
        this.loading = false;
        if (c) this.isFav = await this.fav.isFavorite(c.id);
      });
    } else {
      this.loading = false;
    }
  }

  async toggleFav() {
    if (!this.character) return;
    this.isFav = await this.fav.toggle(this.character.id);
  }

  share() {
    if (!this.character) return;
    try {
      if (navigator.share) {
        navigator.share({
          title: this.character.name,
          text: this.character.powers?.slice(0, 3).join(', '),
            url: this.character.links?.['wiki'],
        });
      }
    } catch (e) {
      console.warn('Share failed', e);
    }
  }
}
