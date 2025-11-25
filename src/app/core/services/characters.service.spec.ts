import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharactersService, Character } from './characters.service';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../environments/environment';

describe('CharactersService', () => {
  let service: CharactersService;
  let httpMock: HttpTestingController;

  const mockChars: Character[] = [
    {
      id: 'batman',
      name: 'Batman',
      aliases: ['Bruce Wayne'],
      universe: 'DC',
      affiliation: 'Hero',
      powerStats: { intelligence: 95, strength: 30, speed: 30 },
      powers: ['Detective'],
      weaknesses: ['Human'],
      firstAppearance: 1939,
      rating: 4.7,
      image: 'bat.jpg',
      links: { wiki: 'https://wiki' }
    },
    {
      id: 'superman',
      name: 'Superman',
      aliases: ['Clark'],
      universe: 'DC',
      affiliation: 'Hero',
      powerStats: { intelligence: 85, strength: 100, speed: 100 },
      powers: ['Flight'],
      weaknesses: ['Kryptonite'],
      firstAppearance: 1938,
      rating: 4.9,
      image: 'sup.jpg',
      links: { wiki: 'https://wiki' }
    },
    {
      id: 'iron-man',
      name: 'Iron Man',
      aliases: ['Tony Stark'],
      universe: 'Marvel',
      affiliation: 'Hero',
      powerStats: { intelligence: 95, strength: 85, speed: 75 },
      powers: ['Armor'],
      weaknesses: [],
      firstAppearance: 1963,
      rating: 4.6,
      image: 'iron.jpg',
      links: { wiki: 'https://wiki' }
    }
  ];

  beforeEach(() => {
    // Force local JSON path for predictable tests
    (environment as any).useRemote = false;

    spyOn(Preferences, 'set').and.resolveTo();
    spyOn(Preferences, 'get').and.resolveTo({ value: null });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CharactersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load, filter and paginate characters', (done) => {
    service.getCharacters({ page: 1, limit: 2, q: 'man', sort: 'name_asc' }).subscribe(({ items, total }) => {
      expect(total).toBe(3);
      expect(items.length).toBe(2);
      expect(items[0].name).toBe('Batman');
      done();
    });

    const req = httpMock.expectOne('assets/data/characters.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockChars);
  });

  it('should get by id and use cache on subsequent calls', (done) => {
    // First call triggers HTTP
    service.getById('iron-man').subscribe((c) => {
      expect(c?.name).toBe('Iron Man');

      // Second call should not trigger another HTTP request
      service.getCharacters({ page: 1, limit: 10 }).subscribe(({ items, total }) => {
        expect(total).toBe(3);
        expect(items.find(i => i.id === 'iron-man')).toBeTruthy();
        httpMock.expectNone('assets/data/characters.json');
        done();
      });
    });

    const req = httpMock.expectOne('assets/data/characters.json');
    req.flush(mockChars);
  });
});
