import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Btn } from "@/components/Btn";
import { saveUser } from "@/lib/store";
import { buzz } from "@/lib/haptics";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — CampusCode" },
      { name: "description", content: "Get your CampusCode student ID in a minute." },
      { property: "og:title", content: "Join CampusCode" },
      { property: "og:description", content: "Create your free student account." },
    ],
  }),
  component: Register,
});

function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", college: "", pass: "", adult: false });
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f, v: string | boolean) => setF({ ...f, [k]: v });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name || !f.email.includes("@") || f.pass.length < 6 || !f.adult) {
      setErr("Fill every field, 6+ char password, and confirm you're 18+.");
      buzz("error");
      return;
    }
    saveUser({ name: f.name, email: f.email, college: f.college || "—", ccId: "CC-26-" + String(f.name.length * 137).padStart(4, "0") });
    buzz("success");
    nav({ to: "/dashboard" });
  }

  const input = "mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring/40";

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-10">
      <Logo />
      <div className="mt-16 grid grid-cols-2 gap-16">
        <div>
          <div className="mono-label">Student account</div>
          <h1 className="mt-2 text-6xl font-black tracking-[-0.04em]">Get your <span className="text-primary">CampusCode ID</span>.</h1>
          <ul className="mt-8 space-y-3 text-muted-foreground">
            <li>✦ One login for every college hackathon</li>
            <li>✦ Digital ID card with QR</li>
            <li>✦ Verifiable certificates</li>
          </ul>
        </div>
        <form onSubmit={submit} className="cc-card anim-rise p-8">
          <label className="block text-sm font-medium">Full name</label>
          <input className={input} value={f.name} onChange={(e) => set("name", e.target.value)} />
          <label className="mt-4 block text-sm font-medium">Email</label>
          <input className={input} value={f.email} onChange={(e) => set("email", e.target.value)} />
          <label className="mt-4 block text-sm font-medium">College</label>
          <input className={input} value={f.college} onChange={(e) => set("college", e.target.value)} />
          <label className="mt-4 block text-sm font-medium">Password</label>
          <input type="password" className={input} value={f.pass} onChange={(e) => set("pass", e.target.value)} />
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={f.adult} onChange={(e) => set("adult", e.target.checked)} /> I'm a student and 18+
          </label>
          {err && <p className="anim-shake mt-3 text-sm text-destructive">{err}</p>}
          <Btn type="submit" className="mt-6 w-full">Create account →</Btn>
          <p className="mt-4 text-sm text-muted-foreground">
            Have an account? <Link to="/login" className="font-semibold text-primary">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
