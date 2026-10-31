import { SectionLabel } from "@/components/section-label";
import { useMessages } from "@/i18n";
import { privateLessonsMessages } from "@/i18n/messages/private-lessons";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Student testimonials. Texts live in src/i18n/messages/private-lessons.ts (testimonials.items). */
export function TestimonialsSection() {
  const t = useMessages(privateLessonsMessages).testimonials;

  if (t.items.length === 0) return null;

  return (
    <section className="pb-20">
      <SectionLabel number={2}>{t.label}</SectionLabel>
      <h2 className="mt-6 font-display text-3xl font-bold uppercase md:text-4xl">{t.title}</h2>

      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {t.items.map((item, i) => (
          <li key={i} className="relative flex flex-col rounded-2xl bg-card p-7">
            {item.placeholder && (
              <span className="absolute right-4 top-4 rounded-full border border-dashed border-gold px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
                {t.exampleBadge}
              </span>
            )}
            <span aria-hidden className="font-display text-6xl leading-none text-gold">
              “
            </span>
            <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-foreground/85">
              {item.text}
            </blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-gold">
                {initials(item.name)}
              </span>
              <div>
                <div className="font-semibold">{item.name}</div>
                {item.role && <div className="text-sm text-muted-foreground">{item.role}</div>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
