import { useRouteContext, useRouter, useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { isLocale, locales, type Locale } from "./config";
import { saveLocale } from "./locale";

export * from "./config";

/**
 * Declares one module's texts in every language. The Portuguese texts define the
 * shape; TypeScript then requires English and Spanish to have exactly the same keys.
 *
 *   export const homeMessages = defineMessages({ pt: { title: "Olá" }, en: { title: "Hello" }, es: { title: "Hola" } });
 */
export function defineMessages<T>(messages: { pt: T } & Record<Exclude<Locale, "pt">, T>) {
  return messages as Record<Locale, T>;
}

/** The current language: the one in the URL (/en/...), else the visitor's saved/browser language. */
export function useLocale(): Locale {
  const fromUrl = useRouterState({
    select: (s) => s.matches.find((m) => (m.params as { locale?: string }).locale)?.params,
  }) as { locale?: string } | undefined;
  const fallback = useRouteContext({ from: "__root__", select: (c) => c.locale });
  return isLocale(fromUrl?.locale) ? fromUrl.locale : fallback;
}

/** Texts of one module in the current language: `const t = useMessages(homeMessages)`. */
export function useMessages<T>(messages: Record<Locale, T>): T {
  return messages[useLocale()];
}

/** Changes the language: saves it and opens the same page under the new language's URL. */
export function useSetLocale() {
  const router = useRouter();
  return useCallback(
    async (locale: Locale) => {
      if (!locales.includes(locale)) return;
      saveLocale(locale);
      document.documentElement.lang = locale;
      const { pathname } = router.state.location;
      const { search, hash } = window.location;
      const prefixed = new RegExp(`^/(${locales.join("|")})(?=/|$)`);
      const next = prefixed.test(pathname)
        ? pathname.replace(prefixed, `/${locale}`)
        : `/${locale}`;
      router.history.push(`${next}${search}${hash}`);
    },
    [router],
  );
}
