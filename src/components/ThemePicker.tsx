import { useState } from "react";
import { THEMES, getTheme, pickFestivalTheme } from "@/lib/themes";
import { useTheme } from "@/lib/theme-context";
import { buzz } from "@/lib/haptics";

// floating festival switcher, bottom right on every page
export function ThemePicker() {
  const { theme, mode, setTheme, goAuto } = useTheme();
  const [open, setOpen] = useState(false);
  const current = getTheme(theme);

  return (
    <div className="fixed right-5 bottom-5 z-50">
      {open && (
        <div className="cc-card anim-rise mb-3 w-72 p-3">
          <div className="flex items-center justify-between px-1 pb-2">
            <span className="mono-label">Festival theme</span>
            {/* festivals switch on automatically on their days; picking one here is just a preview and expires when the festival ends */}
            <button
              onClick={() => {
                goAuto();
                buzz("tap");
              }}
              className={`press rounded-full px-2.5 py-1 font-mono text-[11px] ${mode === "auto" ? "bg-lime text-lime-foreground" : "bg-secondary"}`}
            >
              {mode === "auto" ? "● auto (IST)" : "use auto"}
            </button>
          </div>
          <div className="grid gap-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  buzz("tap");
                }}
                className={`press flex items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-secondary ${t.id === theme ? "bg-secondary font-semibold" : ""}`}
              >
                <span className="flex -space-x-1">
                  {t.swatch.map((c) => (
                    // swatch colours are just preview data, not styling
                    <span key={c} className="h-4 w-4 rounded-full border border-border" style={{ background: c }} />
                  ))}
                </span>
                <span className="flex-1">{t.name}</span>
                {t.id === pickFestivalTheme() && <span className="mono-label !text-[10px]">today</span>}
              </button>
            ))}
          </div>
          <p className="px-1 pt-2 pb-1 text-[11px] leading-snug text-muted-foreground">
            Festive looks switch on automatically on festival days. Picking one here is just a preview — normal days always use the classic look.
          </p>
        </div>
      )}
      <button
        onClick={() => {
          setOpen(!open);
          buzz("tap");
        }}
        aria-label="Change festival theme"
        className="press cc-card ml-auto flex items-center gap-2 rounded-full !rounded-full px-4 py-2.5 text-sm font-semibold"
      >
        <span>{current.emoji}</span>
        <span>{current.name}</span>
      </button>
    </div>
  );
}
