import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heroesvillanos.app',
  appName: 'Heroes y Villanos',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'cdn.jsdelivr.net',
      '*.jsdelivr.net'
    ]
  }
};

export default config;
