import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavoritesService } from '../../core/services/favorites.service';
import { CharactersService, Character } from '../../core/services/characters.service';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule, CharacterCardComponent],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  characters: Character[] = [];
  loading = true;

  constructor(private fav: FavoritesService, private cs: CharactersService) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  private async loadFavorites() {
    this.loading = true;
    const ids = await this.fav.getAll();
    if (!ids.length) {
      this.characters = [];
      this.loading = false;
      return;
    }
    this.cs.getCharacters({ limit: 1000 }).subscribe(res => {
      this.characters = res.items.filter(c => ids.includes(c.id));
      this.loading = false;
    }, () => (this.loading = false));
  }
}
