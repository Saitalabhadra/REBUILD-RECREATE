import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { Btn } from "@/components/Btn";
import { FestiveLayer } from "@/components/FestiveLayer";
import { EventExplorer } from "@/components/EventExplorer";
import { ACHIEVEMENTS, EVENTS, JOURNEY } from "@/data/mock";
import { useTheme } from "@/lib/theme-context";
import { getTheme } from "@/lib/themes";
import { useStore } from "@/lib/store";
import { buzz } from "@/lib/haptics";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusCode — Where students build, compete & ship" },
      { name: "description", content: "Discover hackathons, find teammates with HackMate, and earn verifiable certificates. The digital home for student innovation." },
      { property: "og:title", content: "CampusCode — Where students build" },
      { property: "og:description", content: "One place to run and join college hackathons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Ticker />
      <Discover />
      <Journey />
      <Wall />
      <Cta />
      <Footer />
    </div>
  );
}

function Nav() {
  const { user } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Logo />
        <nav className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#events" className="hover:text-foreground">Events</a>
          <a href="#journey" className="hover:text-foreground">How it works</a>
          <a href="#wall" className="hover:text-foreground">Wall of builders</a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/dashboard"><Btn size="sm">Open dashboard →</Btn></Link>
          ) : (
            <>
              <Link to="/login"><Btn kind="ghost" size="sm">Log in</Btn></Link>
              <Link to="/register"><Btn size="sm">Join free</Btn></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// hero: the three slashes follow the mouse a little + secret: click them 3x
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const [sparks, setSparks] = useState<number[]>([]);
  const { theme } = useTheme();
  const t = getTheme(theme);

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    setM({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  }

  function slashClick() {
    const n = clicks + 1;
    setClicks(n);
    buzz("tap");
    if (n === 3) {
      setSparks(Array.from({ length: 18 }, (_, i) => i));
      buzz("success");
      toast("🔓 You found the build mode. Real builders click things.");
      setTimeout(() => setSparks([]), 1200);
      setClicks(0);
    }
  }

  return (
    <section ref={ref} onMouseMove={onMove} className="relative overflow-hidden border-b border-border">
      <div className="hero-glow absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <FestiveLayer />
      <div className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-8 pt-24 pb-28">
        <div className="col-span-7">
          <div className="anim-rise inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
            <span className="font-mono text-xs">{t.greeting}</span>
          </div>
          <h1 className="anim-rise mt-7 text-[5.4rem] leading-[0.92] font-black tracking-[-0.045em]" style={{ animationDelay: "80ms" }}>
            Where students
            <br />
            <span className="text-gradient">build</span>, compete
            <br />
            &amp; <span className="relative inline-block">ship<span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-12 bg-lime -z-10" /></span>.
          </h1>
          <p className="anim-rise mt-7 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
            One home for every college hackathon — register, find teammates, submit rounds and get certificates that actually verify.
          </p>
          <div className="anim-rise mt-9 flex gap-3" style={{ animationDelay: "240ms" }}>
            <Link to="/register"><Btn size="lg">Create free account →</Btn></Link>
            <a href="#events"><Btn size="lg" kind="ghost">Browse events</Btn></a>
          </div>
          <div className="mt-12 flex gap-10">
            {[["12k+", "students"], ["400+", "colleges"], ["180", "hackathons run"]].map(([a, b]) => (
              <div key={b}>
                <div className="text-3xl font-extrabold tracking-tight">{a}</div>
                <div className="mono-label">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative col-span-5 h-[460px]">
          {/* three slashes, bigger + interactive. colours are the brand ones, fixed */}
          <button onClick={slashClick} aria-label="A little secret" className="absolute inset-0 flex items-center justify-center gap-7">
            {["bg-ink", "bg-violet", "bg-lime"].map((c, i) => (
              <span
                key={c}
                className={`block h-80 w-16 -skew-x-[18deg] rounded-2xl ${c} transition-transform duration-300 ease-out`}
                style={{ transform: `translate(${m.x * (i + 1) * 22}px, ${m.y * (i + 1) * 18}px) skewX(-18deg)` }}
              />
            ))}
          </button>
          {sparks.map((s) => (
            <span
              key={s}
              className="pointer-events-none absolute top-1/2 left-1/2 h-2.5 w-2.5 rounded-full bg-lime"
              style={{
                animation: "spark 1s ease-out forwards",
                ["--dx" as string]: `${Math.cos(s) * 220}px`,
                ["--dy" as string]: `${Math.sin(s) * 220}px`,
              }}
            />
          ))}
          <FloatCard className="top-6 -left-6" r="-4deg" title="IdeaCheck" text="Your idea is 87% original" />
          <FloatCard className="right-0 bottom-10" r="3deg" title="HackMate" text="3 teammates match your stack" />
          <p className="absolute -bottom-2 left-0 w-full text-center font-mono text-[11px] text-muted-foreground">
            psst… try clicking the slashes {clicks > 0 && `(${clicks}/3)`}
          </p>
        </div>
      </div>
    </section>
  );
}

function FloatCard({ className, title, text, r }: { className: string; title: string; text: string; r: string }) {
  return (
    <div className={`cc-card anim-float absolute px-4 py-3 ${className}`} style={{ ["--r" as string]: r }}>
      <div className="mono-label !text-[10px]">✦ {title}</div>
      <div className="text-sm font-semibold">{text}</div>
    </div>
  );
}

function Ticker() {
  const words = ["IDEAS", "PEOPLE", "PRODUCTS", "INNOVATION", "COMMUNITY", "BUILD · COMPETE · SHIP"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground py-4 text-background">
      <div className="anim-marquee flex w-max gap-10 font-mono text-sm tracking-widest">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w} <span className="text-lime">///</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <div className="mono-label">
          {n} — {label}
        </div>
        <h2 className="mt-3 max-w-2xl text-5xl font-black tracking-[-0.035em]">{title}</h2>
      </div>
    </div>
  );
}

function Discover() {
  return (
    <section id="events" className="mx-auto max-w-7xl px-8 py-28">
      <SectionHead n="01" label="Discover" title="Every college event, one clean feed." />
      <EventExplorer limit={6} />
      <div className="mt-10 text-center">
        <Link to="/events">
          <Btn kind="ghost" size="lg">
            See all {EVENTS.length} events →
          </Btn>
        </Link>
      </div>
    </section>
  );
}

// timeline: steps light up as you scroll past them
function Journey() {
  const [seen, setSeen] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const idx = Number((en.target as HTMLElement).dataset["i"]);
            setSeen((s) => Math.max(s, idx + 1));
          }
        });
      },
      { threshold: 0.6 },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="journey" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-8 py-28">
        <div className="col-span-4">
          <div className="sticky top-28">
            <div className="mono-label">02 — Innovation journey</div>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.035em]">From “idea” to “verified”.</h2>
            <p className="mt-5 text-muted-foreground">No forms, no spreadsheets, no lost certificates.</p>
            <div className="mt-8 font-mono text-sm">
              <span className="text-4xl font-bold text-primary">{String(seen).padStart(2, "0")}</span> / 05
            </div>
          </div>
        </div>
        <ol className="relative col-span-8 space-y-6 border-l border-border pl-10">
          <span className="absolute top-0 -left-px w-0.5 bg-primary transition-all duration-700" style={{ height: `${(seen / JOURNEY.length) * 100}%` }} />
          {JOURNEY.map((j, i) => (
            <li
              key={j.step}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`cc-card relative p-7 transition-all duration-500 ${i < seen ? "opacity-100" : "translate-x-4 opacity-40"}`}
            >
              <span className={`absolute top-8 -left-[49px] h-4 w-4 rounded-full border-2 border-background transition-colors ${i < seen ? "bg-primary" : "bg-border"}`} />
              <div className="mono-label">Step {j.step}</div>
              <h3 className="mt-2 text-2xl font-bold">{j.title}</h3>
              <p className="mt-2 text-muted-foreground">{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// achievement gallery: cards flip to show the project
function Wall() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="wall" className="mx-auto max-w-7xl px-8 py-28">
      <SectionHead n="03" label="Wall of builders" title="Students who shipped. Tap a card." />
      <div className="grid grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((a, i) => {
          const isOpen = open === i;
          return (
            <button
              key={a.name}
              onClick={() => {
                setOpen(isOpen ? null : i);
                buzz("tap");
              }}
              className="anim-rise group h-56 text-left [perspective:1000px]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${isOpen ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(8deg)]"}`}>
                <div className="cc-card absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full font-bold ${a.color === "lime" ? "bg-lime text-lime-foreground" : "bg-primary text-primary-foreground"}`}>
                      {a.name[0]}
                    </span>
                    <div>
                      <div className="font-semibold">{a.name}</div>
                      <div className="mono-label !text-[10px]">{a.college}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight">🏆 {a.title}</div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-between rounded-[calc(var(--radius)+4px)] bg-foreground p-6 text-background [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="font-mono text-xs text-lime">THE PROJECT</div>
                  <div className="text-xl font-bold">{a.project}</div>
                  <div className="font-mono text-xs opacity-70">built on CampusCode ///</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-7xl px-8 pb-28">
      <div className="btn-primary relative overflow-hidden rounded-[2rem] px-14 py-16">
        <div className="rangoli-dots absolute inset-0 opacity-40" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="font-mono text-xs opacity-80">BUILD · COMPETE · SHIP</div>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.035em]">Your next weekend project starts here.</h2>
          </div>
          <Link to="/register"><Btn kind="lime" size="lg">Get my CampusCode ID →</Btn></Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-10 text-sm text-muted-foreground">
        <Logo small />
        <span className="font-mono text-xs">© 2026 CampusCode · made in Chennai · support@campuscode.co.in</span>
      </div>
    </footer>
  );
}
