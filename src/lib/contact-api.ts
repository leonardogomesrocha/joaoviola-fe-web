// Client for SportApi's POST api/contact. Values are the backend enum names.
import { API_URL } from "./api";

export const swimLevels = ["Beginner", "Intermediate", "Advanced", "Competitive"] as const;

export const freestyleTimes = [
  "Over3m30",
  "From3m00To3m30",
  "From2m45To3m00",
  "From2m30To2m45",
  "From2m15To2m30",
  "From2m00To2m15",
  "From1m50To2m00",
  "From1m40To1m50",
  "From1m30To1m40",
  "From1m20To1m30",
  "From1m10To1m20",
  "Under1m10",
  "DontKnow",
] as const;

export const contactTopics = ["PrivateLessons", "OnlineTraining", "Events", "Other"] as const;

export const genders = ["Male", "Female"] as const;

export type ContactRequest = {
  firstName: string;
  lastName: string;
  age?: number;
  gender?: (typeof genders)[number];
  email: string;
  swimLevel: (typeof swimLevels)[number];
  freestyleTime: (typeof freestyleTimes)[number];
  topic: (typeof contactTopics)[number];
  message: string;
  consentAccepted: boolean;
  /** Hidden anti-spam field; real visitors leave it empty. */
  website?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "validation"; fields: Record<string, string[]> }
  | { ok: false; reason: "rateLimited" | "forbidden" | "error" };

export async function sendContact(request: ContactRequest): Promise<ContactResult> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(request),
    });
  } catch {
    return { ok: false, reason: "error" };
  }

  if (response.ok) return { ok: true };
  if (response.status === 429) return { ok: false, reason: "rateLimited" };
  if (response.status === 403) return { ok: false, reason: "forbidden" };

  if (response.status === 400) {
    const body = (await response.json().catch(() => null)) as {
      errors?: Record<string, string[]>;
    } | null;
    // API field names are PascalCase ("FirstName"); the form uses camelCase.
    const fields = Object.fromEntries(
      Object.entries(body?.errors ?? {}).map(([key, messages]) => [
        key.charAt(0).toLowerCase() + key.slice(1),
        messages,
      ]),
    );
    return { ok: false, reason: "validation", fields };
  }

  return { ok: false, reason: "error" };
}
