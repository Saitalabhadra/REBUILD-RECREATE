import { useTheme } from "@/lib/theme-context";

// small decorative bits that change per festival. purely visual, aria-hidden.
const bits: Record<string, string[]> = {
  diwali: ["🪔", "✨", "🪔", "✨", "🪔"],
  holi: ["🟣", "🟡", "🩷", "🔵", "🟢"],
  sankranti: ["🪁", "🪁", "☀️", "🪁"],
  ugadi: ["🥭", "🌿", "🌼", "🌿"],
  independence: ["🇮🇳", "🕊️", "🇮🇳"],
  christmas: ["❄️", "⭐", "❄️", "🎁", "❄️"],
  wedding: ["🌼", "💫", "🌸", "🌼"],
};

export function FestiveLayer() {
  const { theme } = useTheme();
  const list = bits[theme];
  if (!list) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {list.map((b, i) => (
        <span
          key={theme + i}
          className="anim-float absolute text-2xl opacity-70"
          style={{
            left: `${8 + i * (84 / list.length)}%`,
            top: `${12 + ((i * 37) % 60)}%`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}
