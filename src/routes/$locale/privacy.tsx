import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { useLocale, useMessages } from "@/i18n";
import { legalMessages } from "@/i18n/messages/legal";
import { openCookieSettings } from "@/lib/cookie-consent";
import { buildSeo } from "@/lib/seo";
import { studioQuery } from "@/lib/studio-query";

export const Route = createFileRoute("/$locale/privacy")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(studioQuery(context.locale));
    return { locale: context.locale };
  },
  head: ({ loaderData }) => {
    const t = legalMessages[loaderData?.locale ?? "pt"].meta;
    return buildSeo({
      title: t.title,
      description: t.description,
      path: "/privacy",
      locale: loaderData?.locale ?? "pt",
    });
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const { data } = useSuspenseQuery(studioQuery(useLocale()));
  const t = useMessages(legalMessages);

  return (
    <div className="min-h-screen">
      <SiteHeader brand={data.brand} />

      <main className="container mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold md:text-5xl">{t.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t.updated}</p>
        <p className="mt-6 text-lg text-muted-foreground">{t.intro}</p>

        {t.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold">{section.heading}</h2>
            {section.body.map((p) => (
              <p key={p} className="mt-3 text-muted-foreground">
                {p}
              </p>
            ))}
            {section.list.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{t.cookies.heading}</h2>
          <p className="mt-3 text-muted-foreground">{t.cookies.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t.cookies.columns.name}</th>
                  <th className="px-4 py-3 font-semibold">{t.cookies.columns.purpose}</th>
                  <th className="px-4 py-3 font-semibold">{t.cookies.columns.duration}</th>
                </tr>
              </thead>
              <tbody>
                {t.cookies.rows.map((row) => (
                  <tr key={row.name} className="border-t align-top">
                    <td className="px-4 py-3 font-mono text-xs">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={openCookieSettings}
            className="mt-4 cursor-pointer text-sm font-medium text-gold underline underline-offset-2"
          >
            {t.cookies.manage}
          </button>
        </section>
      </main>
    </div>
  );
}
