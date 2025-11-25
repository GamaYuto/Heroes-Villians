import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../environments/environment';

export interface Character {
  id: string;
  name: string;
  aliases: string[];
  universe: string;
  affiliation: string;
  powerStats: Record<string, number>;
  powers: string[];
  weaknesses: string[];
  firstAppearance: number;
  rating: number;
  image: string;
  links?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private readonly url = 'assets/data/characters.json';
  private cache: Character[] | null = null;
  private readonly CACHE_KEY = 'hv_cache_characters_v2';

  constructor(private http: HttpClient) {}

  private loadAll(): Observable<Character[]> {
    if (this.cache) return of(this.cache);

    const source$ = environment.useRemote
      ? this.http.get<any[]>(environment.remoteUrl).pipe(map(list => this.mapRemote(list)))
      : this.http.get<Character[]>(this.url);

    return source$.pipe(
      tap(async (data) => {
        try {
          await Preferences.set({ key: this.CACHE_KEY, value: JSON.stringify(data) });
        } catch {}
      }),
      map(data => {
        this.cache = data;
        return data;
      }),
      catchError(err => {
        console.error('Error loading characters:', err);
        return from(Preferences.get({ key: this.CACHE_KEY })).pipe(
          map(res => {
            if (res.value) {
              const parsed = JSON.parse(res.value) as Character[];
              this.cache = parsed;
              return parsed;
            }
            throw err;
          })
        );
      })
    );
  }

  private mapRemote(list: any[]): Character[] {
    const toNum = (v: any) => (typeof v === 'number' ? v : Number(v) || 0);
    return (list || []).map((h: any) => {
      const ps = h.powerstats || {};
      const powerStats = {
        intelligence: toNum(ps.intelligence),
        strength: toNum(ps.strength),
        speed: toNum(ps.speed),
      } as Record<string, number>;

      const pub = (h.biography?.publisher || '').toString();
      const universe = pub.includes('Marvel') ? 'Marvel' : pub.includes('DC') ? 'DC' : pub || 'Original';
      const align = (h.biography?.alignment || '').toString().toLowerCase();
      const affiliation = align === 'good' ? 'Hero' : align === 'bad' ? 'Villain' : 'Neutral';
      const aliases: string[] = [];
      if (h.biography?.fullName && h.biography.fullName !== h.name) aliases.push(h.biography.fullName);
      if (Array.isArray(h.biography?.aliases)) aliases.push(...h.biography.aliases.filter(Boolean));

      const firstStr = (h.biography?.firstAppearance || '').toString();
      const match = firstStr.match(/(19|20)\d{2}/);
      const firstAppearance = match ? Number(match[0]) : 0;

      const statsEntries = Object.entries(powerStats).sort((a, b) => b[1] - a[1]);
      const powers = statsEntries.slice(0, 2).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));

      const ratingRaw = (powerStats['intelligence'] + powerStats['strength'] + powerStats['speed']) / 3; // 0-100
      const rating = Math.round(((ratingRaw / 20) + Number.EPSILON) * 10) / 10; // 0-5 con 1 decimal

      const image = h.images?.sm || h.images?.md || h.images?.lg || '';
      const wiki = `https://en.wikipedia.org/wiki/${encodeURIComponent(h.name)}`;

      const id: string = (h.slug || `${h.id}-${(h.name || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`).toString();

      const character: Character = {
        id,
        name: h.name,
        aliases,
        universe,
        affiliation,
        powerStats,
        powers,
        weaknesses: [],
        firstAppearance,
        rating,
        image,
        links: { wiki },
      };
      return character;
    });
  }

  getCharacters(options?: {
    page?: number;
    limit?: number;
    q?: string;
    universe?: string;
    affiliation?: string;
    power?: string;
    sort?: 'name_asc' | 'name_desc' | 'rating_asc' | 'rating_desc';
  }): Observable<{ items: Character[]; total: number }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 20;

    return this.loadAll().pipe(
      map(list => {
        let filtered = [...list];

        if (options?.q) {
          const q = options.q.toLowerCase();
          filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(q) || (c.aliases || []).some(a => a.toLowerCase().includes(q))
          );
        }

        if (options?.universe) {
          filtered = filtered.filter(c => c.universe === options.universe);
        }

        if (options?.affiliation) {
          filtered = filtered.filter(c => c.affiliation === options.affiliation);
        }

        if (options?.power) {
          const pw = options.power.toLowerCase();
          filtered = filtered.filter(c => (c.powers || []).some(p => p.toLowerCase().includes(pw)));
        }

        if (options?.sort) {
          switch (options.sort) {
            case 'name_asc':
              filtered.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name_desc':
              filtered.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case 'rating_asc':
              filtered.sort((a, b) => a.rating - b.rating);
              break;
            case 'rating_desc':
              filtered.sort((a, b) => b.rating - a.rating);
              break;
          }
        }

        const total = filtered.length;
        const start = (page - 1) * limit;
        const items = filtered.slice(start, start + limit);
        return { items, total };
      })
    );
  }

  getById(id: string): Observable<Character | undefined> {
    return this.loadAll().pipe(map(list => list.find(c => c.id === id)));
  }

  clearCache() {
    this.cache = null;
  }
}
