import { addons } from 'storybook/manager-api';
import { edwynDark, edwynLight } from './edwyn-theme';

// Inject dynamic manager theme styles into Manager document head
if (typeof document !== 'undefined') {
  const styleId = 'edwyn-manager-theme-styles';
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `
    /* Transitions for theme toggle in Storybook Manager */
    body,
    #storybook-sidebar-region,
    .sidebar-header,
    [role="toolbar"] {
      transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease !important;
    }

    /* =========================================================
       LIGHT THEME OVERRIDES FOR STORYBOOK MANAGER
       ========================================================= */
    html[data-theme='light'] body,
    body.theme-light,
    [data-theme='light'] body {
      background-color: #f8fafc !important;
      color: #0f172a !important;
    }

    html[data-theme='light'] #storybook-sidebar-region,
    body.theme-light #storybook-sidebar-region,
    [data-theme='light'] #storybook-sidebar-region {
      background-color: #ffffff !important;
      border-right: 1px solid #e2e8f0 !important;
      color: #0f172a !important;
    }

    html[data-theme='light'] .sidebar-header,
    body.theme-light .sidebar-header,
    [data-theme='light'] .sidebar-header {
      background-color: #ffffff !important;
      border-bottom: 1px solid #e2e8f0 !important;
    }

    html[data-theme='light'] .sidebar-header a:hover,
    body.theme-light .sidebar-header a:hover {
      background-color: rgba(0, 0, 0, 0.04) !important;
    }

    html[data-theme='light'] .sidebar-header img,
    body.theme-light .sidebar-header img,
    html[data-theme='light'] img[alt*="Edwyn Tech"],
    body.theme-light img[alt*="Edwyn Tech"] {
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08)) !important;
    }

    html[data-theme='light'] #storybook-explorer-searchfield,
    body.theme-light #storybook-explorer-searchfield {
      color: #0f172a !important;
      background-color: #f1f5f9 !important;
      border: 1px solid #cbd5e1 !important;
    }

    html[data-theme='light'] #storybook-explorer-searchfield::placeholder,
    body.theme-light #storybook-explorer-searchfield::placeholder {
      color: #64748b !important;
    }

    html[data-theme='light'] .sidebar-subheading,
    body.theme-light .sidebar-subheading {
      color: #64748b !important;
    }

    html[data-theme='light'] .sidebar-item,
    body.theme-light .sidebar-item {
      color: #1e293b !important;
    }

    html[data-theme='light'] .sidebar-item:hover,
    body.theme-light .sidebar-item:hover {
      background-color: #f1f5f9 !important;
      color: #0f172a !important;
    }

    html[data-theme='light'] .sidebar-item[data-selected="true"],
    body.theme-light .sidebar-item[data-selected="true"],
    html[data-theme='light'] .sidebar-item.selected,
    body.theme-light .sidebar-item.selected {
      background-color: rgba(240, 130, 0, 0.12) !important;
      color: #c2410c !important;
      font-weight: 600 !important;
      border-left: 3px solid #f08200 !important;
    }

    html[data-theme='light'] [role="toolbar"],
    body.theme-light [role="toolbar"] {
      background-color: #ffffff !important;
      border-bottom: 1px solid #e2e8f0 !important;
      color: #0f172a !important;
    }

    html[data-theme='light'] [role="toolbar"] button,
    body.theme-light [role="toolbar"] button {
      color: #475569 !important;
    }

    html[data-theme='light'] [role="toolbar"] button:hover,
    body.theme-light [role="toolbar"] button:hover {
      color: #c2410c !important;
      background-color: #f1f5f9 !important;
    }

    html[data-theme='light'] [role="toolbar"] button[aria-selected="true"],
    body.theme-light [role="toolbar"] button[aria-selected="true"] {
      color: #c2410c !important;
    }

    /* Addon panel in light mode */
    html[data-theme='light'] [role="tablist"],
    body.theme-light [role="tablist"] {
      background-color: #ffffff !important;
      border-bottom: 1px solid #e2e8f0 !important;
    }

    html[data-theme='light'] [role="tablist"] [role="tab"],
    body.theme-light [role="tablist"] [role="tab"] {
      color: #475569 !important;
    }

    html[data-theme='light'] [role="tablist"] [role="tab"][aria-selected="true"],
    body.theme-light [role="tablist"] [role="tab"][aria-selected="true"] {
      color: #c2410c !important;
      border-bottom: 2px solid #f08200 !important;
    }
  `;
}

addons.setConfig({
  theme: edwynDark,
  showToolbar: true,
  layout: {
    panelPosition: 'bottom',
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

/**
 * Synchronize Storybook Manager UI (sidebar, header, search)
 * with the global theme switcher toolbar item.
 */
addons.register('edwyn/theme-sync', (api) => {
  const syncTheme = (theme: string) => {
    const isLight = theme === 'light';
    api.setOptions({ theme: isLight ? edwynLight : edwynDark });
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (isLight) {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      } else {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      }
    }
  };

  // Check initial URL globals
  try {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const globalsParam = urlParams.get('globals') || '';
      if (globalsParam.includes('theme:light')) {
        syncTheme('light');
      }
    }
  } catch {}

  // Listen to manager toolbar updates
  api.on('updateGlobals', ({ globals }: { globals?: { theme?: string } }) => {
    if (globals?.theme) {
      syncTheme(globals.theme);
    }
  });

  // Listen to preview iframe updates
  api.on('globalsUpdated', ({ globals, userGlobals }: { globals?: { theme?: string }; userGlobals?: { theme?: string } }) => {
    const theme = globals?.theme || userGlobals?.theme;
    if (theme) {
      syncTheme(theme);
    }
  });

  // Listen to setGlobals
  api.on('setGlobals', ({ globals }: { globals?: { theme?: string } }) => {
    if (globals?.theme) {
      syncTheme(globals.theme);
    }
  });
});
