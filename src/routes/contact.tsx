import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowUpRight, Mail } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { SiteHeader } from "@/components/site-header";
import { useLocale, useMessages } from "@/i18n";
import { contactMessages } from "@/i18n/messages/contact";
import { studioQuery } from "@/lib/studio-query";

export const Route = createFileRoute("/contact")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(studioQuery(context.locale));
    return { locale: context.locale };
  },
  head: ({ loaderData }) => {
    const t = contactMessages[loaderData?.locale ?? "pt"].meta;
    return {
      meta: [
        { title: t.title },
        { name: "description", content: t.description },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.description },
      ],
    };
  },
  component: ContactPage,
});

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 32" aria-hidden className="h-9 w-11 fill-gold">
      <path d="M0 18C0 8 6 1.5 15 0l1.5 4C11 6 8.5 9.5 8.5 14H16v18H0V18Zm22 0C22 8 28 1.5 37 0l1.5 4C33 6 30.5 9.5 30.5 14H38v18H22V18Z" />
    </svg>
  );
}

type ChannelProps = {
  /** Builds the link only in the browser, so the number/handle/e-mail never appear in the page's HTML. */
  getHref: () => string;
  icon: ReactNode;
  iconClass: string;
  title: string;
  text: string;
  external?: boolean;
};

function Channel({ getHref, icon, iconClass, title, text, external = true }: ChannelProps) {
  const [href, setHref] = useState<string>();
  useEffect(() => setHref(getHref()), [getHref]);

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl bg-card p-5 transition-transform hover:-translate-y-0.5"
    >
      <span
        className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-md ${iconClass}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold group-hover:text-gold">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
    </a>
  );
}

function ContactPage() {
  const { data } = useSuspenseQuery(studioQuery(useLocale()));
  const t = useMessages(contactMessages);
  const { contact } = data;

  const whatsappHref = useCallback(() => `https://wa.me/${contact.whatsapp}`, [contact.whatsapp]);
  const instagramHref = useCallback(
    () => `https://instagram.com/${contact.instagram}`,
    [contact.instagram],
  );
  const emailHref = useCallback(() => `mailto:${contact.email}`, [contact.email]);

  return (
    <div className="min-h-screen">
      <SiteHeader brand={data.brand} />

      <main className="container mx-auto max-w-6xl px-6 py-16 md:py-20">
        <section aria-label={t.channelsTitle} className="grid gap-4 md:grid-cols-3">
          <Channel
            getHref={whatsappHref}
            icon={<WhatsAppIcon className="size-8" />}
            iconClass="bg-[#25D366]"
            title={t.whatsapp.title}
            text={t.whatsapp.text}
          />
          <Channel
            getHref={instagramHref}
            icon={<InstagramIcon className="size-7" />}
            iconClass="bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_25%,#D62976_50%,#962FBF_75%,#4F5BD5_100%)]"
            title={t.instagram.title}
            text={t.instagram.text}
          />
          <Channel
            getHref={emailHref}
            icon={<Mail className="size-7" />}
            iconClass="bg-gold"
            title={t.email.title}
            text={t.email.text}
            external={false}
          />
        </section>

        <div className="mt-16">
          <QuoteMark />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl md:text-6xl">
            {t.headline}
            <span className="block text-gold">{t.highlight}</span>
          </h1>
        </div>

        <div className="relative mt-12 grid items-start gap-12 lg:grid-cols-[3fr_2fr]">
          <ContactForm />
          <img
            src={hero}
            alt={t.imageAlt}
            width={1920}
            height={1088}
            className="hidden aspect-[4/5] w-full rounded-2xl rounded-br-[3rem] object-cover lg:block"
          />
        </div>
      </main>

      <footer className="bg-ink text-ink-foreground">
        <div className="border-t border-ink-foreground/10 py-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} {data.brand}
        </div>
      </footer>
    </div>
  );
}
