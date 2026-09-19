import { describe, it, expect } from 'vitest';
import { edwynDark, edwynLight } from '../.storybook/edwyn-theme';

describe('Storybook Dual Themes', () => {
  it('exports edwynDark with dark base and brand properties', () => {
    expect(edwynDark.base).toBe('dark');
    expect(edwynDark.colorPrimary).toBe('#f08200');
    expect(edwynDark.colorSecondary).toBe('#f08200');
    expect(edwynDark.appBg).toBe('#292e30');
    expect(edwynDark.appContentBg).toBe('#1e2224');
    expect(edwynDark.textColor).toBe('#ffffff');
    expect(edwynDark.brandTitle).toContain('Edwyn Tech');
    expect(edwynDark.brandImage).toBe('/images/logo.gif');
  });

  it('exports edwynLight with light base and brand properties', () => {
    expect(edwynLight.base).toBe('light');
    expect(edwynLight.colorPrimary).toBe('#f08200');
    expect(edwynLight.colorSecondary).toBe('#f08200');
    expect(edwynLight.appBg).toBe('#f8fafc');
    expect(edwynLight.appContentBg).toBe('#ffffff');
    expect(edwynLight.textColor).toBe('#0f172a');
    expect(edwynLight.brandTitle).toContain('Edwyn Tech');
    expect(edwynLight.brandImage).toBe('/images/logo.gif');
  });
});
