import { createContext } from "react";
import type { AuthState } from "../types/user.types";

export type AuthContextValue = AuthState;

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  loading: true,
  error: null,
});
