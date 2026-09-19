import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type EdwynIconName =
  | 'rocket'
  | 'users'
  | 'check'
  | 'circle-check'
  | 'arrow-right'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'logo'
  | 'sparkles';

/**
 * Edwyn vector SVG icon component.
 *
 * @summary Edwyn vector SVG icon component
 * @tag edwyn-icon
 *
 * @csspart icon - The SVG vector icon wrapper container
 * @cssprop --edwyn-icon-size - Dimensions of the icon (defaults to 1.25rem)
 */
@customElement('edwyn-icon')
export class EdwynIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 1;
      width: var(--edwyn-icon-size, 1.25rem);
      height: var(--edwyn-icon-size, 1.25rem);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `;

  /**
   * Name of the icon to display.
   */
  @property({ type: String })
  name: EdwynIconName = 'rocket';

  /**
   * Pixel size of the icon.
   */
  @property({ type: Number })
  size?: number;

  private renderIcon() {
    switch (this.name) {
      case 'rocket':
        return svg`
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        `;
      case 'users':
        return svg`
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        `;
      case 'check':
        return svg`<polyline points="20 6 9 17 4 12"></polyline>`;
      case 'circle-check':
        return svg`
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        `;
      case 'arrow-right':
        return svg`
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        `;
      case 'chevron-down':
        return svg`<polyline points="6 9 12 15 18 9"></polyline>`;
      case 'menu':
        return svg`
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        `;
      case 'close':
        return svg`
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
      case 'sparkles':
        return svg`
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
        `;
      case 'logo':
        return svg`
          <rect width="24" height="24" rx="6" fill="#F08200" stroke="none"></rect>
          <text x="12" y="17" font-family="'Syne', sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">E</text>
        `;
      default:
        return svg`<circle cx="12" cy="12" r="10"></circle>`;
    }
  }

  override render() {
    const customStyle = this.size ? `width: ${this.size}px; height: ${this.size}px;` : '';
    return html`
      <span part="icon" style="${customStyle}" class="icon-wrapper">
        <svg viewBox="0 0 24 24">${this.renderIcon()}</svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-icon': EdwynIcon;
  }
}
