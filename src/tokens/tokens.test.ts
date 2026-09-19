import { describe, it, expect } from 'vitest';
import {
  colors,
  darkColors,
  lightColors,
  themes,
  typography,
  spacing,
  radii,
  shadows,
  tokens,
} from './index';

describe('Design Tokens', () => {
  it('defines primary brand colors correctly', () => {
    expect(colors.primary.base).toBe('#f08200');
    expect(colors.primary.hover).toBe('#ff8f1a');
    expect(colors.primary.active).toBe('#d97400');
    expect(colors.surface.bg).toBe('#292e30');
    expect(colors.surface.muted).toBe('#404648');
    expect(colors.surface.heroOverlay).toBe('rgba(0, 0, 0, 0.65)');
  });

  it('defines dual-theme system (darkColors, lightColors, themes)', () => {
    expect(darkColors.surface.bg).toBe('#292e30');
    expect(darkColors.text.base).toBe('#ffffff');

    expect(lightColors.surface.bg).toBe('#f8fafc');
    expect(lightColors.surface.darker).toBe('#ffffff');
    expect(lightColors.text.base).toBe('#0f172a');
    expect(lightColors.primary.base).toBe('#f08200');

    expect(themes.dark).toEqual(darkColors);
    expect(themes.light).toEqual(lightColors);
  });

  it('defines semantic colors aligned with public site Tailwind theme', () => {
    expect(colors.semantic.success).toBe('#00c758');
    expect(colors.semantic.error).toBe('#fb2c36');
    expect(colors.semantic.info).toBe('#3080ff');
  });

  it('defines brand typography fonts', () => {
    expect(typography.fonts.heading).toContain('Syne');
    expect(typography.fonts.body).toContain('Inter');
  });

  it('defines spacing scale', () => {
    expect(spacing[0]).toBe('0px');
    expect(spacing[4]).toBe('1rem');
    expect(spacing[8]).toBe('2rem');
  });

  it('defines border radii aligned with public site Tailwind scale', () => {
    expect(radii.full).toBe('9999px');
    expect(radii.md).toBe('0.375rem');
    expect(radii.xl).toBe('0.75rem');
  });

  it('exports combined tokens object as default and named export', () => {
    expect(tokens.colors).toBe(colors);
    expect(tokens.darkColors).toBe(darkColors);
    expect(tokens.lightColors).toBe(lightColors);
    expect(tokens.themes).toBe(themes);
    expect(tokens.typography).toBe(typography);
    expect(tokens.spacing).toBe(spacing);
    expect(tokens.radii).toBe(radii);
    expect(tokens.shadows).toBe(shadows);
  });
});
