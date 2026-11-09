import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { locales, useMessages } from "@/i18n";
import { commonMessages } from "@/i18n/messages/common";
import { studioData } from "@/lib/studio-data";

/** Pages that already show WhatsApp in their content, so the floating button would be a duplicate. */
const hiddenOn = new Set(["/contact"]);

/**
 * Floating WhatsApp button, bottom-left on every page except those in `hiddenOn`.
 * The link is built in the browser only, so the number isn't in the page's HTML.
 */
export function WhatsAppButton() {
  const t = useMessages(commonMessages).whatsapp;
  const [href, setHref] = useState<string>();
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    setHref(`https://wa.me/${studioData.pt.contact.whatsapp}`);
  }, []);

  if (
    !href ||
    hiddenOn.has(
      pathname.replace(new RegExp(`^/(${locales.join("|")})`), "").replace(/\/$/, "") || "/",
    )
  )
    return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.label}
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-3 font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#1EBE5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 md:px-5"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden text-lg sm:inline">WhatsApp</span>
    </a>
  );
}
