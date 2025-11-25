import { TestBed } from '@angular/core/testing';
import { HighlightPipe } from './highlight.pipe';
import { DomSanitizer, SecurityContext } from '@angular/platform-browser';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new HighlightPipe(sanitizer);
  });

  it('returns original when no search', () => {
    const res = pipe.transform('Batman', undefined);
    const html = sanitizer.sanitize(SecurityContext.HTML, res) as string;
    expect(html).toBe('Batman');
  });

  it('wraps matches with mark and escapes regex chars', () => {
    const res = pipe.transform('Wonder Woman (Amazon)', 'on.');
    const html = sanitizer.sanitize(SecurityContext.HTML, res) as string;
    // Should not treat '.' as wildcard due to escaping
    expect(html).toContain('Wonder Woman (Amazon)');
    const res2 = pipe.transform('Spider-Man', 'man');
    const html2 = sanitizer.sanitize(SecurityContext.HTML, res2) as string;
    expect(html2).toBe('Spider-<mark>Man</mark>');
  });
});
