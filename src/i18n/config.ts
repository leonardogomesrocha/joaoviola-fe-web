// Languages the site supports. To add one: add it here, then add its texts to
// every file in src/i18n/messages (TypeScript flags any file that is missing it).

export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

/** Cookie that remembers the visitor's language (read on the server too, so pages render in it). */
export const localeCookie = "lang";

export const localeInfo: Record<Locale, { label: string; flag: string; intl: string }> = {
  pt: { label: "Português", flag: "PT", intl: "pt-PT" },
  en: { label: "English", flag: "GB", intl: "en-GB" },
  es: { label: "Español", flag: "ES", intl: "es-ES" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Picks the best supported language from an Accept-Language header ("es-ES,es;q=0.9,en;q=0.8"). */
export function matchLocale(acceptLanguage: string | null | undefined): Locale | undefined {
  if (!acceptLanguage) return undefined;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map((r) => r.lang).find(isLocale);
}
