import { SettingsService } from './settings.service';
import { Preferences } from '@capacitor/preferences';

describe('SettingsService', () => {
  let service: SettingsService;
  let store: Record<string, string>;

  beforeEach(() => {
    document.body.classList.remove('dark');
    (document.documentElement.style as any).fontSize = '';

    store = {};
    spyOn(Preferences, 'get').and.callFake(async ({ key }) => ({ value: store[key] ?? null }));
    spyOn(Preferences, 'set').and.callFake(async ({ key, value }) => { store[key] = value; });
    service = new SettingsService();
  });

  it('loads defaults and applies theme/font', async () => {
    const loaded = await service.load();
    expect(loaded.theme).toBe('light');
    expect(loaded.font).toBe('normal');
    expect(document.body.classList.contains('dark')).toBeFalse();
    expect(document.documentElement.style.fontSize).toBe('');
  });

  it('sets and applies dark theme and large font', async () => {
    await service.setTheme('dark');
    await service.setFont('large');
    expect(document.body.classList.contains('dark')).toBeTrue();
    expect(document.documentElement.style.fontSize).toBe('18px');
  });
});
