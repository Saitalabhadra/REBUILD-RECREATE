import { useState } from "react";
import type { CCEvent } from "@/data/mock";
import { toggleJoin } from "@/lib/store";
import { buzz } from "@/lib/haptics";
import { toast } from "sonner";

export function EventCard({ ev, joined, delay = 0 }: { ev: CCEvent; joined: boolean; delay?: number }) {
  const pct = Math.round((ev.filled / ev.seats) * 100);
  const [pop, setPop] = useState(false);

  function handle() {
    if (ev.status === "Live" && joined) {
      toast("You're already in this one — check My Events.");
      return;
    }
    const nowIn = toggleJoin(ev.id);
    buzz(nowIn ? "success" : "tap");
    setPop(true);
    setTimeout(() => setPop(false), 400);
    toast(nowIn ? `Registered for ${ev.title} 🎉` : `Left ${ev.title}`);
  }

  return (
    <article className="cc-card cc-lift anim-rise flex flex-col p-5" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <span className="mono-label">{ev.category}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] ${
            ev.status === "Live" ? "bg-primary text-primary-foreground" : ev.status === "Closing soon" ? "bg-lime text-lime-foreground" : "bg-secondary"
          }`}
        >
          {ev.status === "Live" ? "● Live" : ev.status}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight">{ev.title}</h3>
      <p className="text-sm text-muted-foreground">
        {ev.org} · {ev.city}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {ev.tags.map((t) => (
          <span key={t} className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px]">
            #{t}
          </span>
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-sm">
        <div>
          <dt className="mono-label !text-[10px]">When</dt>
          <dd className="font-medium">{ev.date}</dd>
        </div>
        <div>
          <dt className="mono-label !text-[10px]">Mode</dt>
          <dd className="font-medium">{ev.mode}</dd>
        </div>
        <div>
          <dt className="mono-label !text-[10px]">Prize</dt>
          <dd className="truncate font-medium" title={ev.prize}>
            {ev.prize}
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
          {ev.filled}/{ev.seats} seats · closes {ev.deadline}
        </p>
      </div>
      <button
        onClick={handle}
        className={`press mt-5 h-10 rounded-full text-sm font-semibold ${pop ? "scale-105" : ""} ${
          joined ? "border border-border bg-secondary" : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {joined ? (ev.status === "Live" ? "Participating ✓" : "Registered ✓ · tap to leave") : "Register →"}
      </button>
    </article>
  );
}
