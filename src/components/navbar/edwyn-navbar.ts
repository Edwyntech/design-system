import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../icon/edwyn-icon';

export interface NavItem {
  label: string;
  href: string;
}

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Vision', href: '/notre-vision' },
  { label: 'Rémunération & Avantages', href: '/remuneration-avantages' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Vie d’Edwyn', href: '/vie-edwyn' },
];

/**
 * Fixed responsive header navigation bar with glassmorphism blur, animated logo, and mobile drawer.
 * Fully configurable with dynamic navigation items, action slots, and shadow parts.
 * Aligned with https://www.edwyn.tech
 *
 * @summary Edwyn responsive navbar
 * @tag edwyn-navbar
 * @csspart navbar - Root header container
 * @csspart container - Centered inner container
 * @csspart brand - Brand link and logo
 * @csspart brand-logo - Animated logo image
 * @csspart brand-title - Brand title text
 * @csspart nav-links - Desktop navigation container
 * @csspart nav-item - Individual navigation item link
 * @csspart simulator - Simulator CTA button
 * @csspart contact - Contact CTA button
 * @csspart mobile-toggle - Hamburger toggle button
 * @csspart mobile-menu - Mobile drawer menu
 */
@customElement('edwyn-navbar')
export class EdwynNavbar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      position: var(--edwyn-navbar-position, fixed);
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--edwyn-z-navbar, 50);
    }

    :host([position='relative']) {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
    }

    :host([position='sticky']) {
      position: sticky;
    }

    .navbar {
      width: 100%;
      height: 80px;
      background-color: color-mix(in srgb, var(--edwyn-color-bg, #292e30) 80%, transparent);
      backdrop-filter: var(--edwyn-blur-md, blur(12px));
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));
      box-sizing: border-box;
      position: relative;
    }

    .container {
      max-width: var(--edwyn-container-xl, 1280px);
      height: 100%;
      margin: 0 auto;
      padding: 0 var(--edwyn-space-4, 1rem);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }

    /* Logo area */
    .brand-link {
      position: relative;
      width: 64px;
      height: 64px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      text-decoration: none;
      transition: transform var(--edwyn-transition-base, 300ms ease);
    }

    .brand-link:hover {
      transform: scale(1.1);
    }

    .brand-logo {
      width: 64px;
      height: 64px;
      object-fit: contain;
      display: block;
    }

    .brand-title {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--edwyn-color-text, #ffffff);
      margin-left: 0.5rem;
    }

    .brand-title span {
      color: var(--edwyn-color-primary, #f08200);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Desktop Navigation */
    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .nav-item {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: var(--edwyn-radius-full, 9999px);
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      font-weight: 500;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      text-decoration: none;
      transition:
        color var(--edwyn-transition-fast, 150ms ease),
        background-color var(--edwyn-transition-fast, 150ms ease);
    }

    .nav-item:hover {
      color: var(--edwyn-color-text-primary, #f08200);
      background: var(--edwyn-color-white-5, rgba(255, 255, 255, 0.05));
    }

    .nav-item.active {
      color: var(--edwyn-color-text-primary, #f08200);
      background: var(--edwyn-color-white-5, rgba(255, 255, 255, 0.05));
    }

    .actions-wrapper {
      display: inline-flex;
      align-items: center;
    }

    /* Simulateur special button */
    .simulator-btn {
      display: inline-flex;
      align-items: center;
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: var(--edwyn-radius-full, 9999px);
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      font-weight: 700;
      color: var(--edwyn-color-text-primary, #f08200);
      background: linear-gradient(
        to right,
        var(--edwyn-color-primary-alpha-20, rgba(240, 130, 0, 0.2)),
        var(--edwyn-color-primary-alpha-10, rgba(240, 130, 0, 0.1))
      );
      border: 1px solid var(--edwyn-color-primary-alpha-20, rgba(240, 130, 0, 0.2));
      text-decoration: none;
      transition: all var(--edwyn-transition-fast, 150ms ease);
    }

    .simulator-btn:hover {
      background: linear-gradient(
        to right,
        var(--edwyn-color-primary-alpha-30, rgba(240, 130, 0, 0.3)),
        var(--edwyn-color-primary-alpha-20, rgba(240, 130, 0, 0.2))
      );
    }

    /* Contact CTA button */
    .contact-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;
      padding: 0.5rem 1.25rem;
      height: 40px;
      border-radius: var(--edwyn-radius-full, 9999px);
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--edwyn-color-primary-contrast, #0f172a);
      background-color: var(--edwyn-color-primary, #f08200);
      text-decoration: none;
      box-sizing: border-box;
      transition: background-color var(--edwyn-transition-fast, 150ms ease);
    }

    .contact-btn:hover {
      background-color: var(--edwyn-color-primary-hover, #ff8f1a);
    }

    /* Mobile toggle */
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--edwyn-color-text, #ffffff);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
    }

    .mobile-toggle:hover {
      background: var(--edwyn-color-white-5, rgba(255, 255, 255, 0.05));
    }

    /* Mobile Drawer */
    .mobile-menu {
      display: none;
      flex-direction: column;
      background: var(--edwyn-color-bg-darker, #1e2224);
      border-top: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.08));
      padding: 1.5rem;
      gap: 0.75rem;
    }

    .mobile-menu.open {
      display: flex;
    }

    @media (max-width: 992px) {
      .nav-links {
        display: none;
      }
      .mobile-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `;

  /**
   * Positioning mode of the navbar: 'fixed', 'sticky', or 'relative'.
   */
  @property({ type: String, reflect: true })
  position: 'fixed' | 'sticky' | 'relative' = 'fixed';

  /**
   * The currently active route path (e.g. / or /notre-vision).
   */
  @property({ type: String })
  activeHref = '/';

  /**
   * Brand label for accessibility and title.
   */
  @property({ type: String })
  brandName = 'EDWYN';

  /**
   * Link destination when clicking the brand logo.
   */
  @property({ type: String, attribute: 'brand-href' })
  brandHref = '/';

  /**
   * Whether to show text next to the logo.
   */
  @property({ type: Boolean })
  showBrandTitle = false;

  /**
   * Source path of the animated logo.
   */
  @property({ type: String, attribute: 'logo-src' })
  logoSrc = '/images/logo.gif';

  /**
   * Dynamic navigation routes array. Defaults to official Edwyn Tech routes.
   */
  @property({ type: Array })
  items: NavItem[] = DEFAULT_NAV_ITEMS;

  /**
   * Destination URL for the Simulator CTA button.
   */
  @property({ type: String, attribute: 'simulator-href' })
  simulatorHref = '/simulateur';

  /**
   * Label for the Simulator CTA button.
   */
  @property({ type: String, attribute: 'simulator-label' })
  simulatorLabel = 'Simulateur 🚀';

  /**
   * Whether to display the Simulator CTA button.
   */
  @property({ type: Boolean, attribute: 'show-simulator' })
  showSimulator = true;

  /**
   * Destination URL for the Contact CTA button.
   */
  @property({ type: String, attribute: 'contact-href' })
  contactHref = '/contact';

  /**
   * Label for the Contact CTA button.
   */
  @property({ type: String, attribute: 'contact-label' })
  contactLabel = 'Contact';

  /**
   * Whether to display the Contact CTA button.
   */
  @property({ type: Boolean, attribute: 'show-contact' })
  showContact = true;

  @state()
  mobileOpen = false;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.mobileOpen) {
      this.mobileOpen = false;
    }
  };

  private toggleMobileMenu() {
    this.mobileOpen = !this.mobileOpen;
  }

  override render() {
    const navItems = Array.isArray(this.items) ? this.items : DEFAULT_NAV_ITEMS;

    return html`
      <header class="navbar" part="navbar">
        <div class="container" part="container">
          <!-- Logo -->
          <a
            href="${this.brandHref}"
            class="brand-link"
            part="brand"
            aria-label="${this.brandName} Accueil"
          >
            ${
              this.logoSrc
                ? html`<img
                    src="${this.logoSrc}"
                    alt="${this.brandName} Logo"
                    width="64"
                    height="64"
                    class="brand-logo"
                    part="brand-logo"
                  />`
                : ''
            }
            <span class="brand-title ${this.showBrandTitle ? '' : 'sr-only'}" part="brand-title">
              ${this.brandName}<span>.</span>
            </span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="nav-links" part="nav-links" aria-label="Navigation principale">
            ${navItems.map(
              (item) => html`
                <a
                  class="nav-item ${this.activeHref === item.href ? 'active' : ''}"
                  href="${item.href}"
                  part="nav-item"
                >
                  ${item.label}
                </a>
              `
            )}
          </nav>

          <!-- Action Buttons / Slot -->
          <div class="actions-wrapper">
            <slot name="actions">
              ${
                this.showSimulator
                  ? html`
                      <a class="simulator-btn" href="${this.simulatorHref}" part="simulator">
                        ${this.simulatorLabel}
                      </a>
                    `
                  : ''
              }
              ${
                this.showContact
                  ? html`
                      <a class="contact-btn" href="${this.contactHref}" part="contact">
                        ${this.contactLabel}
                      </a>
                    `
                  : ''
              }
            </slot>
          </div>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="mobile-toggle"
            part="mobile-toggle"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded="${this.mobileOpen}"
            @click="${this.toggleMobileMenu}"
          >
            <edwyn-icon name="${this.mobileOpen ? 'x' : 'menu'}" .size="${24}"></edwyn-icon>
          </button>
        </div>

        <!-- Mobile Drawer Menu -->
        <div
          class="mobile-menu ${this.mobileOpen ? 'open' : ''}"
          part="mobile-menu"
          role="dialog"
          aria-modal="${this.mobileOpen ? 'true' : 'false'}"
          aria-hidden="${!this.mobileOpen}"
        >
          ${navItems.map(
            (item) => html`
              <a
                class="nav-item ${this.activeHref === item.href ? 'active' : ''}"
                href="${item.href}"
                part="nav-item"
                @click="${() => (this.mobileOpen = false)}"
              >
                ${item.label}
              </a>
            `
          )}
          <slot name="mobile-actions">
            ${
              this.showSimulator
                ? html`
                    <a
                      class="simulator-btn"
                      href="${this.simulatorHref}"
                      part="simulator"
                      style="margin-left: 0; text-align: center; justify-content: center;"
                      @click="${() => (this.mobileOpen = false)}"
                    >
                      ${this.simulatorLabel}
                    </a>
                  `
                : ''
            }
            ${
              this.showContact
                ? html`
                    <a
                      class="contact-btn"
                      href="${this.contactHref}"
                      part="contact"
                      style="margin-left: 0; text-align: center; justify-content: center;"
                      @click="${() => (this.mobileOpen = false)}"
                    >
                      ${this.contactLabel}
                    </a>
                  `
                : ''
            }
          </slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-navbar': EdwynNavbar;
  }
}
