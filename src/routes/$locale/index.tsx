import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Timer,
  Dumbbell,
  Phone,
  Mail,
  Instagram,
  ArrowRight,
  Waves,
  Users,
  Droplets,
} from "lucide-react";
import heroAvif from "@/assets/hero.avif";
import heroAvif960 from "@/assets/hero-960.avif";
import heroWebp from "@/assets/hero.webp";
import heroWebp960 from "@/assets/hero-960.webp";
import { type Plan, type ServiceGroup } from "@/lib/studio-data";
import { studioQuery } from "@/lib/studio-query";
import { SiteHeader } from "@/components/site-header";
import { useLocale, useMessages } from "@/i18n";
import { homeMessages } from "@/i18n/messages/home";
import { buildSeo, organizationJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/$locale/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(studioQuery(context.locale));
    return { locale: context.locale };
  },
  head: ({ loaderData }) => {
    const t = homeMessages[loaderData?.locale ?? "pt"].meta;
    return buildSeo({
      title: t.title,
      description: t.description,
      ogDescription: t.ogDescription,
      path: "/",
      locale: loaderData?.locale ?? "pt",
      jsonLd: organizationJsonLd(t.description, loaderData?.locale ?? "pt"),
    });
  },
  component: Index,
});

const icons = { stopwatch: Timer, dumbbell: Dumbbell };
const serviceIcons = { openWater: Waves, group: Users, pool: Droplets };

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
            <li key={f} className="flex gap-2">
              <span className="text-gold">•</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl bg-gold px-6 py-4 text-center text-gold-foreground shadow-[var(--shadow-gold)]">
        <div className="font-display text-4xl font-bold">
          {plan.price}
          {plan.currency}
        </div>
        <div className="font-display text-sm uppercase tracking-widest">/{plan.period}</div>
      </div>
    </article>
  );
}

function ServiceCard({ group }: { group: ServiceGroup }) {
  const Icon = serviceIcons[group.icon];
  return (
    <article className="rounded-2xl bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
            <Icon className="size-7" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
              {group.title}
            </h3>
            <p className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
              {group.subtitle}
            </p>
          </div>
        </div>
        {group.duo && (
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="rounded-md bg-gold px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-gold-foreground">
              {group.duo.badge}
            </span>
            <span className="font-display text-2xl font-bold text-gold">{group.duo.discount}</span>
            <span className="max-w-[9rem] text-xs font-semibold uppercase leading-tight text-muted-foreground">
              {group.duo.note}
            </span>
          </div>
        )}
      </div>

      <ul className="mt-6 overflow-hidden rounded-xl border">
        {group.rows.map((r) => (
          <li
            key={r.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-b last:border-b-0 sm:grid-cols-[minmax(0,1fr)_7rem_9rem]"
          >
            <span className="bg-ink px-5 py-4 font-display text-sm font-semibold uppercase tracking-wide text-ink-foreground">
              {r.label}
            </span>
            <span className="px-5 py-4 text-right font-display text-xl font-bold sm:text-center">
              {r.price} €
            </span>
            <span className="hidden px-5 py-4 text-sm text-muted-foreground sm:block">
              {r.perSession ? `(${r.perSession})` : ""}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Index() {
  const locale = useLocale();
  const { data } = useSuspenseQuery(studioQuery(locale));
  const t = useMessages(homeMessages);
  const { contact } = data;
  return (
    <div className="min-h-screen">
      <div className="relative">
        <SiteHeader brand={data.brand} overlay />

        <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink">
          <picture>
            <source
              type="image/avif"
              srcSet={`${heroAvif960} 960w, ${heroAvif} 1920w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${heroWebp960} 960w, ${heroWebp} 1920w`}
              sizes="100vw"
            />
            <img
              src={heroWebp}
              alt={t.hero.imageAlt}
              width={1920}
              height={1088}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="container relative mx-auto px-6 text-ink-foreground">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[1.05] md:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg opacity-85">{data.tagline}</p>
            <a
              href="#planos"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-display uppercase tracking-wider text-gold-foreground shadow-[var(--shadow-gold)] transition hover:gap-4"
            >
              {t.hero.cta} <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </div>

      <main className="container mx-auto max-w-5xl px-6">
        <section id="planos" className="scroll-mt-10 py-20">
          <SectionTitle>{data.plansTitle}</SectionTitle>
          <div className="space-y-6">
            {data.plans.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
        </section>

        <section id="aulas-servicos" className="scroll-mt-10 pb-20">
          <SectionTitle>{data.servicesTitle}</SectionTitle>
          <div className="space-y-6">
            {data.services.map((g) => (
              <ServiceCard key={g.id} group={g} />
            ))}
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-ink text-ink-foreground">
        <div className="container mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-2">
          <Link
            to="/$locale/contact"
            params={{ locale }}
            className="group block rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <h2 className="text-3xl font-bold text-gold group-hover:underline">
              {t.contact.title}
            </h2>
            <p className="mt-3 opacity-75">{t.contact.text}</p>
          </Link>
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
            <li>
              <a
                href={`https://instagram.com/${contact.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-gold"
              >
                <Instagram className="size-5 text-gold" />
                {contact.instagram}
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
