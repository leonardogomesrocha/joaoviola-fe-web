import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { locales, type Locale } from "./config";
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

/** The current language, from the root route context. */
export function useLocale(): Locale {
  return useRouteContext({ from: "__root__", select: (c) => c.locale });
}

/** Texts of one module in the current language: `const t = useMessages(homeMessages)`. */
export function useMessages<T>(messages: Record<Locale, T>): T {
  return messages[useLocale()];
}

/** Changes the language: saves it and reloads the route data in the new language. */
export function useSetLocale() {
  const router = useRouter();
  return useCallback(
    async (locale: Locale) => {
      if (!locales.includes(locale)) return;
      saveLocale(locale);
      document.documentElement.lang = locale;
      await router.invalidate();
    },
    [router],
  );
}
