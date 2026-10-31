import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookie, matchLocale, type Locale } from "./config";

/**
 * The visitor's language: the saved cookie, otherwise the browser's language,
 * otherwise Portuguese. Works on the server (first render) and in the browser.
 */
export const getLocale = createIsomorphicFn()
  .server((): Locale => {
    const saved = getCookie(localeCookie);
    if (isLocale(saved)) return saved;
    return matchLocale(getRequestHeader("accept-language")) ?? defaultLocale;
  })
  .client((): Locale => {
    const saved = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${localeCookie}=`))
      ?.split("=")[1];
    if (isLocale(saved)) return saved;
    return matchLocale(navigator.languages.join(",")) ?? defaultLocale;
  });

export function saveLocale(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
