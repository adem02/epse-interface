export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  avatarUrl?: string;
}

export interface UserSession {
  user: User;
  token: string;
}

export interface AuthState {
  session: UserSession | null;
  loading: boolean;
  error: string | null;
}
