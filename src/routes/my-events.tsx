import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { EventCard } from "@/components/EventCard";
import { Btn } from "@/components/Btn";
import { EVENTS, NOTIFS } from "@/data/mock";
import { TEAM_NAME, demoUser, useStore } from "@/lib/store";

export const Route = createFileRoute("/my-events")({
  head: () => ({
    meta: [
      { title: "My Events — CampusCode" },
      { name: "description", content: "Your registered hackathons, rounds and deadlines in one place." },
      { property: "og:title", content: "My Events — CampusCode" },
      { property: "og:description", content: "Track the events you've joined." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyEventsPage,
});

function MyEventsPage() {
  const { user, joined } = useStore();
  const u = user ?? demoUser;
  const mine = EVENTS.filter((e) => joined.includes(e.id));
  const live = mine.filter((e) => e.status === "Live");

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-8 py-16">
        <div className="mono-label">{TEAM_NAME}</div>
        <h1 className="mt-3 text-5xl font-black tracking-[-0.035em]">My Events</h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Everything {u.name.split(" ")[0]} has registered for — rounds, deadlines and seats, tracked on one timeline.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="cc-card bg-foreground p-6 text-background">
            <div className="font-mono text-xs text-lime">DIGITAL ID</div>
            <div className="mt-3 text-xl font-bold">{u.name}</div>
            <div className="text-sm opacity-70">{u.college}</div>
            <div className="mt-4 font-mono">{u.ccId}</div>
          </div>
          <div className="cc-card p-6">
            <div className="mono-label">Joined</div>
            <div className="text-5xl font-black">{mine.length}</div>
            <p className="mt-2 text-sm text-muted-foreground">{live.length} live right now</p>
          </div>
          <div className="cc-card p-6">
            <div className="mono-label">Updates</div>
            {NOTIFS.map((n) => (
              <p key={n.text} className="mt-2 text-sm">
                {n.text} <span className="text-muted-foreground">· {n.t}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {mine.length === 0 ? (
            <div className="cc-card p-12 text-center">
              <p className="text-xl font-bold">No events yet.</p>
              <p className="mt-2 text-muted-foreground">Your next weekend project is one registration away.</p>
              <Link to="/events" className="mt-6 inline-block">
                <Btn>Browse events →</Btn>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mine.map((e, i) => (
                <EventCard key={e.id} ev={e} joined delay={i * 50} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
