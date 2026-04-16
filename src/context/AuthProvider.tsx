import { useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { authClient, firestoreClient } from "../lib/firebase/app";
import { AuthContext } from "./auth-context";
import type { UserSession } from "../types/user.types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authClient, (firebaseUser) => {
      const syncSession = async (currentUser: FirebaseUser | null) => {
        if (!currentUser) {
          setSession(null);
          setError(null);
          setLoading(false);
          return;
        }

        try {
          const token = await currentUser.getIdToken();
          const userRef = doc(firestoreClient, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          const profile = userSnap.exists() ? userSnap.data() : {};

          setSession({
            token,
            user: {
              id: currentUser.uid,
              email: (profile.email as string | undefined) ?? currentUser.email ?? "",
              firstname: (profile.firstname as string | undefined) ?? "",
              lastname: (profile.lastname as string | undefined) ?? "",
              avatarUrl: profile.avatarUrl as string | undefined,
            },
          });
          setError(null);
        } catch (err) {
          setSession(null);
          setError(err instanceof Error ? err.message : "Failed to build user session.");
        } finally {
          setLoading(false);
        }
      };

      void syncSession(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ session, loading, error }),
    [session, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
