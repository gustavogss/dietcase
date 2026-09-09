export const PROFILE_STORAGE_KEY = "dietcase-user-profile";

export const SENSITIVE_PROFILE_FIELDS = [
  "email",
  "avatarUrl",
  "weight",
  "height",
  "imc",
  "trialStartDate",
  "trialExpiresAt",
] as const;

export function sanitizeUserProfileForStorage<
  T extends Record<string, unknown>,
>(profile: T | null | undefined): Partial<T> {
  if (!profile || typeof profile !== "object") {
    return {};
  }

  const sanitized = { ...profile } as Record<string, unknown>;

  for (const field of SENSITIVE_PROFILE_FIELDS) {
    delete sanitized[field];
  }

  return sanitized as Partial<T>;
}

export function readStoredUserProfile<
  T extends Record<string, unknown>,
>(): T | null {
  const raw = sessionStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as T;
    return sanitizeUserProfileForStorage(parsed) as T;
  } catch {
    return null;
  }
}

export function persistUserProfile<T extends Record<string, unknown>>(
  profile: T,
): void {
  sessionStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(sanitizeUserProfileForStorage(profile)),
  );
}
