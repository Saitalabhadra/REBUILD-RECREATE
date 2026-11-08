export type CCEvent = {
  id: string;
  title: string;
  org: string;
  city: string;
  mode: "Online" | "Offline" | "Hybrid";
  date: string; // display string
  deadline: string;
  prize: string;
  tags: string[];
  category: "Hackathon" | "Ideathon" | "Workshop" | "Contest";
  seats: number;
  filled: number;
  status: "Open" | "Closing soon" | "Live";
  round?: string;
};

export const EVENTS: CCEvent[] = [
  { id: "rebuild-26", title: "ReBuild '26", org: "Team CampusCode", city: "Chennai", mode: "Online", date: "Nov 6 – 7", deadline: "Closed", prize: "Internship + ₹15k stipend", tags: ["Frontend", "UI"], category: "Hackathon", seats: 500, filled: 488, status: "Live", round: "Round 2 · Rebuild" },
  { id: "smart-bharat", title: "Smart Bharat Hack", org: "IIT Madras E-Cell", city: "Chennai", mode: "Hybrid", date: "Nov 22 – 23", deadline: "Nov 15", prize: "₹1,00,000", tags: ["GovTech", "AI"], category: "Hackathon", seats: 300, filled: 211, status: "Open" },
  { id: "greencode", title: "GreenCode Ideathon", org: "VIT Vellore", city: "Vellore", mode: "Offline", date: "Nov 29", deadline: "Nov 18", prize: "₹40,000", tags: ["Climate", "IoT"], category: "Ideathon", seats: 150, filled: 139, status: "Closing soon" },
  { id: "pixelpush", title: "PixelPush UI Sprint", org: "Figma Campus Club", city: "Bengaluru", mode: "Online", date: "Dec 3", deadline: "Nov 30", prize: "Swag + Figma Pro", tags: ["Design", "Frontend"], category: "Contest", seats: 1000, filled: 412, status: "Open" },
  { id: "rust-101", title: "Rust in a Weekend", org: "GDG Hyderabad", city: "Hyderabad", mode: "Online", date: "Dec 6 – 7", deadline: "Dec 2", prize: "Certificate", tags: ["Systems", "Learning"], category: "Workshop", seats: 200, filled: 88, status: "Open" },
  { id: "fintech-forge", title: "FinTech Forge", org: "BITS Pilani", city: "Pilani", mode: "Offline", date: "Dec 13 – 14", deadline: "Dec 1", prize: "₹75,000", tags: ["Payments", "Web3"], category: "Hackathon", seats: 250, filled: 120, status: "Open" },
  { id: "health-hack", title: "MedTech 36", org: "AIIMS Innovation", city: "New Delhi", mode: "Hybrid", date: "Jan 10 – 11", deadline: "Dec 28", prize: "₹60,000", tags: ["Health", "AI"], category: "Hackathon", seats: 200, filled: 54, status: "Open" },
  { id: "kite-ml", title: "Sankranti ML Cup", org: "JNTU Kakinada", city: "Kakinada", mode: "Online", date: "Jan 14", deadline: "Jan 8", prize: "₹25,000", tags: ["ML", "Data"], category: "Contest", seats: 400, filled: 97, status: "Open" },
];

export const ACHIEVEMENTS = [
  { name: "Ananya R.", college: "PSG Tech", title: "Won Smart India Hackathon", project: "KrishiMitra — crop disease detection", color: "lime" },
  { name: "Rahul M.", college: "NIT Trichy", title: "Funded by Startup TN", project: "BusBuddy — live college bus tracker", color: "violet" },
  { name: "Fatima S.", college: "Anna University", title: "Google SoC '26", project: "Contributed i18n to Kubernetes docs", color: "lime" },
  { name: "Karthik V.", college: "SRM KTR", title: "Runner-up, HackMIT", project: "Sutra — sign language translator", color: "violet" },
  { name: "Meera J.", college: "Amrita", title: "1st, GreenCode '25", project: "Paani — leak detection IoT kit", color: "lime" },
  { name: "Arjun P.", college: "IIIT Hyd", title: "Interned at Zerodha", project: "Built a CLI for option chains", color: "violet" },
];

export const JOURNEY = [
  { step: "01", title: "Discover", text: "Find hackathons from 400+ colleges in one feed. No more 20 WhatsApp groups." },
  { step: "02", title: "Team up", text: "HackMate suggests teammates by skills. Search anyone by CampusCode ID." },
  { step: "03", title: "Check your idea", text: "IdeaCheck tells you if your idea is fresh before you burn a weekend on it." },
  { step: "04", title: "Build & submit", text: "Rounds, deadlines and submissions tracked on one timeline." },
  { step: "05", title: "Get verified", text: "Certificates with QR + a Digital ID that recruiters can actually verify." },
];

export const NOTIFS = [
  { t: "2h ago", text: "Round 2 submissions close today at 8:00 PM IST." },
  { t: "Yesterday", text: "You were shortlisted for ReBuild '26 Round 2 🎉" },
  { t: "2d ago", text: "Smart Bharat Hack registrations are open." },
];
