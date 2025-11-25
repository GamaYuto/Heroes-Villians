import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'highlight', standalone: true })
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined, search: string | undefined): SafeHtml {
    if (!value) return '' as any;
    if (!search) return value as any;
    const re = new RegExp(`(${this.escapeRegExp(search)})`, 'gi');
    const replaced = value.replace(re, '<mark>$1</mark>');
    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }

  private escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
