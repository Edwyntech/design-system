/**
 * Edwyn Tech Design Tokens - TypeScript Definitions & Utilities
 * Aligned with https://www.edwyn.tech
 */

export const darkColors = {
  primary: {
    base: '#f08200',
    hover: '#ff8f1a',
    active: '#d97400',
    contrast: '#0f172a',
    alpha5: 'rgba(240, 130, 0, 0.05)',
    alpha10: 'rgba(240, 130, 0, 0.10)',
    alpha20: 'rgba(240, 130, 0, 0.20)',
    alpha30: 'rgba(240, 130, 0, 0.30)',
    alpha50: 'rgba(240, 130, 0, 0.50)',
    alpha80: 'rgba(240, 130, 0, 0.80)',
    alpha90: 'rgba(240, 130, 0, 0.90)',
  },
  surface: {
    bg: '#292e30',
    secondary: '#292e30',
    muted: '#404648',
    darker: '#1e2224',
    elevated: '#32383a',
    card: 'rgba(255, 255, 255, 0.051)',
    cardHover: 'rgba(255, 255, 255, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.65)',
    heroOverlay: 'rgba(0, 0, 0, 0.65)',
  },
  border: {
    base: 'rgba(255, 255, 255, 0.05)',
    subtle: 'rgba(255, 255, 255, 0.05)',
    white5: 'rgba(255, 255, 255, 0.05)',
    white10: 'rgba(255, 255, 255, 0.10)',
    bright: 'rgba(255, 255, 255, 0.15)',
    primary: 'rgba(240, 130, 0, 0.25)',
    primaryHover: 'rgba(240, 130, 0, 0.50)',
    primary10: 'rgba(240, 130, 0, 0.10)',
    primary20: 'rgba(240, 130, 0, 0.20)',
    primary30: 'rgba(240, 130, 0, 0.30)',
  },
  text: {
    base: '#ffffff',
    foreground: '#ffffff',
    white85: 'rgba(255, 255, 255, 0.85)',
    white80: 'rgba(255, 255, 255, 0.80)',
    white70: 'rgba(255, 255, 255, 0.70)',
    white60: 'rgba(255, 255, 255, 0.60)',
    white50: 'rgba(255, 255, 255, 0.50)',
    muted: 'rgba(255, 255, 255, 0.70)',
    dim: 'rgba(255, 255, 255, 0.50)',
    primary: '#f08200',
  },
  semantic: {
    success: '#00c758',
    successLight: '#05df72',
    warning: '#f59e0b',
    error: '#fb2c36',
    errorLight: '#ff6568',
    info: '#3080ff',
    purple: '#ac4bff',
    purpleLight: '#d9b3ff',
  },
} as const;

export const lightColors = {
  primary: {
    ...darkColors.primary,
    contrast: '#0f172a',
  },
  surface: {
    bg: '#f8fafc',
    secondary: '#f1f5f9',
    muted: '#e2e8f0',
    darker: '#ffffff',
    elevated: '#ffffff',
    card: 'rgba(255, 255, 255, 0.95)',
    cardHover: '#ffffff',
    overlay: 'rgba(15, 23, 42, 0.40)',
    heroOverlay: 'rgba(15, 23, 42, 0.25)',
  },
  border: {
    base: 'rgba(15, 23, 42, 0.12)',
    subtle: 'rgba(15, 23, 42, 0.08)',
    white5: 'rgba(0, 0, 0, 0.04)',
    white10: 'rgba(0, 0, 0, 0.08)',
    bright: 'rgba(15, 23, 42, 0.20)',
    primary: 'rgba(240, 130, 0, 0.40)',
    primaryHover: 'rgba(240, 130, 0, 0.70)',
    primary10: 'rgba(240, 130, 0, 0.15)',
    primary20: 'rgba(240, 130, 0, 0.25)',
    primary30: 'rgba(240, 130, 0, 0.35)',
  },
  text: {
    base: '#0f172a',
    foreground: '#0f172a',
    white85: '#1e293b',
    white80: '#334155',
    white70: '#475569',
    white60: '#475569',
    white50: '#64748b',
    muted: '#475569',
    dim: '#64748b',
    primary: '#c2410c',
  },
  semantic: {
    success: '#15803d',
    successLight: '#16a34a',
    warning: '#b45309',
    error: '#dc2626',
    errorLight: '#ef4444',
    info: '#1d4ed8',
    purple: '#7e22ce',
    purpleLight: '#9333ea',
  },
} as const;

// Default canonical colors points to Dark Slate for backwards compatibility
export const colors = darkColors;

export const themes = {
  dark: darkColors,
  light: lightColors,
} as const;

export type ThemeName = 'dark' | 'light';

export const typography = {
  fonts: {
    heading: "'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

export const spacing = {
  0: '0px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

export const radii = {
  none: '0px',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  glowOrangeSm: '0 0 15px rgba(240, 130, 0, 0.30)',
  glowOrangeMd: '0 0 30px rgba(240, 130, 0, 0.20)',
  glowOrangeLg: '0 0 40px rgba(240, 130, 0, 0.10)',
  glowButton: '0 4px 20px rgba(240, 130, 0, 0.35)',
} as const;

export const blurs = {
  sm: 'blur(8px)',
  md: 'blur(12px)',
  xl: 'blur(24px)',
  '2xl': 'blur(40px)',
  '3xl': 'blur(64px)',
} as const;

export const tokens = {
  colors,
  darkColors,
  lightColors,
  themes,
  typography,
  spacing,
  radii,
  shadows,
  blurs,
} as const;

export type EdwynTokens = typeof tokens;
export default tokens;
