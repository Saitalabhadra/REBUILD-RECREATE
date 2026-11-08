import { describe, expect, it } from "vitest";

import { isThemeWindowActive, pickFestivalTheme } from "@/lib/themes";

// festival windows are in IST; noon UTC on a date is safely inside that IST day
const ist = (iso: string) => new Date(`${iso}T12:00:00Z`);

describe("festival theme windows", () => {
  it("shows the diwali look during the 2026 diwali window (nov 5–11)", () => {
    expect(pickFestivalTheme(ist("2026-11-08"))).toBe("diwali");
  });

  it("shows the normal premium look on ordinary days", () => {
    expect(pickFestivalTheme(ist("2026-06-15"))).toBe("default");
    expect(pickFestivalTheme(ist("2026-02-10"))).toBe("default");
  });

  it("marks a festival theme inactive once its window has passed", () => {
    expect(isThemeWindowActive("diwali", ist("2026-11-08"))).toBe(true);
    expect(isThemeWindowActive("diwali", ist("2026-11-20"))).toBe(false);
  });

  it("never expires the default look", () => {
    expect(isThemeWindowActive("default", ist("2026-06-15"))).toBe(true);
  });
});
