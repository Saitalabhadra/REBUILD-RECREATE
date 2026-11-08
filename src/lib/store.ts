// fake "backend" using localStorage. good enough for a frontend-only build
import { useEffect, useState } from "react";

export const TEAM_NAME = "Team TripleSlash"; // tracking name, same everywhere

export type User = { name: string; email: string; college: string; ccId: string };

const USER_KEY = "cc-user";
const JOINED_KEY = "cc-joined";

export const demoUser: User = {
  name: "Sai Talabhadra",
  email: "sai@student.edu",
  college: "SRM Institute, Chennai",
  ccId: "CC-26-0419",
};

export function saveUser(u: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(u));
  window.dispatchEvent(new Event("cc-store"));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("cc-store"));
}

function read<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ids of events the student joined. rebuild-26 is joined by default
export function toggleJoin(id: string) {
  const list = read<string[]>(JOINED_KEY, ["rebuild-26"]);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(JOINED_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("cc-store"));
  return next.includes(id);
}

// hook that re-reads storage whenever something changes
export function useStore() {
  const [user, setUser] = useState<User | null>(null);
  const [joined, setJoined] = useState<string[]>(["rebuild-26"]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setUser(read<User | null>(USER_KEY, null));
      setJoined(read<string[]>(JOINED_KEY, ["rebuild-26"]));
      setReady(true);
    };
    sync();
    window.addEventListener("cc-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cc-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, joined, ready };
}
