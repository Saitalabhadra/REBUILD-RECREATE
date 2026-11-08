import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { EventExplorer } from "@/components/EventExplorer";
import { EVENTS } from "@/data/mock";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — CampusCode" },
      { name: "description", content: "Every college hackathon, ideathon, contest and workshop in one clean feed." },
      { property: "og:title", content: "Events — CampusCode" },
      { property: "og:description", content: "Discover and register for college hackathons across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const open = EVENTS.filter((e) => e.status !== "Live").length;
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-8 py-16">
        <div className="mono-label">Discover — {EVENTS.length} events · {open} open</div>
        <h1 className="mt-3 max-w-2xl text-5xl font-black tracking-[-0.035em]">
          Every college event, <span className="text-primary">one clean feed</span>.
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          No more 20 WhatsApp groups. Filter by format, search by city or tag, register in one tap.
        </p>
        <div className="mt-10">
          <EventExplorer />
        </div>
      </main>
    </div>
  );
}
