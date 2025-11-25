import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly KEY = 'hv_favorites_v1';
  private favSet = new Set<string>();
  private initialized = false;

  private async init() {
    if (this.initialized) return;
    try {
      const res = await Preferences.get({ key: this.KEY });
      if (res.value) {
        const arr = JSON.parse(res.value) as string[];
        arr.forEach((id) => this.favSet.add(id));
      }
    } catch (e) {
      console.warn('Favorites init failed', e);
    }
    this.initialized = true;
  }

  async getAll(): Promise<string[]> {
    await this.init();
    return Array.from(this.favSet);
  }

  async isFavorite(id: string): Promise<boolean> {
    await this.init();
    return this.favSet.has(id);
  }

  async add(id: string): Promise<void> {
    await this.init();
    this.favSet.add(id);
    await this.persist();
  }

  async remove(id: string): Promise<void> {
    await this.init();
    this.favSet.delete(id);
    await this.persist();
  }

  async toggle(id: string): Promise<boolean> {
    await this.init();
    if (this.favSet.has(id)) this.favSet.delete(id);
    else this.favSet.add(id);
    await this.persist();
    return this.favSet.has(id);
  }

  private async persist() {
    try {
      await Preferences.set({ key: this.KEY, value: JSON.stringify(Array.from(this.favSet)) });
    } catch (e) {
      console.warn('Favorites persist failed', e);
    }
  }
}
