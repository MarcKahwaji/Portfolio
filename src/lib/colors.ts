export type Accent = "mint" | "cyan" | "violet" | "amber" | "rose";

export const ACCENT_CYCLE: Accent[] = [
  "mint",
  "cyan",
  "violet",
  "amber",
  "rose",
];

export const ACCENT_HEX: Record<Accent, string> = {
  mint: "#3DDC97",
  cyan: "#22D3EE",
  violet: "#A78BFA",
  amber: "#FBBF24",
  rose: "#FB7185",
};

export function typeAccent(type: string): Accent {
  const t = type.toLowerCase();
  if (t.includes("multi-tenant")) return "cyan";
  if (t.includes("multi-agent")) return "mint";
  if (t.includes("client")) return "violet";
  if (t.includes("machine learning")) return "amber";
  if (t.includes("review")) return "rose";
  return "mint";
}

export function groupAccent(index: number): Accent {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}

export function hexA(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
