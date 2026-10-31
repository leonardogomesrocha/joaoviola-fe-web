import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { countryName, flagUrl, toAlpha2 } from "@/lib/country-flag";
import { getNextEvent } from "@/lib/events-api";

type Props = {
  /** Where "Reservar" points to. */
  bookHref?: string;
};

export function NextEventBanner({ bookHref = "/#contacto" }: Props) {
  // Fetched in the browser only: useQuery doesn't run during SSR without a prefetch.
  const { data: event } = useQuery({
    queryKey: ["next-event"],
    queryFn: getNextEvent,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (!event) return null;

  const alpha2 = toAlpha2(event.countryPrefix, event.countryCode);
  const date = new Date(event.date);

  return (
    <div
      role="region"
      aria-label="Próximo evento"
      className="bg-promo px-4 py-2.5 text-center text-sm text-promo-foreground md:text-base"
    >
      <span className="font-semibold uppercase">Próximo evento:</span>{" "}
      <span>
        {event.name}
        {alpha2 && <>, {countryName(alpha2)}</>}
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
      <span className="mx-2">|</span>
      <span>A partir de {format(date, "d 'de' MMMM 'de' yyyy", { locale: pt })}</span>
      <span className="mx-2">|</span>
      <a href={bookHref} className="font-medium underline underline-offset-2 hover:opacity-80">
        Reservar
      </a>
    </div>
  );
}
