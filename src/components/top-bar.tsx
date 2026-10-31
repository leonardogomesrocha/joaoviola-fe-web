import { LanguageSwitcher } from "./language-switcher";
import { NextEventBanner } from "./next-event-banner";

/** Navy bar at the top of every page: next event (when there is one) and the language picker. */
export function TopBar() {
  return (
    <div className="border-b border-promo-accent/30 bg-promo text-promo-foreground">
      <div className="container mx-auto flex min-h-11 items-center gap-4 px-6 py-1.5">
        <div className="hidden w-[84px] shrink-0 md:block" aria-hidden />
        <div className="flex-1 text-sm md:text-center md:text-base">
          <NextEventBanner />
        </div>
        <div className="flex w-[84px] shrink-0 justify-end">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
