import { create } from 'storybook/theming';

/**
 * Storybook Dark Slate Theme for Edwyn Tech
 * Aligned with https://www.edwyn.tech (#292e30 surface)
 */
export const edwynDark = create({
  base: 'dark',
  brandTitle: 'Edwyn Tech • Design System',
  brandUrl: 'https://www.edwyn.tech',
  brandImage: '/images/logo.gif',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#f08200',
  colorSecondary: '#f08200',

  // UI - Harmonized with Edwyn Slate (#292e30) and darker surface (#1e2224)
  appBg: '#292e30',
  appContentBg: '#1e2224',
  appPreviewBg: '#292e30',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 10,

  // Typography
  fontBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', monospace",

  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#1e2224',
  textMutedColor: '#a3a8aa',

  // Toolbar default and active colors
  barTextColor: '#a3a8aa',
  barSelectedColor: '#f08200',
  barHoverColor: '#ffffff',
  barBg: '#292e30',

  // Form colors
  inputBg: '#1e2224',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: '#ffffff',
  inputBorderRadius: 8,
});

/**
 * Storybook Light Mode Theme for Edwyn Tech
 * Clean, high-contrast light theme aligned with Edwyn brand tokens (#f8fafc surface)
 */
export const edwynLight = create({
  base: 'light',
  brandTitle: 'Edwyn Tech • Design System',
  brandUrl: 'https://www.edwyn.tech',
  brandImage: '/images/logo.gif',
  brandTarget: '_blank',

  // Colors
  colorPrimary: '#f08200',
  colorSecondary: '#f08200',

  // UI - Harmonized with Light Slate (#f8fafc) and pure white (#ffffff)
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  appPreviewBg: '#f8fafc',
  appBorderColor: 'rgba(0, 0, 0, 0.08)',
  appBorderRadius: 10,

  // Typography
  fontBase: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', monospace",

  // Text colors
  textColor: '#0f172a',
  textInverseColor: '#ffffff',
  textMutedColor: '#64748b',

  // Toolbar default and active colors
  barTextColor: '#64748b',
  barSelectedColor: '#f08200',
  barHoverColor: '#0f172a',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: 'rgba(0, 0, 0, 0.12)',
  inputTextColor: '#0f172a',
  inputBorderRadius: 8,
});

export default edwynDark;
