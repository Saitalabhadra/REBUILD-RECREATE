import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Btn } from "@/components/Btn";
import { demoUser, saveUser } from "@/lib/store";
import { buzz } from "@/lib/haptics";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — CampusCode" },
      { name: "description", content: "Log in to your CampusCode student account." },
      { property: "og:title", content: "Log in — CampusCode" },
      { property: "og:description", content: "Pick up where you left off." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || pass.length < 6) {
      setErr("Enter a valid email and a password of 6+ characters.");
      buzz("error");
      return;
    }
    saveUser({ ...demoUser, email });
    buzz("success");
    nav({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col justify-between p-12">
        <Logo />
        <form onSubmit={submit} className="anim-rise mx-auto w-full max-w-sm">
          <div className="mono-label">Welcome back</div>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.035em]">Log in.</h1>
          <label className="mt-8 block text-sm font-medium">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring/40" placeholder="you@college.edu" />
          <label className="mt-4 block text-sm font-medium">Password</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring/40" placeholder="••••••" />
          {err && <p className="anim-shake mt-3 text-sm text-destructive">{err}</p>}
          <Btn type="submit" className="mt-6 w-full">Log in →</Btn>
          <p className="mt-5 text-sm text-muted-foreground">
            New here? <Link to="/register" className="font-semibold text-primary">Create an account</Link>
          </p>
        </form>
        <span className="font-mono text-xs text-muted-foreground">BUILD · COMPETE · SHIP</span>
      </div>
      <div className="relative m-4 overflow-hidden rounded-[2rem] bg-primary p-12 text-primary-foreground">
        <div className="rangoli-dots absolute inset-0 opacity-40" />
        <div className="relative flex h-full flex-col justify-end">
          <p className="text-4xl font-black tracking-tight">“Found my team on HackMate, won my first hackathon two weeks later.”</p>
          <p className="mt-4 font-mono text-sm opacity-80">— Ananya R., PSG Tech</p>
        </div>
      </div>
    </div>
  );
}
