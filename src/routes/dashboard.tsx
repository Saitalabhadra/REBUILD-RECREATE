import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { EventCard } from "@/components/EventCard";
import { EVENTS, NOTIFS } from "@/data/mock";
import { TEAM_NAME, demoUser, logout, useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CampusCode" },
      { name: "description", content: "Your events, rounds and certificates in one place." },
      { property: "og:title", content: "Student dashboard — CampusCode" },
      { property: "og:description", content: "Track My Events and discover new ones." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, joined } = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState<"my" | "all">("my");
  const u = user ?? demoUser;
  const mine = EVENTS.filter((e) => joined.includes(e.id));
  const list = tab === "my" ? mine : EVENTS;

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <aside className="flex flex-col border-r border-border bg-card p-6">
        <Logo small />
        <nav className="mt-10 grid gap-1 text-sm">
          <button onClick={() => setTab("my")} className={`press rounded-lg px-3 py-2 text-left ${tab === "my" ? "bg-secondary font-semibold" : ""}`}>My Events</button>
          <button onClick={() => setTab("all")} className={`press rounded-lg px-3 py-2 text-left ${tab === "all" ? "bg-secondary font-semibold" : ""}`}>Events</button>
          <Link to="/events" className="rounded-lg px-3 py-2 hover:bg-secondary">Events page ↗</Link>
          <Link to="/my-events" className="rounded-lg px-3 py-2 hover:bg-secondary">My Events page ↗</Link>
          <Link to="/" className="rounded-lg px-3 py-2 hover:bg-secondary">Home</Link>
        </nav>
        <button onClick={() => { logout(); nav({ to: "/login" }); }} className="press mt-auto rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary">Log out</button>
      </aside>
      <main className="p-10">
        <div className="mono-label">{TEAM_NAME}</div>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.035em]">Hey {u.name.split(" ")[0]} 👋</h1>
        <div className="mt-8 grid grid-cols-3 gap-5">
          <div className="cc-card col-span-1 bg-foreground p-6 text-background">
            <div className="font-mono text-xs text-lime">DIGITAL ID</div>
            <div className="mt-3 text-xl font-bold">{u.name}</div>
            <div className="text-sm opacity-70">{u.college}</div>
            <div className="mt-4 font-mono">{u.ccId}</div>
          </div>
          <div className="cc-card p-6"><div className="mono-label">Joined</div><div className="text-5xl font-black">{mine.length}</div></div>
          <div className="cc-card p-6">
            <div className="mono-label">Updates</div>
            {NOTIFS.map((n) => <p key={n.text} className="mt-2 text-sm">{n.text} <span className="text-muted-foreground">· {n.t}</span></p>)}
          </div>
        </div>
        <h2 className="mt-12 mb-5 text-2xl font-bold">{tab === "my" ? "My Events" : "Events"}</h2>
        {list.length === 0 ? (
          <p className="cc-card p-10 text-center text-muted-foreground">No events yet — check the Events tab.</p>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {list.map((e, i) => <EventCard key={e.id} ev={e} joined={joined.includes(e.id)} delay={i * 50} />)}
          </div>
        )}
      </main>
    </div>
  );
}
