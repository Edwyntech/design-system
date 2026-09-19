/**
 * @edwyn-tech/design-system
 * Official WebComponents Design System for Edwyn Tech
 * Built with Lit & Pure TypeScript
 */

// Import tokens CSS for side-effects if imported in bundler
import './tokens/typography.css';
import './tokens/tokens.css';

// Export Design Tokens
export * from './tokens/index';
export { default as tokens } from './tokens/index';

// Export Components & Types
export { EdwynIcon } from './components/icon/edwyn-icon';
export type { EdwynIconName } from './components/icon/edwyn-icon';

export { EdwynButton } from './components/button/edwyn-button';
export type { ButtonVariant, ButtonSize } from './components/button/edwyn-button';

export { EdwynBadge } from './components/badge/edwyn-badge';
export type { BadgeVariant, BadgeSize } from './components/badge/edwyn-badge';

export { EdwynCard } from './components/card/edwyn-card';

export { EdwynStatItem } from './components/stat-item/edwyn-stat-item';

export { EdwynInput } from './components/input/edwyn-input';
export type { InputType, InputSize } from './components/input/edwyn-input';

export { EdwynSlider } from './components/slider/edwyn-slider';

export { EdwynNavbar, DEFAULT_NAV_ITEMS } from './components/navbar/edwyn-navbar';
export type { NavItem } from './components/navbar/edwyn-navbar';

export { EdwynHero } from './components/hero/edwyn-hero';

export {
  EdwynFooter,
  DEFAULT_FOOTER_NAV_LINKS,
  DEFAULT_FOOTER_LEGAL_LINKS,
} from './components/footer/edwyn-footer';
export type { FooterLink } from './components/footer/edwyn-footer';

export {
  EdwynSimulator,
  calculateSimulator,
  getGrossSalary,
  getCostThreshold,
  getMinDaysBillable,
  SALARY_BY_EXP,
  DEFAULT_TJM_BY_EXP,
} from './components/simulator/edwyn-simulator';
export type { SimulatorState } from './components/simulator/edwyn-simulator';
