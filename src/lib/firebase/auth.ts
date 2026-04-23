import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authClient, firestoreClient } from "./app";
import type { RegisterData } from "../../core/models";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "../../core/utils";

export class AuthClient {
  static async register(data: RegisterData): Promise<string | null> {
    return createUserWithEmailAndPassword(authClient, data.email, data.password)
      .then( async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(firestoreClient, 'users', user.uid);
        await setDoc(docRef, {
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
        });

        return null;
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.log('Error registering user:', error.code, error.message);
        }

        return getFirebaseErrorMessage(error.code);
      });
  }

  static async login(email: string, password: string): Promise<string | null> {
    return signInWithEmailAndPassword(authClient, email, password)
      .then( async (userCredential) => {
        const user = userCredential.user;
        const userDoc = await getDoc(doc(firestoreClient, 'users', user.uid));

        if (!userDoc.exists()) {
          throw new Error('User data not found in Firestore');
        }

        return null;
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error('Error logging in user:', error.code, error.message);
        }

        return getFirebaseErrorMessage(error.code);
      });
  }

  static async logout(): Promise<string | null> {
    return signOut(authClient)
      .then(() => null)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (import.meta.env.DEV) {
          console.error('Error logging out user:', errorCode, errorMessage);
        }

        return errorMessage;
      });
  }
}
