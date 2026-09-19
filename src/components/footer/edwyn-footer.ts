import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface FooterLink {
  label: string;
  href: string;
}

export const DEFAULT_FOOTER_NAV_LINKS: FooterLink[] = [
  { label: 'Vision', href: '/notre-vision' },
  { label: 'Modèle', href: '/notre-modele' },
  { label: 'Expertises', href: '/nos-expertises' },
];

export const DEFAULT_FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];

/**
 * Four-column responsive footer with brand overview, navigation, legal links, and copyright.
 * Fully configurable with dynamic links, text overrides, customizable slots, and shadow parts.
 *
 * @summary Edwyn 4-column footer
 * @tag edwyn-footer
 * @csspart footer - Root footer element
 * @csspart container - Centered inner container
 * @csspart grid - Four-column layout grid
 * @csspart brand-section - First column with brand and tagline
 * @csspart nav-section - Second column with navigation links
 * @csspart legal-section - Third column with legal links
 * @csspart contact-section - Fourth column with contact info
 * @csspart bottom-bar - Bottom copyright bar
 */
@customElement('edwyn-footer')
export class EdwynFooter extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .footer {
      width: 100%;
      background: var(--edwyn-color-bg, #292e30);
      border-top: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));
      padding: var(--edwyn-space-12, 3rem) var(--edwyn-space-4, 1rem);
      box-sizing: border-box;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
    }

    .container {
      max-width: var(--edwyn-container-xl, 1280px);
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--edwyn-space-8, 2rem);
      margin-bottom: var(--edwyn-space-8, 2rem);
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .brand-title {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: var(--edwyn-font-size-xl, 1.25rem);
      font-weight: 700;
      color: var(--edwyn-color-primary, #f08200);
      margin: 0 0 var(--edwyn-space-4, 1rem) 0;
      letter-spacing: -0.02em;
    }

    .tagline {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      color: var(--edwyn-color-text-muted, #a3a8aa);
      line-height: 1.6;
      margin: 0;
    }

    .section-title {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--edwyn-color-text, #ffffff);
      margin: 0 0 var(--edwyn-space-4, 1rem) 0;
    }

    .links-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .link {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      color: var(--edwyn-color-text-muted, #a3a8aa);
      text-decoration: none;
      transition: color var(--edwyn-transition-fast, 150ms ease);
    }

    .link:hover {
      color: var(--edwyn-color-primary, #f08200);
    }

    .contact-item {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      line-height: 1.6;
    }

    .contact-email {
      color: var(--edwyn-color-text-muted, #a3a8aa);
      text-decoration: none;
      transition: color var(--edwyn-transition-fast, 150ms ease);
    }

    .contact-email:hover {
      color: var(--edwyn-color-primary, #f08200);
    }

    /* Bottom copyright bar */
    .bottom-bar {
      border-top: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));
      padding-top: var(--edwyn-space-8, 2rem);
      text-align: center;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      color: var(--edwyn-color-text-muted, #a3a8aa);
    }
  `;

  /**
   * Copyright year. Defaults to current year.
   */
  @property({ type: Number })
  year = new Date().getFullYear();

  /**
   * Brand title displayed in the first column.
   */
  @property({ type: String, attribute: 'brand-title' })
  brandTitle = 'EDWYN';

  /**
   * Tagline description below brand title.
   */
  @property({ type: String })
  tagline = "L'ESN Alternative qui mise sur la transparence et l'humain.";

  /**
   * Title for the navigation column.
   */
  @property({ type: String, attribute: 'nav-title' })
  navTitle = 'Navigation';

  /**
   * Navigation links array. Defaults to official Edwyn links.
   */
  @property({ type: Array })
  navLinks: FooterLink[] = DEFAULT_FOOTER_NAV_LINKS;

  /**
   * Title for the legal column.
   */
  @property({ type: String, attribute: 'legal-title' })
  legalTitle = 'Légal';

  /**
   * Legal links array. Defaults to official Edwyn legal pages.
   */
  @property({ type: Array })
  legalLinks: FooterLink[] = DEFAULT_FOOTER_LEGAL_LINKS;

  /**
   * Title for the contact column.
   */
  @property({ type: String, attribute: 'contact-title' })
  contactTitle = 'Contact';

  /**
   * Contact email address.
   */
  @property({ type: String, attribute: 'contact-email' })
  contactEmail = 'contact@edwyn.tech';

  /**
   * Contact postal location description.
   */
  @property({ type: String, attribute: 'contact-location' })
  contactLocation = 'Paris, France';

  /**
   * Copyright legal text suffix.
   */
  @property({ type: String, attribute: 'copyright-text' })
  copyrightText = 'Edwyn. Tous droits réservés.';

  override render() {
    const navItems = Array.isArray(this.navLinks) ? this.navLinks : DEFAULT_FOOTER_NAV_LINKS;
    const legalItems = Array.isArray(this.legalLinks)
      ? this.legalLinks
      : DEFAULT_FOOTER_LEGAL_LINKS;

    return html`
      <footer class="footer" part="footer">
        <div class="container" part="container">
          <div class="grid" part="grid">
            <!-- Brand Info Column -->
            <div part="brand-section">
              <slot name="brand">
                <h3 class="brand-title">${this.brandTitle}</h3>
                <p class="tagline">${this.tagline}</p>
              </slot>
            </div>

            <!-- Navigation Column -->
            <div part="nav-section">
              <slot name="nav">
                <h4 class="section-title">${this.navTitle}</h4>
                <ul class="links-list">
                  ${navItems.map(
                    (link) => html`
                      <li>
                        <a class="link" href="${link.href}">${link.label}</a>
                      </li>
                    `
                  )}
                </ul>
              </slot>
            </div>

            <!-- Legal Column -->
            <div part="legal-section">
              <slot name="legal">
                <h4 class="section-title">${this.legalTitle}</h4>
                <ul class="links-list">
                  ${legalItems.map(
                    (link) => html`
                      <li>
                        <a class="link" href="${link.href}">${link.label}</a>
                      </li>
                    `
                  )}
                </ul>
              </slot>
            </div>

            <!-- Contact Column -->
            <div part="contact-section">
              <slot name="contact">
                <h4 class="section-title">${this.contactTitle}</h4>
                <div class="contact-item">
                  ${
                    this.contactEmail
                      ? html`
                          <a class="contact-email" href="mailto:${this.contactEmail}">
                            ${this.contactEmail}
                          </a>
                          <br />
                        `
                      : ''
                  }
                  ${this.contactLocation}
                </div>
              </slot>
            </div>
          </div>

          <div class="bottom-bar" part="bottom-bar">
            <slot name="bottom">
              <p style="margin: 0;">© ${this.year} ${this.copyrightText}</p>
            </slot>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-footer': EdwynFooter;
  }
}
