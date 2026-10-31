import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeInfo, locales, useLocale, useMessages, useSetLocale } from "@/i18n";
import { commonMessages } from "@/i18n/messages/common";
import { flagUrl } from "@/lib/country-flag";

function Flag({ code }: { code: string }) {
  return (
    <img
      src={flagUrl(code)}
      alt=""
      width={20}
      height={15}
      className="h-[15px] w-5 rounded-[2px] object-cover"
    />
  );
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const t = useMessages(commonMessages);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t.language.choose}
        className="inline-flex items-center gap-2 rounded-lg border border-promo-accent/30 px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-promo-foreground transition-colors hover:border-promo-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-promo-accent/60"
      >
        <Globe className="size-4 text-promo-accent" />
        {locale}
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {locales.map((code) => (
          <DropdownMenuItem key={code} onSelect={() => setLocale(code)} className="gap-3">
            <Flag code={localeInfo[code].flag} />
            <span className="flex-1">{localeInfo[code].label}</span>
            {code === locale && <Check className="size-4 text-gold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
