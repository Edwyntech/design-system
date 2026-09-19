import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'primary' | 'subtle' | 'outline' | 'glass';
export type BadgeSize = 'sm' | 'md';

/**
 * Edwyn status badge and skill pill tag.
 *
 * @summary Edwyn status badge and skill pill tag
 * @tag edwyn-badge
 *
 * @slot - Badge text label
 * @slot prefix - Leading icon
 *
 * @csspart badge - The badge container element
 * @csspart dot - The pulsing status indicator dot
 * @cssprop --edwyn-color-primary - Primary brand accent color
 */
@customElement('edwyn-badge')
export class EdwynBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-weight: 600;
      line-height: 1;
      text-transform: none;
      letter-spacing: 0.01em;
      transition: all var(--edwyn-transition-fast, 150ms ease);
    }

    /* Sizes */
    .size-sm {
      font-size: var(--edwyn-font-size-xs, 0.75rem);
      padding: 0.25rem 0.625rem;
    }

    .size-md {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      padding: 0.375rem 0.875rem;
    }

    /* Shapes */
    .pill {
      border-radius: var(--edwyn-radius-full, 9999px);
    }

    .rounded {
      border-radius: var(--edwyn-radius-md, 8px);
    }

    /* Variants */
    .variant-primary {
      background-color: var(--edwyn-color-primary, #f08200);
      color: var(--edwyn-color-primary-contrast, #0f172a);
    }

    .variant-subtle {
      background-color: var(--edwyn-color-primary-alpha-10, rgba(240, 130, 0, 0.1));
      color: var(--edwyn-badge-subtle-text, #ff8f1a);
      border: 1px solid var(--edwyn-color-border-primary, rgba(240, 130, 0, 0.25));
    }

    .variant-glass {
      background-color: var(--edwyn-color-card, rgba(255, 255, 255, 0.05));
      color: var(--edwyn-color-text, #ffffff);
      border: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.08));
      backdrop-filter: blur(8px);
    }

    .variant-outline {
      background-color: transparent;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      border: 1px solid var(--edwyn-color-border-bright, rgba(255, 255, 255, 0.15));
    }

    /* Dot */
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .dot.pulse {
      box-shadow: 0 0 8px currentColor;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `;

  /**
   * Style variant of the badge.
   */
  @property({ type: String })
  variant: BadgeVariant = 'subtle';

  /**
   * Badge size.
   */
  @property({ type: String })
  size: BadgeSize = 'sm';

  /**
   * Whether the badge is pill-shaped.
   */
  @property({ type: Boolean })
  pill = true;

  /**
   * Whether the badge has rounded borders instead of pill shape.
   */
  @property({ type: Boolean })
  rounded = false;

  /**
   * Whether to display a pulsing status dot indicator.
   */
  @property({ type: Boolean })
  dot = false;

  override render() {
    const isPill = this.rounded ? false : this.pill;
    const dynamicClasses = [
      `variant-${this.variant}`,
      `size-${this.size}`,
      isPill ? 'pill' : 'rounded',
    ].join(' ');

    return html`
      <span part="badge" class="badge ${dynamicClasses}">
        ${this.dot ? html`<span part="dot" class="dot pulse" aria-hidden="true"></span>` : ''}
        <slot name="prefix"></slot>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-badge': EdwynBadge;
  }
}
