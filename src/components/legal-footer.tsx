import { Link } from "@tanstack/react-router";
import { useLocale, useMessages } from "@/i18n";
import { legalMessages } from "@/i18n/messages/legal";
import { openCookieSettings } from "@/lib/cookie-consent";

/** Slim strip at the bottom of every page with the privacy policy and cookie settings. */
export function LegalFooter() {
  const t = useMessages(legalMessages).footer;
  const locale = useLocale();

  return (
    <div className="border-t border-ink-foreground/10 bg-ink px-6 py-4 text-center text-xs text-ink-foreground/70">
      <Link to="/$locale/privacy" params={{ locale }} className="hover:text-gold">
        {t.privacy}
      </Link>
      <span className="mx-3 opacity-50">·</span>
      <button type="button" onClick={openCookieSettings} className="cursor-pointer hover:text-gold">
        {t.settings}
      </button>
    </div>
  );
}
