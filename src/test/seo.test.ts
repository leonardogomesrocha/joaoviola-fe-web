import { describe, expect, it } from "vitest";
import { buildSeo } from "@/lib/seo";
import { buildSitemap } from "@/routes/sitemap[.]xml";

describe("seo", () => {
  it("lists every page in every language, each with its hreflang alternates", () => {
    const xml = buildSitemap("https://example.com", "2026-01-01");
    expect(xml.match(/<url>/g)).toHaveLength(12);
    expect(xml).toContain("<loc>https://example.com/en/contact</loc>");
    expect(xml).toContain('hreflang="es" href="https://example.com/es/private-lessons"');
    expect(xml).toContain('hreflang="x-default" href="https://example.com/pt"');
  });

  it("marks the page language and alternates in the meta tags", () => {
    const { meta } = buildSeo({ title: "T", description: "D", path: "/contact", locale: "en" });
    expect(meta).toContainEqual({ property: "og:locale", content: "en_GB" });
    expect(meta).toContainEqual({ property: "og:locale:alternate", content: "pt_PT" });
  });
});
