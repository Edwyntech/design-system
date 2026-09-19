import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Glassmorphism card component with signature Edwyn orange glow and elevation on hover.
 * Aligned with https://www.edwyn.tech
 * Fully supports Dark Slate (#292e30) and Light Mode (#f8fafc) themes.
 *
 * @summary Edwyn glassmorphism card component
 * @tag edwyn-card
 *
 * @slot icon - Top icon container
 * @slot title - Card title element (h2, h3)
 * @slot description - Card description paragraph
 * @slot - Main card body content
 * @slot footer - Card action button or footer link
 *
 * @csspart card - The card root container
 * @csspart body - The card body content wrapper
 * @csspart icon-container - The icon container element
 * @csspart footer - The footer actions container
 * @cssprop --edwyn-color-bg - Card background slate base
 * @cssprop --edwyn-color-primary - Brand glow and accent color
 */
@customElement('edwyn-card')
export class EdwynCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 350px;
      box-sizing: border-box;
      padding: 2rem; /* p-8 */
      background: linear-gradient(
        135deg,
        var(--edwyn-color-bg-darker, #292e30) 0%,
        var(--edwyn-color-bg, #292e30) 60%,
        var(--edwyn-color-primary-alpha-5, rgba(240, 130, 0, 0.05)) 100%
      );
      border: 1px solid var(--edwyn-color-primary-alpha-10, rgba(240, 130, 0, 0.1));
      border-radius: var(--edwyn-radius-xl, 1rem); /* rounded-xl */
      box-shadow: var(--edwyn-shadow-sm, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
      overflow: hidden;
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (min-width: 768px) {
      .card {
        padding: 2.5rem; /* md:p-10 */
      }
    }

    /* Ambient glow overlay inside card */
    .glow-overlay {
      position: absolute;
      inset: 0;
      background: var(--edwyn-color-primary-alpha-5, rgba(240, 130, 0, 0.05));
      opacity: 0;
      filter: blur(32px);
      pointer-events: none;
      transition: opacity 500ms ease;
    }

    .card.interactive:hover .glow-overlay {
      opacity: 1;
    }

    /* Highlighted card (center pillar "Notre Modèle") */
    .card.highlighted {
      background: linear-gradient(
        135deg,
        var(--edwyn-color-bg-darker, #292e30) 0%,
        var(--edwyn-color-primary-alpha-5, rgba(240, 130, 0, 0.05)) 50%,
        var(--edwyn-color-primary-alpha-10, rgba(240, 130, 0, 0.1)) 100%
      );
      border-color: var(--edwyn-color-primary-alpha-20, rgba(240, 130, 0, 0.2));
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.35);
    }

    @media (min-width: 1024px) {
      .card.highlighted {
        transform: translateY(-1rem); /* lg:-translate-y-4 */
      }
      .card.highlighted.interactive:hover {
        transform: translateY(calc(-1rem - 6px));
      }
    }

    /* Interactive hover states */
    .card.interactive:hover {
      border-color: rgba(240, 130, 0, 0.4);
      box-shadow: 0 0 40px rgba(240, 130, 0, 0.1);
    }

    .card.highlighted.interactive:hover {
      border-color: rgba(240, 130, 0, 0.5);
      box-shadow: 0 0 40px rgba(240, 130, 0, 0.15);
    }

    /* Header & Icon area */
    .icon-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 1rem; /* p-4 */
      border-radius: var(--edwyn-radius-xl, 1rem); /* rounded-2xl */
      background-color: var(--edwyn-color-primary-alpha-10, rgba(240, 130, 0, 0.1));
      color: var(--edwyn-color-primary, #f08200);
      margin-bottom: 1.5rem; /* mb-6 */
      transition: transform 500ms ease;
    }

    .card.highlighted .icon-container {
      background-color: var(--edwyn-color-primary, #f08200);
      color: #ffffff;
      box-shadow: 0 10px 15px -3px rgba(240, 130, 0, 0.2);
    }

    .card.interactive:hover .icon-container {
      transform: translateY(-8px); /* group-hover:-translate-y-2 */
    }

    /* Content area */
    .body-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }

    ::slotted([slot='title']) {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif !important;
      font-size: 1.5rem; /* text-2xl */
      font-weight: 700; /* font-bold */
      letter-spacing: -0.025em;
      color: var(--edwyn-color-text, #ffffff) !important;
      margin: 0 0 1rem 0; /* mb-4 */
      transition: color var(--edwyn-transition-fast, 150ms ease);
    }

    .card.interactive:hover ::slotted([slot='title']) {
      color: var(--edwyn-color-primary, #f08200);
    }

    ::slotted([slot='description']),
    ::slotted(p) {
      font-family: var(--edwyn-font-body), 'Inter', sans-serif !important;
      font-size: 1rem;
      font-weight: 400;
      color: var(--edwyn-color-text-muted, #a3a8aa) !important;
      line-height: 1.625; /* leading-relaxed */
      margin: 0 0 1.5rem 0;
    }

    /* Footer area */
    .footer-content {
      position: relative;
      z-index: 1;
      margin-top: auto;
      padding-top: 1rem;
    }
  `;

  /**
   * Enables hover elevate and orange glow effect.
   */
  @property({ type: Boolean })
  interactive = true;

  /**
   * Highlights the card (used for Notre Modèle center pillar).
   */
  @property({ type: Boolean })
  highlighted = false;

  override render() {
    const dynamicClasses = [
      this.interactive ? 'interactive' : '',
      this.highlighted ? 'highlighted' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div part="card" class="card ${dynamicClasses}">
        <div class="glow-overlay"></div>
        <div part="body" class="body-content">
          <div part="icon-container" class="icon-container">
            <slot name="icon"></slot>
          </div>
          <slot name="title"></slot>
          <slot name="description"></slot>
          <slot></slot>
        </div>
        <div part="footer" class="footer-content">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-card': EdwynCard;
  }
}
