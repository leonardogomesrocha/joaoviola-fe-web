// Client for SportApi's GET api/config. The API identifies the site by the browser's
// Origin header, so this runs in the browser only (useQuery doesn't run during SSR).
import { queryOptions } from "@tanstack/react-query";
import { API_URL } from "./api";

export type NextEvent = {
  id: number;
  name: string;
  date: string;
  countryCode: string;
  countryPrefix: string;
};

export type SiteConfig = {
  /** Next upcoming event, or null when there is none. */
  nextEvent: NextEvent | null;
  /** False when the site has no e-mail settings, so the contact form can't send. */
  emailSet: boolean;
  /** Cloudflare Turnstile site key for the contact form; null when CAPTCHA is off. */
  captchaSiteKey: string | null;
  /** HTML template (EmailTemplate, module "Contact") this site's contact e-mails use; null when none. */
  contactTemplate: string | null;
};

/** A site that isn't registered in ClientCors gets no event and can't send e-mails. */
const notAllowed: SiteConfig = { nextEvent: null, emailSet: false, captchaSiteKey: null, contactTemplate: null };

export async function getSiteConfig(): Promise<SiteConfig> {
  const response = await fetch(`${API_URL}/api/config`, {
    headers: { Accept: "application/json" },
  });

  if (response.status === 403) return notAllowed;
  if (!response.ok) throw new Error(`Config API returned ${response.status}`);

  return (await response.json()) as SiteConfig;
}

export const siteConfigQuery = queryOptions({
  queryKey: ["site-config"],
  queryFn: getSiteConfig,
  staleTime: 5 * 60 * 1000,
  retry: false,
});
