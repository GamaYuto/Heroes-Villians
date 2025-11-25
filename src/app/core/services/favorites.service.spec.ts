import { FavoritesService } from './favorites.service';
import { Preferences } from '@capacitor/preferences';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    spyOn(Preferences, 'get').and.callFake(async ({ key }) => ({ value: store[key] ?? null }));
    spyOn(Preferences, 'set').and.callFake(async ({ key, value }) => { store[key] = value; });
    service = new FavoritesService();
  });

  it('adds, checks, toggles and removes favorites', async () => {
    expect(await service.getAll()).toEqual([]);

    await service.add('batman');
    expect(await service.isFavorite('batman')).toBeTrue();

    const toggled = await service.toggle('batman');
    expect(toggled).toBeFalse();
    expect(await service.isFavorite('batman')).toBeFalse();

    await service.toggle('superman');
    expect(await service.getAll()).toEqual(['superman']);

    await service.remove('superman');
    expect(await service.getAll()).toEqual([]);
  });
});
