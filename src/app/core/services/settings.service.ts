import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface AppSettings {
  theme: 'light' | 'dark';
  font: 'normal' | 'large';
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly THEME_KEY = 'hv_theme_v1';
  private readonly FONT_KEY = 'hv_font_v1';

  async load(): Promise<AppSettings> {
    const [t, f] = await Promise.all([
      Preferences.get({ key: this.THEME_KEY }),
      Preferences.get({ key: this.FONT_KEY }),
    ]);
    
    // Si no hay tema guardado, usar preferencia del sistema
    let theme: 'light' | 'dark' = 'light';
    if (t.value) {
      theme = t.value === 'dark' ? 'dark' : 'light';
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    
    const font = (f.value as any) === 'large' ? 'large' : 'normal';
    this.applyTheme(theme);
    this.applyFont(font);
    return { theme, font };
  }

  async setTheme(theme: 'light' | 'dark') {
    await Preferences.set({ key: this.THEME_KEY, value: theme });
    this.applyTheme(theme);
  }

  async setFont(font: 'normal' | 'large') {
    await Preferences.set({ key: this.FONT_KEY, value: font });
    this.applyFont(font);
  }

  private applyTheme(theme: 'light' | 'dark') {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('ion-palette-dark');
    } else {
      html.classList.remove('ion-palette-dark');
    }
  }

  private applyFont(font: 'normal' | 'large') {
    document.body.classList.toggle('large-text', font === 'large');
    document.documentElement.style.fontSize = font === 'large' ? '18px' : '16px';
  }
}
