import { useState, type ButtonHTMLAttributes } from "react";
import { buzz } from "@/lib/haptics";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: "primary" | "lime" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
};

const kinds = {
  primary: "btn-primary",
  lime: "bg-lime text-lime-foreground hover:brightness-105",
  dark: "bg-foreground text-background hover:opacity-90",
  ghost: "border border-border bg-card text-foreground hover:bg-secondary",
};
const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base" };

// button with a press animation + haptic tap.
// if phone can't vibrate we flash a ring so there is still some feedback
export function Btn({ kind = "primary", size = "md", className = "", onClick, children, ...rest }: Props) {
  const [flash, setFlash] = useState(false);
  return (
    <button
      {...rest}
      onClick={(e) => {
        if (!buzz("tap")) {
          setFlash(true);
          setTimeout(() => setFlash(false), 250);
        }
        onClick?.(e);
      }}
      className={`press inline-flex items-center justify-center gap-2 rounded-full font-semibold disabled:opacity-50 ${kinds[kind]} ${sizes[size]} ${flash ? "ring-4 ring-ring/30" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
