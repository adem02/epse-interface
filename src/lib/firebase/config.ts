import type {FirebaseApp, FirebaseOptions} from 'firebase/app';
import { getApp, getApps, initializeApp } from 'firebase/app';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as FirebaseOptions

export class FirebaseConfig {
  static Initialize(): FirebaseApp {
    if (getApps().length > 0) {
      return getApp();
    }

    return initializeApp(config);
  }
}
