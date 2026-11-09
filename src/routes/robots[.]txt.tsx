import { createFileRoute } from "@tanstack/react-router";
import { getSiteUrl } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }: { request: Request }) => {
        const origin = getSiteUrl(new URL(request.url).origin)!;
        const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
        return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
      },
    },
  },
});
