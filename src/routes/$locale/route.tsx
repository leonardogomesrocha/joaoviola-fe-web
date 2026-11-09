import { createFileRoute, notFound, Outlet, redirect } from "@tanstack/react-router";
import { isLocale } from "@/i18n/config";
import { getLocale } from "@/i18n/locale";

/** Old, unprefixed page URLs (/contact) that now live under a language (/pt/contact). */
const legacyPages = new Set(["contact", "private-lessons"]);

/**
 * Every page lives under its language: /pt, /en, /es (and /en/contact, ...).
 * The language comes from the URL, so each translation has its own indexable address.
 */
export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      if (legacyPages.has(params.locale)) {
        throw redirect({ href: `/${getLocale()}/${params.locale}`, statusCode: 301 });
      }
      throw notFound();
    }
    return { locale: params.locale };
  },
  component: Outlet,
});
