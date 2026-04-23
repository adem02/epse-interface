import type { RegisterData } from "../core/models";
import {AuthClient} from "../lib/firebase/auth.ts";

export async function authenticateUser(_: string|void, fd: FormData): Promise<string|void> {
  const mode: string = fd.get('mode') as string
  const email: string = fd.get('email') as string;
  const password: string = fd.get('password') as string;

  if (mode === 'register') {
    const firstname: string = fd.get('firstname') as string;
    const lastname: string = fd.get('lastname') as string;

    const data: RegisterData = {
      firstname,
      lastname,
      email,
      password,
    }

    try {
      await AuthClient.register(data);
    } catch (e) {
      return e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.';
    }

  } else {
    try {
      await AuthClient.login(email, password);
    } catch (e) {
      return e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.';
    }
  }
}
