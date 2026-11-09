import { createFileRoute, redirect } from "@tanstack/react-router";
import { getLocale } from "@/i18n/locale";

// "/" has no content of its own: send visitors to their language (cookie, browser, else Portuguese).
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale", params: { locale: getLocale() } });
  },
});
