import { describe, expect, it } from "vitest";
import { locales, matchLocale } from "@/i18n/config";
import { commonMessages } from "@/i18n/messages/common";
import { homeMessages } from "@/i18n/messages/home";
import { privateLessonsMessages } from "@/i18n/messages/private-lessons";
import { studioData } from "@/lib/studio-data";

// Lists every text path ("hero.title", "features.2") so missing translations are caught.
function keys(value: unknown, prefix = ""): string[] {
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("i18n", () => {
  it("picks the browser's preferred supported language", () => {
    expect(matchLocale("es-ES,es;q=0.9,en;q=0.8")).toBe("es");
    expect(matchLocale("fr-FR,fr;q=0.9,en;q=0.5")).toBe("en");
    expect(matchLocale("de-DE")).toBeUndefined();
    expect(matchLocale(undefined)).toBeUndefined();
  });

  it.each([
    ["common", commonMessages],
    ["home", homeMessages],
    ["private-lessons", privateLessonsMessages],
    ["studio data", studioData],
  ])("%s has the same texts in every language", (_, messages) => {
    const reference = keys(messages.pt);
    for (const locale of locales) {
      expect(keys(messages[locale]), locale).toEqual(reference);
    }
  });
});
