import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EVENTS } from "@/data/mock";
import { useStore } from "@/lib/store";
import { buzz } from "@/lib/haptics";

const cats = ["All", "Hackathon", "Ideathon", "Contest", "Workshop"];

// shared event feed: category chips + search + card grid.
// landing passes a limit, the /events page shows everything.
export function EventExplorer({ limit }: { limit?: number }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const { joined } = useStore();
  const list = EVENTS.filter(
    (e) =>
      (cat === "All" || e.category === cat) &&
      (e.title + e.org + e.city + e.tags.join(" ")).toLowerCase().includes(q.toLowerCase()),
  );
  const shown = limit ? list.slice(0, limit) : list;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => {
              setCat(c);
              buzz("tap");
            }}
            className={`press rounded-full border px-4 py-2 text-sm font-medium ${cat === c ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-secondary"}`}
          >
            {c}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, city, #tag…"
          className="ml-auto h-10 w-72 max-w-full rounded-full border border-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>
      {shown.length === 0 ? (
        <p className="cc-card p-10 text-center text-muted-foreground">Nothing matches “{q}”. Try another tag?</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e, i) => (
            <EventCard key={e.id} ev={e} joined={joined.includes(e.id)} delay={i * 60} />
          ))}
        </div>
      )}
    </div>
  );
}
