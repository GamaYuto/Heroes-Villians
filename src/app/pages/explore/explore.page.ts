import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CharacterCardComponent } from '../../shared/components/character-card/character-card.component';
import { CharactersService, Character } from '../../core/services/characters.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, IonicModule, CharacterCardComponent, EmptyStateComponent],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss']
})
export class ExplorePage implements OnInit {
  characters: Character[] = [];
  total = 0;
  loading = false;
  loadingMore = false;
  q = '';
  universe?: string;
  affiliation?: string;
  sort?: 'name_asc' | 'name_desc' | 'rating_asc' | 'rating_desc';
  universes: string[] = [];
  affiliations: string[] = [];
  page = 1;
  limit = 30;
  canLoadMore = true;
  private searchTimeout: any;

  constructor(private cs: CharactersService) {}

  ngOnInit(): void {
    this.load();
    this.loadFacets();
  }

  load(q?: string, append = false) {
    if (append) this.loadingMore = true; else this.loading = true;
    this.cs.getCharacters({ page: this.page, limit: this.limit, q: q, universe: this.universe, affiliation: this.affiliation, sort: this.sort }).subscribe({
      next: res => {
        if (append) this.characters = [...this.characters, ...res.items];
        else this.characters = res.items;
        this.total = res.total;
        this.canLoadMore = this.characters.length < this.total;
        this.loading = false;
        this.loadingMore = false;
      },
      error: () => { this.loading = false; this.loadingMore = false; }
    });
  }

  async loadFacets() {
    this.cs.getCharacters({ limit: 1000 }).subscribe(res => {
      const items = res.items;
      this.universes = Array.from(new Set(items.map(i => i.universe))).filter(Boolean);
      this.affiliations = Array.from(new Set(items.map(i => i.affiliation))).filter(Boolean);
    });
  }

  onSearch(event: any) {
    const val = event.detail?.value?.trim() ?? '';
    this.q = val;
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.resetAndLoad(), 350);
  }

  onFilterChange() {
    this.resetAndLoad();
  }

  onSegmentChange(ev: any) {
    // ensure affiliation is string (SegmentValue may be number)
    const v = ev?.detail?.value;
    this.affiliation = v ? String(v) : undefined;
    this.onFilterChange();
  }

  setUniverse(ev: any) {
    const v = ev?.detail?.value;
    this.universe = v ? String(v) : undefined;
    this.onFilterChange();
  }

  setSort(ev: any) {
    const v = ev?.detail?.value;
    this.sort = v ? v : undefined;
    this.onFilterChange();
  }

  resetAndLoad() {
    this.page = 1;
    this.characters = [];
    this.canLoadMore = true;
    this.load(this.q, false);
  }

  loadMore(ev: any) {
    if (!this.canLoadMore || this.loadingMore) {
      ev?.target?.complete?.();
      return;
    }
    this.page += 1;
    this.load(this.q, true);
    setTimeout(() => ev?.target?.complete?.(), 400);
  }

  doRefresh(ev: any) {
    this.cs.clearCache();
    this.resetAndLoad();
    setTimeout(() => ev?.target?.complete?.(), 600);
  }
}
