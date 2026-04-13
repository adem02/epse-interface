export async function authenticateUser(fd: FormData): Promise<void> {
  const email = fd.get("email") as string;
  const password = fd.get("password") as string;
}
