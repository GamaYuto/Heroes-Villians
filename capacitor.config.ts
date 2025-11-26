import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heroesvillanos.app',
  appName: 'Heroes y Villanos',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    hostname: 'localhost',
    allowNavigation: ['*']
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
