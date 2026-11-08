import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Btn } from "@/components/Btn";
import { useStore } from "@/lib/store";

// top bar for the inner pages (events, my-events)
export function SiteNav() {
  const { user } = useStore();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Logo />
        <nav className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/events" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Events
          </Link>
          <Link to="/my-events" className="hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            My Events
          </Link>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Link to="/dashboard">
              <Btn size="sm">Dashboard →</Btn>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Btn kind="ghost" size="sm">
                  Log in
                </Btn>
              </Link>
              <Link to="/register">
                <Btn size="sm">Join free</Btn>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
