// Remembers the visitor's cookie choice. The site only sets essential cookies today
// (language, this choice, Cloudflare Turnstile on the contact form). When you add analytics or
// marketing scripts, load them only if `hasConsent()` is true — see src/i18n/README.md.

export type ConsentChoice = "all" | "essential";

const COOKIE = "cookie_consent";
const OPEN_EVENT = "cookie-consent:open";
const SIX_MONTHS = 60 * 60 * 24 * 180;

export function getConsent(): ConsentChoice | undefined {
  if (typeof document === "undefined") return undefined;
  const value = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.split("=")[1];
  return value === "all" || value === "essential" ? value : undefined;
}

export function saveConsent(choice: ConsentChoice) {
  document.cookie = `${COOKIE}=${choice}; path=/; max-age=${SIX_MONTHS}; samesite=lax`;
}

/** True when the visitor accepted optional cookies (analytics, marketing). */
export function hasConsent(): boolean {
  return getConsent() === "all";
}

/** Re-opens the cookie banner (used by the "Cookie settings" links). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export const cookieSettingsEvent = OPEN_EVENT;
