import type { Preview } from '@storybook/web-components-vite';
import { addons } from 'storybook/internal/preview-api';
import { edwynDark } from './edwyn-theme';
import '../src/tokens/tokens.css';
import './docs-custom.css';

/**
 * Helper to determine initial theme from URL search parameters or default to dark.
 */
function getInitialTheme(): string {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const globals = params.get('globals') || '';
      if (globals.includes('theme:light')) return 'light';
    } catch {}
  }
  return 'dark';
}

/**
 * Helper to synchronize DOM attributes and styles for the active theme.
 */
function applyActiveTheme(theme: string) {
  if (typeof document === 'undefined') return;

  const isLight = theme === 'light';
  document.documentElement.setAttribute('data-theme', theme);

  if (isLight) {
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
    document.body.style.backgroundColor = 'var(--edwyn-color-bg, #f8fafc)';
    document.body.style.color = 'var(--edwyn-color-text, #0f172a)';
  } else {
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    document.body.style.backgroundColor = 'var(--edwyn-color-bg, #292e30)';
    document.body.style.color = 'var(--edwyn-color-text, #ffffff)';
  }

  // Cross-frame sync with parent manager window if same-origin and available
  try {
    if (typeof window !== 'undefined' && window.parent && window.parent !== window && window.parent.document) {
      window.parent.document.documentElement.setAttribute('data-theme', theme);
      if (isLight) {
        window.parent.document.body.classList.add('theme-light');
        window.parent.document.body.classList.remove('theme-dark');
      } else {
        window.parent.document.body.classList.add('theme-dark');
        window.parent.document.body.classList.remove('theme-light');
      }
    }
  } catch {}
}

// Initial theme application on module load
applyActiveTheme(getInitialTheme());

// Attach channel listener for global theme updates across docs and stories
try {
  const channel = addons.getChannel();
  channel.on('globalsUpdated', ({ globals, userGlobals }: { globals?: { theme?: string }; userGlobals?: { theme?: string } }) => {
    const activeTheme = globals?.theme || userGlobals?.theme;
    if (activeTheme) {
      applyActiveTheme(activeTheme);
    }
  });
  channel.on('updateGlobals', ({ globals }: { globals?: { theme?: string } }) => {
    if (globals?.theme) {
      applyActiveTheme(globals.theme);
    }
  });
} catch {
  // Channel might not be available during certain static analyses
}

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Thème',
      description: 'Basculer le thème global des composants',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', icon: 'moon', title: 'Dark Slate (Défaut)' },
          { value: 'light', icon: 'sun', title: 'Light Mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Welcome & Vision', 'Installation & Setup', 'Integration Frameworks'],
          'Foundations',
          [
            'Architecture & Standards',
            'Colors',
            'Typography',
            'Spacing & Grid',
            'Shadows, Glows & Glass',
            'Accessibility & Contrast',
            'Interactive Playground',
          ],
          'Components',
          [
            'Actions',
            ['Button', 'Icon'],
            'Forms & Inputs',
            ['Input', 'Slider'],
            'Feedback & Status',
            ['Badge', 'StatItem'],
            'Data Display & Containers',
            ['Card'],
            'Navigation & Structure',
            ['Navbar', 'Footer'],
          ],
          'Patterns & Experiences',
          ['Hero Banner', 'Salary Simulator', 'Official Showcase Site'],
        ],
      },
    },
    docs: {
      theme: edwynDark,
    },
    backgrounds: {
      values: [
        {
          name: 'edwyn-slate',
          value: '#292e30',
        },
        {
          name: 'darker',
          value: '#1e2224',
        },
        {
          name: 'light',
          value: '#f8fafc',
        },
        {
          name: 'pure-white',
          value: '#ffffff',
        },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'dark';
      applyActiveTheme(theme);
      return story();
    },
  ],
};

export default preview;
