// Central SEO helpers. Set VITE_SITE_URL (e.g. https://coachviola.com) in the build
// environment so canonical URLs, hreflang links, og:url and the sitemap use the production domain.

import { defaultLocale, localePath, locales, type Locale } from "@/i18n/config";

export const SITE_NAME = "Coach Viola";

/** Public pages (path inside a language; "" is the home page). Used by the sitemap. */
export const sitePages = [
  { path: "", changefreq: "weekly", priority: 1.0 },
  { path: "/private-lessons", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "yearly", priority: 0.6 },
] as const;

export function getSiteUrl(fallbackOrigin?: string): string | undefined {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined) || fallbackOrigin;
  return raw?.replace(/\/$/, "");
}

/** Public origin of a request, honouring the proxy's X-Forwarded-* headers (so https stays https). */
export function requestOrigin(request: Request): string {
  const url = new URL(request.url);
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || url.protocol.slice(0, -1);
  const host =
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ||
    request.headers.get("host") ||
    url.host;
  return `${proto}://${host}`;
}

const ogLocale: Record<Locale, string> = { pt: "pt_PT", en: "en_GB", es: "es_ES" };

/** Every language version of a page, plus x-default (the default language), as absolute URLs. */
export function alternates(site: string, path: string) {
  return [
    ...locales.map((l) => ({ hreflang: l as string, href: `${site}${localePath(l, path)}` })),
    { hreflang: "x-default", href: `${site}${localePath(defaultLocale, path)}` },
  ];
}

type SeoInput = {
  title: string;
  description: string;
  ogDescription?: string;
  /** Page path inside a language: "/" (home), "/contact", ... */
  path: string;
  locale: Locale;
  jsonLd?: Record<string, unknown>;
};

/** Builds the `head()` result (meta, links, JSON-LD) for a page. */
export function buildSeo({ title, description, ogDescription, path, locale, jsonLd }: SeoInput) {
  const site = getSiteUrl();
  const url = site ? `${site}${localePath(locale, path)}` : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: ogDescription ?? description },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: ogLocale[locale] },
      ...locales
        .filter((l) => l !== locale)
        .map((l) => ({ property: "og:locale:alternate", content: ogLocale[l] })),
      ...(url ? [{ property: "og:url", content: url }] : []),
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: ogDescription ?? description },
      ...(jsonLd ? [{ "script:ld+json": jsonLd }] : []),
    ],
    links: site
      ? [
          { rel: "canonical", href: url! },
          ...alternates(site, path).map((a) => ({ rel: "alternate", ...a })),
        ]
      : [],
  };
}

/** Site-wide structured data: the coach as a person/business. */
export function organizationJsonLd(description: string, locale: Locale) {
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description,
    inLanguage: locale,
    employee: { "@type": "Person", name: "João Viola", jobTitle: "Swimming & triathlon coach" },
    ...(site ? { url: `${site}${localePath(locale)}` } : {}),
  };
}
