import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Timer, Dumbbell, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { getStudioData, type Plan } from "@/lib/studio-data";

const studioQuery = queryOptions({ queryKey: ["studio"], queryFn: getStudioData });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo Viola — Planos de Treino Online" },
      { name: "description", content: "Planos de treino de natação, triatlo, Ironman e musculação online com o treinador João Viola." },
      { property: "og:title", content: "Grupo Viola — Planos de Treino Online" },
      { property: "og:description", content: "Natação, triatlo, Ironman e musculação com acompanhamento personalizado." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(studioQuery),
  component: Index,
});

const icons = { stopwatch: Timer, dumbbell: Dumbbell };

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="h-px flex-1 bg-gold" />
      <h2 className="text-3xl font-bold md:text-4xl">{children}</h2>
      <span className="h-px flex-1 bg-gold" />
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = icons[plan.icon];
  return (
    <article className="flex flex-col gap-6 rounded-2xl bg-card p-8 transition-transform hover:-translate-y-1 md:flex-row md:items-center">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
        <Icon className="size-8" />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold">{plan.title}</h3>
        <ul className="mt-3 space-y-1.5 text-muted-foreground">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2"><span className="text-gold">•</span>{f}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-gold px-6 py-4 text-center text-gold-foreground shadow-[var(--shadow-gold)]">
        <div className="font-display text-4xl font-bold">{plan.price}{plan.currency}</div>
        <div className="font-display text-sm uppercase tracking-widest">/{plan.period}</div>
      </div>
    </article>
  );
}

function Index() {
  const { data } = useSuspenseQuery(studioQuery);
  const { contact } = data;
  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-10">
        <nav className="container mx-auto flex items-center justify-between px-6 py-5 text-ink-foreground">
          <span className="font-display text-xl font-bold uppercase tracking-wider">{data.brand}</span>
          <div className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
            <a href="#planos" className="hover:text-gold">Planos</a>
            <a href="#condicoes" className="hover:text-gold">Condições</a>
            <a href="#contacto" className="hover:text-gold">Contacto</a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
        <img src={hero} alt="Nadador em águas abertas ao pôr do sol" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative mx-auto px-6 text-ink-foreground">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Natação · Triatlo · Ironman</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[1.05] md:text-7xl">Treina com propósito. Nada com confiança.</h1>
          <p className="mt-6 max-w-lg text-lg opacity-85">{data.tagline}</p>
          <a href="#planos" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-display uppercase tracking-wider text-gold-foreground shadow-[var(--shadow-gold)] transition hover:gap-4">
            Ver planos <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <main className="container mx-auto max-w-5xl px-6">
        <section id="planos" className="scroll-mt-10 py-20">
          <SectionTitle>{data.plansTitle}</SectionTitle>
          <div className="space-y-6">
            {data.plans.map((p) => <PlanCard key={p.id} plan={p} />)}
          </div>
        </section>

        <section id="condicoes" className="scroll-mt-10 pb-20">
          <SectionTitle>Condições</SectionTitle>
          <ul className="grid gap-4 md:grid-cols-2">
            {data.conditions.map((c, i) => (
              <li key={i} className="flex gap-4 rounded-xl border p-5">
                <span className="font-display text-2xl font-bold text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contacto" className="bg-ink text-ink-foreground">
        <div className="container mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-gold">Contacto</h2>
            <p className="mt-3 opacity-75">Fala connosco para começares o teu plano.</p>
          </div>
          <ul className="space-y-4 text-lg">
            <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold"><Phone className="size-5 text-gold" />{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-gold"><Mail className="size-5 text-gold" />{contact.email}</a></li>
            <li><a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold"><Instagram className="size-5 text-gold" />{contact.instagram}</a></li>
          </ul>
        </div>
        <div className="border-t border-ink-foreground/10 py-6 text-center text-sm opacity-60">© {new Date().getFullYear()} {data.brand}</div>
      </footer>
    </div>
  );
}