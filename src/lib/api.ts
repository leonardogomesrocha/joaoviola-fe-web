/** Base URL of SportApi. Override with VITE_API_URL at build time. */
export const API_URL = (import.meta.env.VITE_API_URL ?? "https://syrcgate.com").replace(/\/$/, "");
