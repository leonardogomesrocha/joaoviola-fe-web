import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Mail, Phone, Waves } from "lucide-react";
import { NextEventBanner } from "@/components/next-event-banner";
import { SiteHeader } from "@/components/site-header";
import { getStudioData } from "@/lib/studio-data";

const studioQuery = queryOptions({ queryKey: ["studio"], queryFn: getStudioData });

export const Route = createFileRoute("/private-lessons")({
  head: () => ({
    meta: [
      { title: "Aulas Particulares — Grupo Viola" },
      {
        name: "description",
        content:
          "Aulas particulares de natação em piscina e águas abertas com o treinador João Viola.",
      },
      { property: "og:title", content: "Aulas Particulares — Grupo Viola" },
      {
        property: "og:description",
        content: "Aulas particulares de natação em piscina e águas abertas.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(studioQuery),
  component: PrivateLessons,
});

function PrivateLessons() {
  const { data } = useSuspenseQuery(studioQuery);
  const { privateLessons: lessons, contact } = data;

  return (
    <div className="min-h-screen">
      <NextEventBanner bookHref="#contacto" />
      <SiteHeader brand={data.brand} />

      <section className="bg-ink text-ink-foreground">
        <div className="container mx-auto max-w-5xl px-6 py-20">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">
            {lessons.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[1.05] md:text-6xl">
            {lessons.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">{lessons.intro}</p>
        </div>
      </section>

      <main className="container mx-auto max-w-5xl px-6">
        <section className="py-20">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-gold" />
            <h2 className="text-3xl font-bold md:text-4xl">O que inclui</h2>
            <span className="h-px flex-1 bg-gold" />
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {lessons.features.map((feature) => (
              <li key={feature} className="flex items-start gap-4 rounded-xl bg-card p-5">
                <Waves className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-20">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-gold" />
            <h2 className="text-3xl font-bold md:text-4xl">Condições</h2>
            <span className="h-px flex-1 bg-gold" />
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {data.conditions.map((c, i) => (
              <li key={i} className="flex gap-4 rounded-xl border p-5">
                <span className="font-display text-2xl font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contacto" className="bg-ink text-ink-foreground">
        <div className="container mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gold">Marca a tua aula</h2>
            <p className="mt-3 opacity-75">Fala connosco para combinar horário e local.</p>
          </div>
          <ul className="space-y-4 text-lg">
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 hover:text-gold"
              >
                <Phone className="size-5 text-gold" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 hover:text-gold"
              >
                <Mail className="size-5 text-gold" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-ink-foreground/10 py-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} {data.brand}
        </div>
      </footer>
    </div>
  );
}
