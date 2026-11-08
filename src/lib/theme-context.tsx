import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { isThemeWindowActive, pickFestivalTheme, type ThemeId } from "./themes";

const KEY = "cc-theme"; // "auto" or a theme id

type Ctx = {
  theme: ThemeId;
  mode: "auto" | "manual";
  setTheme: (t: ThemeId) => void;
  goAuto: () => void;
};

// keep one context object across hot-reloads: when vite swaps this module,
// a fresh createContext would split provider and consumers into two worlds
// and every useTheme would throw "outside ThemeProvider" until a full reload.
const ThemeCtx = ((globalThis as Record<string, unknown>)["__ccThemeCtx"] ??= createContext<Ctx | null>(null)) as ReturnType<
  typeof createContext<Ctx | null>
>;

export function ThemeProvider({ children }: { children: ReactNode }) {
  // start with default so server + first client render match
  const [theme, setThemeState] = useState<ThemeId>("default");
  const [mode, setMode] = useState<"auto" | "manual">("auto");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    // a manual festival pick only lives while that festival is on. once the
    // window passes, the site quietly goes back to the normal premium look.
    if (saved && saved !== "auto" && isThemeWindowActive(saved as ThemeId)) {
      setMode("manual");
      setThemeState(saved as ThemeId);
    } else {
      if (saved && saved !== "auto") localStorage.setItem(KEY, "auto");
      setMode("auto");
      setThemeState(pickFestivalTheme());
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function setTheme(t: ThemeId) {
    setMode("manual");
    setThemeState(t);
    localStorage.setItem(KEY, t);
  }

  function goAuto() {
    setMode("auto");
    localStorage.setItem(KEY, "auto");
    setThemeState(pickFestivalTheme());
  }

  return <ThemeCtx.Provider value={{ theme, mode, setTheme, goAuto }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const c = useContext(ThemeCtx);
  if (!c) throw new Error("useTheme outside ThemeProvider");
  return c;
}
