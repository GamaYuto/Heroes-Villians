import { TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Character } from '../../../core/services/characters.service';

class FavMock {
  private fav = false;
  async isFavorite() { return this.fav; }
  async toggle() { this.fav = !this.fav; return this.fav; }
}

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: any;

  const char: Character = {
    id: 'batman',
    name: 'Batman',
    aliases: [],
    universe: 'DC',
    affiliation: 'Hero',
    powerStats: { intelligence: 95 },
    powers: [],
    weaknesses: [],
    firstAppearance: 1939,
    rating: 4.7,
    image: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
      providers: [{ provide: FavoritesService, useClass: FavMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance as CharacterCardComponent;
    component.character = char;
    await component.ngOnChanges({ character: { currentValue: char, previousValue: null, firstChange: true, isFirstChange: () => true } });
  });

  it('initializes favorite state and image placeholder', async () => {
    expect(component.isFav).toBeFalse();
    expect(component.imgSrc.startsWith('data:image/svg+xml')).toBeTrue();
  });

  it('toggles favorite state', async () => {
    await component.toggleFavorite();
    expect(component.isFav).toBeTrue();
  });

  it('sets placeholder on image error', () => {
    component.onImgError();
    expect(component.imgSrc.startsWith('data:image/svg+xml')).toBeTrue();
  });
});
