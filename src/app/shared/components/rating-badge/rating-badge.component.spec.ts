import { TestBed } from '@angular/core/testing';
import { RatingBadgeComponent } from './rating-badge.component';

describe('RatingBadgeComponent', () => {
  it('computes stars based on rounded rating', async () => {
    await TestBed.configureTestingModule({ imports: [RatingBadgeComponent] }).compileComponents();
    const fixture = TestBed.createComponent(RatingBadgeComponent);
    const comp = fixture.componentInstance as RatingBadgeComponent;
    comp.rating = 3.6; // rounds to 4
    expect(comp.stars.filter(Boolean).length).toBe(4);
    comp.rating = 0.2; // rounds to 0
    expect(comp.stars.filter(Boolean).length).toBe(0);
  });
});
