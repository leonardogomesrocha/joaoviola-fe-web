import { ChevronRight, Lightbulb, MessageCircle, User, Video, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { useMessages } from "@/i18n";
import { privateLessonsMessages } from "@/i18n/messages/private-lessons";

/**
 * Photos for the 2x2 grid, in the same order as the tile labels.
 * To use real photos: put them in src/assets/private-lessons/ and import them here, e.g.
 *   import session from "@/assets/private-lessons/session.jpg";
 *   const photos = [session, video, tips, feedback];
 * Tiles without a photo show a pool-blue placeholder with an icon.
 */
const photos: (string | undefined)[] = [undefined, undefined, undefined, undefined];
const fallbackIcons: LucideIcon[] = [User, Video, Lightbulb, MessageCircle];

function QuoteMark() {
  return (
    <svg viewBox="0 0 40 32" aria-hidden className="h-9 w-11 fill-gold">
      <path d="M0 18C0 8 6 1.5 15 0l1.5 4C11 6 8.5 9.5 8.5 14H16v18H0V18Zm22 0C22 8 28 1.5 37 0l1.5 4C33 6 30.5 9.5 30.5 14H38v18H22V18Z" />
    </svg>
  );
}

function PhotoTile({ label, photo, Icon }: { label: string; photo?: string; Icon: LucideIcon }) {
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-pool">
      {photo ? (
        <img
          src={photo}
          alt={label}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[image:var(--gradient-pool)]">
          <Icon className="size-12 text-white/70" strokeWidth={1.5} />
        </div>
      )}
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-gold px-3.5 py-1.5 text-xs font-semibold text-gold-foreground shadow-md md:text-sm">
        {label}
      </figcaption>
    </figure>
  );
}

export function OfferSection() {
  const t = useMessages(privateLessonsMessages).offer;

  return (
    <section className="py-20">
      <SectionLabel number={1}>{t.label}</SectionLabel>

      <div className="mt-10">
        <QuoteMark />
        <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold uppercase sm:text-4xl leading-[1.05] md:text-6xl">
          {t.headline}
          <span className="block text-gold">{t.highlight}</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-lg font-semibold leading-relaxed">{t.lead}</p>
          {t.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {t.lists.map((list) => (
              <div key={list.title}>
                <h3 className="font-display text-xl font-semibold">{list.title}</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {list.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight className="size-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 content-start gap-4">
          {t.tiles.map((label, i) => (
            <PhotoTile key={label} label={label} photo={photos[i]} Icon={fallbackIcons[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
