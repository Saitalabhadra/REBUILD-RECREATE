// tiny vibration helper. returns false when the device can't vibrate
// so the caller can show some visual feedback instead
const patterns = {
  tap: 10,
  success: [15, 40, 15],
  error: [40, 30, 40],
};

export function buzz(kind: keyof typeof patterns = "tap") {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return navigator.vibrate(patterns[kind]);
  } catch {
    return false;
  }
}
