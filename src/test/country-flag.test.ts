import { describe, expect, it } from "vitest";
import { countryName, flagUrl, toAlpha2 } from "@/lib/country-flag";

describe("country flag", () => {
  it("maps alpha-3 codes to alpha-2", () => {
    expect(toAlpha2("PRT")).toBe("PT");
    expect(toAlpha2("esp")).toBe("ES");
  });

  it("falls back to the next candidate when the first isn't a country code", () => {
    expect(toAlpha2("620", "PRT")).toBe("PT");
    expect(toAlpha2("PRT", "620")).toBe("PT");
    expect(toAlpha2("620")).toBeNull();
  });

  it("builds the flag url and Portuguese country name", () => {
    expect(flagUrl("PT")).toBe("https://flagcdn.com/pt.svg");
    expect(countryName("ES")).toBe("Espanha");
  });
});
