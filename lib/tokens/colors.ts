/**
 * QiM-AI2.1 — Color Tokens
 * ========================
 * Centralized color system for HakimSarker.org
 * Use these tokens instead of hardcoded hex values.
 */

// ─── Brand Palette ───
export const brand = {
  /** Deep emerald — primary brand identity */
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  } as const,

  /** Heritage gold — legacy accent */
  gold: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  } as const,

  /** Wisdom violet — secondary accent */
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  } as const,
} as const;

// ─── Semantic Colors ───
export const semantic = {
  /** Success / verified */
  success: "#10b981",
  /** Warning / caution */
  warning: "#f59e0b",
  /** Error / danger */
  error: "#ef4444",
  /** Info / neutral */
  info: "#3b82f6",
} as const;

// ─── Surface Colors (Dark Theme) ───
export const surface = {
  /** Deepest background — page canvas */
  base: "#07100f",
  /** Elevated cards, modals */
  elevated: "#0d1f22",
  /** Subtle hover states */
  hover: "#111827",
  /** Borders, dividers */
  border: "rgba(255,255,255,0.10)",
  /** Subtle borders */
  borderLight: "rgba(255,255,255,0.06)",
} as const;

// ─── Text Colors ───
export const text = {
  /** Primary headings, body */
  primary: "#edf7f5",
  /** Secondary text, descriptions */
  secondary: "rgba(237,247,245,0.68)",
  /** Tertiary, captions, meta */
  muted: "rgba(237,247,245,0.45)",
  /** Disabled, placeholders */
  disabled: "rgba(237,247,245,0.25)",
} as const;

// ─── Legacy-Specific Colors ───
export const legacy = {
  /** Professor Sarker memorial gradient start */
  gradientStart: "#07100f",
  /** Professor Sarker memorial gradient mid */
  gradientMid: "#0f2023",
  /** Professor Sarker memorial gradient end */
  gradientEnd: "#120f1b",
  /** Gold accent for highlights */
  accentGold: "#f2c766",
  /** Gold accent hover */
  accentGoldHover: "#f7dc96",
  /** Gold subtle background */
  accentGoldBg: "rgba(242,199,102,0.10)",
  /** Gold border */
  accentGoldBorder: "rgba(242,199,102,0.35)",
} as const;

// ─── Quick Access Aliases ───
export const colors = {
  ...brand,
  ...semantic,
  surface,
  text,
  legacy,
} as const;

export default colors;
