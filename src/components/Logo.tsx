import { Link } from "@tanstack/react-router";
import logo from "@/assets/campuscode-logo.png";

// official logo file, never recoloured. themes don't touch it.
export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="CampusCode home">
      <img src={logo} alt="" className={small ? "h-6 w-auto" : "h-7 w-auto"} />
      <span className={`font-extrabold tracking-tight ${small ? "text-base" : "text-lg"}`}>CampusCode</span>
    </Link>
  );
}
