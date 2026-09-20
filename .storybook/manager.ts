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

    /* Structure header & espacement avec le bouton de configuration */
    .sidebar-header {
      padding: 10px 12px !important;
      gap: 1.5px !important; /* Gap réduit de moitié */
      justify-content: flex-start !important;
      box-sizing: border-box !important;
    }

    .sidebar-header > div:first-child {
      flex: 1 1 auto !important;
      min-width: 0 !important;
    }

    /* Default (Dark Mode): transparent background */
    .sidebar-header a {
      background-color: transparent !important;
      border: 1px solid transparent !important;
      box-shadow: none !important;
      border-radius: 12px !important;
      padding: 6px 10px !important;
      width: 100% !important;
      margin: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease !important;
      box-sizing: border-box !important;
    }

    .sidebar-header a:hover {
      background-color: rgba(255, 255, 255, 0.05) !important;
      transform: scale(1.02);
    }

    .sidebar-header img,
    img[alt*="Edwyn Tech"] {
      max-height: 68px !important;
      filter: none !important;
    }

    .sidebar-header > button,
    .sidebar-header button[aria-label*="menu" i],
    .sidebar-header button[aria-label*="settings" i],
    .sidebar-header button[aria-label*="Storybook" i],
    .sidebar-header [class*="SidebarToggleButton"] {
      position: static !important;
      transform: none !important;
      flex-shrink: 0 !important;
      margin: 0 !important;
      z-index: 10 !important;
      opacity: 0.85 !important;
      transition: opacity 0.2s ease, color 0.2s ease !important;
    }

    .sidebar-header button:hover {
      opacity: 1 !important;
      color: #f08200 !important;
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

    html[data-theme='light'] .sidebar-header a,
    body.theme-light .sidebar-header a,
    [data-theme='light'] .sidebar-header a {
      background-color: #292e30 !important; /* Arrière-plan thème dark quand on est en light mode */
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18) !important;
    }

    html[data-theme='light'] .sidebar-header a:hover,
    body.theme-light .sidebar-header a:hover,
    [data-theme='light'] .sidebar-header a:hover {
      background-color: #1e2224 !important;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28) !important;
    }

    html[data-theme='light'] .sidebar-header img,
    body.theme-light .sidebar-header img,
    html[data-theme='light'] img[alt*="Edwyn Tech"],
    body.theme-light img[alt*="Edwyn Tech"] {
      filter: none !important;
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
