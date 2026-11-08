// festival theme engine
// each festival has a window (month/day, inclusive). dates that move every
// year (diwali, holi, ugadi) are kept per-year in FESTIVAL_DATES below.

export type ThemeId =
  | "default"
  | "wedding"
  | "diwali"
  | "holi"
  | "sankranti"
  | "ugadi"
  | "independence"
  | "christmas";

export type ThemeInfo = {
  id: ThemeId;
  name: string;
  emoji: string;
  greeting: string;
  swatch: string[]; // only for the picker preview dots
};

export const THEMES: ThemeInfo[] = [
  { id: "default", name: "CampusCode", emoji: "///", greeting: "Build. Compete. Ship.", swatch: ["#f7f7f4", "#7665ff", "#a8e62e"] },
  { id: "wedding", name: "Royal Wedding", emoji: "💍", greeting: "Shaadi season, ship season.", swatch: ["#f6eedf", "#8a1e2b", "#d9b44a"] },
  { id: "diwali", name: "Diwali", emoji: "🪔", greeting: "Happy Diwali! Light up your ideas.", swatch: ["#fbf0e0", "#d9541e", "#f2c14e"] },
  { id: "holi", name: "Holi", emoji: "🎨", greeting: "Bura na mano, Holi hai!", swatch: ["#fdf3f7", "#e0287a", "#f3d33a"] },
  { id: "sankranti", name: "Sankranti", emoji: "🪁", greeting: "Let your projects fly high.", swatch: ["#fbf4e2", "#e0712a", "#e6c43c"] },
  { id: "ugadi", name: "Ugadi", emoji: "🥭", greeting: "New year, new builds.", swatch: ["#f1f7ea", "#2f7d4f", "#e8c13a"] },
  { id: "independence", name: "Independence Day", emoji: "🇮🇳", greeting: "Build for Bharat.", swatch: ["#fbfcfe", "#1f2f7a", "#f39a2c"] },
  { id: "christmas", name: "Christmas", emoji: "🎄", greeting: "Merry Christmas & happy shipping.", swatch: ["#f3f8f4", "#b3262b", "#2e8b57"] },
];

type Window = { theme: ThemeId; from: [number, number]; to: [number, number] };

// fixed every year
const FIXED: Window[] = [
  { theme: "sankranti", from: [1, 13], to: [1, 16] },
  { theme: "independence", from: [8, 13], to: [8, 16] },
  { theme: "christmas", from: [12, 20], to: [12, 27] },
  { theme: "wedding", from: [11, 20], to: [12, 14] },
];

// these move with the lunar calendar. add new years here
export const FESTIVAL_DATES: Record<number, Window[]> = {
  2026: [
    { theme: "holi", from: [3, 2], to: [3, 4] },
    { theme: "ugadi", from: [3, 18], to: [3, 20] },
    { theme: "diwali", from: [11, 5], to: [11, 11] },
  ],
  2027: [
    { theme: "holi", from: [3, 21], to: [3, 23] },
    { theme: "ugadi", from: [4, 6], to: [4, 8] },
    { theme: "diwali", from: [10, 26], to: [10, 31] },
  ],
};

// get today's date in India, not the browser timezone
export function getIndiaDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

export function pickFestivalTheme(now = new Date()): ThemeId {
  const { year, month, day } = getIndiaDate(now);
  const today = month * 100 + day; // 1108 = nov 8, easy compare
  // year specific ones first so diwali beats wedding season if they overlap
  const all = [...(FESTIVAL_DATES[year] ?? []), ...FIXED];
  for (const w of all) {
    const a = w.from[0] * 100 + w.from[1];
    const b = w.to[0] * 100 + w.to[1];
    if (today >= a && today <= b) return w.theme;
  }
  return "default";
}

// is this festival's window happening today (IST)? default is always "active".
// used to expire manual festival picks once the festival is over, so normal
// days always fall back to the clean premium look.
export function isThemeWindowActive(id: ThemeId, now = new Date()): boolean {
  if (id === "default") return true;
  const { year, month, day } = getIndiaDate(now);
  const today = month * 100 + day;
  const all = [...(FESTIVAL_DATES[year] ?? []), ...FIXED];
  return all.some((w) => {
    if (w.theme !== id) return false;
    return today >= w.from[0] * 100 + w.from[1] && today <= w.to[0] * 100 + w.to[1];
  });
}

export const getTheme = (id: ThemeId): ThemeInfo => THEMES.find((t) => t.id === id) ?? THEMES[0]!;
