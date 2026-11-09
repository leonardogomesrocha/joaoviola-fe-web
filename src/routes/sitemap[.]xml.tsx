import { createFileRoute } from "@tanstack/react-router";
import { localePath, locales } from "@/i18n/config";
import { alternates, getSiteUrl, sitePages } from "@/lib/seo";

/** One <url> per page and language, each listing all its translations (hreflang). */
export function buildSitemap(origin: string, lastmod: string) {
  const urls = sitePages.flatMap((page) => {
    const links = alternates(origin, page.path)
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
      .join("\n");
    return locales.map(
      (locale) =>
        `  <url>\n    <loc>${origin}${localePath(locale, page.path)}</loc>\n${links}\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
    );
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const origin = getSiteUrl(new URL(request.url).origin)!;
        const xml = buildSitemap(origin, new Date().toISOString().slice(0, 10));
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
