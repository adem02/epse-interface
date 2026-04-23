const firebaseErrorMessages: Record<string, string> = {
  // Login
  "auth/invalid-credential":        "Incorrect email or password.",
  "auth/user-not-found":            "No account found with this email.",
  "auth/wrong-password":            "Incorrect password.",
  "auth/invalid-email":             "Please enter a valid email address.",
  "auth/user-disabled":             "This account has been disabled.",
  "auth/too-many-requests":         "Too many attempts. Please wait a moment and try again.",

  // Register
  "auth/email-already-in-use":      "An account already exists with this email.",
  "auth/weak-password":             "Password must be at least 6 characters.",
  "auth/operation-not-allowed":     "This sign-in method is not enabled.",

  // Network
  "auth/network-request-failed":    "Network error. Please check your connection.",
};

const FALLBACK_ERROR = "An unexpected error occurred. Please try again.";

export const getFirebaseErrorMessage = (code: string): string => {
  return firebaseErrorMessages[code] ?? FALLBACK_ERROR;
};
