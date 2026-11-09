import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocale, useMessages } from "@/i18n";
import { legalMessages } from "@/i18n/messages/legal";
import {
  cookieSettingsEvent,
  getConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

/** Cookie notice shown on the first visit (and again from "Cookie settings"). */
export function CookieBanner() {
  const t = useMessages(legalMessages).banner;
  const locale = useLocale();
  // Closed on the server and on first render, so the HTML matches; opened in the browser if needed.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(cookieSettingsEvent, reopen);
    return () => window.removeEventListener(cookieSettingsEvent, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t.label}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-gold/40 bg-ink p-5 text-ink-foreground shadow-2xl sm:bottom-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 text-sm leading-relaxed">
          <p className="font-display text-base font-semibold uppercase tracking-wider text-gold">
            {t.title}
          </p>
          <p className="mt-1 opacity-90">
            {t.text}{" "}
            <Link
              to="/$locale/privacy"
              params={{ locale }}
              onClick={() => setOpen(false)}
              className="underline underline-offset-2 hover:text-gold"
            >
              {t.more}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => choose("essential")}
            className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
          >
            {t.essential}
          </Button>
          <Button
            onClick={() => choose("all")}
            className="bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {t.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
