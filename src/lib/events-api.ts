// Client for the SportApi events endpoint. The API identifies the client by the
// browser's Origin header, so this must run in the browser, not during SSR.

export type NextEvent = {
  id: number;
  name: string;
  date: string;
  countryCode: string;
  countryPrefix: string;
};

const API_URL = (import.meta.env.VITE_API_URL ?? "https://syrcgate.com").replace(/\/$/, "");

/** Returns the next event, or null when there is none (404) or this site isn't allowed (403). */
export async function getNextEvent(): Promise<NextEvent | null> {
  const response = await fetch(`${API_URL}/api/events`, {
    headers: { Accept: "application/json" },
  });

  if (response.status === 404 || response.status === 403) return null;
  if (!response.ok) throw new Error(`Events API returned ${response.status}`);

  return (await response.json()) as NextEvent;
}
