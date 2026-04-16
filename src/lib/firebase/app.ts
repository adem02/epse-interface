import type {FirebaseApp} from "firebase/app";
import {type Firestore, getFirestore, connectFirestoreEmulator} from 'firebase/firestore'
import {type Auth, getAuth, connectAuthEmulator} from 'firebase/auth';
import {FirebaseConfig} from "./config";

export class FirebaseClientApp {
  private static instance: FirebaseClientApp;
  private readonly  app: FirebaseApp;
  private readonly firestore: Firestore
  private readonly auth: Auth

  private constructor() {
    this.app = FirebaseConfig.Initialize();
    this.firestore = getFirestore(this.app);
    this.auth = getAuth(this.app);

    if (import.meta.env.DEV) {
      connectAuthEmulator(this.auth, 'http://localhost:9099');
      connectFirestoreEmulator(this.firestore, 'localhost', 9100);
    }
  }

  static getInstance(): FirebaseClientApp {
    if (!FirebaseClientApp.instance) {
      FirebaseClientApp.instance = new FirebaseClientApp();
    }

    return FirebaseClientApp.instance;
  }

  getFbFirestore(): Firestore {
    return this.firestore;
  }

  getFbAuth(): Auth {
    return this.auth
  }
}

const clientApp = FirebaseClientApp.getInstance();
export const authClient = clientApp.getFbAuth();
export const firestoreClient = clientApp.getFbFirestore();
