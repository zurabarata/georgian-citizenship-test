import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.georgiancitizenship.test',
  appName: 'Georgian Citizenship Test',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
