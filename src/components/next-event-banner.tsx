import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { enGB, es, pt } from "date-fns/locale";
import { localeInfo, useLocale, useMessages, type Locale } from "@/i18n";
import { commonMessages } from "@/i18n/messages/common";
import { countryName, flagUrl, toAlpha2 } from "@/lib/country-flag";
import { getNextEvent } from "@/lib/events-api";

const dateLocales: Record<Locale, typeof pt> = { pt, en: enGB, es };
const dateFormats: Record<Locale, string> = {
  pt: "d 'de' MMMM 'de' yyyy",
  en: "d MMMM yyyy",
  es: "d 'de' MMMM 'de' yyyy",
};

type Props = {
  /** Where the book link points to. */
  bookHref?: string;
};

/** The next event's text. Renders nothing when there is no event. */
export function NextEventBanner({ bookHref = "#contacto" }: Props) {
  const locale = useLocale();
  const t = useMessages(commonMessages).nextEvent;

  // Fetched in the browser only: useQuery doesn't run during SSR without a prefetch.
  const { data: event } = useQuery({
    queryKey: ["next-event"],
    queryFn: getNextEvent,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (!event) return null;

  const alpha2 = toAlpha2(event.countryPrefix, event.countryCode);

  return (
    <p role="region" aria-label={t.region}>
      <span className="font-semibold uppercase text-promo-accent">{t.label}:</span>{" "}
      <span>
        {event.name}
        {alpha2 && <>, {countryName(alpha2, localeInfo[locale].intl)}</>}
      </span>
      {alpha2 && (
        <img
          src={flagUrl(alpha2)}
          alt=""
          width={20}
          height={15}
          className="ml-1.5 inline-block h-[0.9em] w-auto -translate-y-px align-middle"
        />
      )}
      <span className="mx-2 opacity-50">|</span>
      <span>
        {t.from}{" "}
        {format(new Date(event.date), dateFormats[locale], { locale: dateLocales[locale] })}
      </span>
      <span className="mx-2 opacity-50">|</span>
      <a
        href={bookHref}
        className="font-medium text-promo-accent underline underline-offset-2 hover:opacity-80"
      >
        {t.book}
      </a>
    </p>
  );
}
