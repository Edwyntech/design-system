import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'simulator';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Edwyn interactive button supporting multiple variants, sizes and pill shapes.
 *
 * @summary Edwyn interactive button
 * @tag edwyn-button
 *
 * @slot - Button text content
 * @slot prefix - Leading icon or indicator
 * @slot suffix - Trailing icon or indicator
 *
 * @csspart button - The internal native button or anchor element
 * @cssprop --edwyn-color-primary - Primary brand color
 * @cssprop --edwyn-font-body - Body font family
 *
 * @fires click - Fired when the button is activated
 */
@customElement('edwyn-button')
export class EdwynButton extends LitElement {
  static override styles = css`
    /*noinspection CssUnusedSymbol*/
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    :host([full-width]) {
      display: block;
      width: 100%;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      transition: all var(--edwyn-transition-base, 300ms cubic-bezier(0.4, 0, 0.2, 1));
      outline: none;
      border: 1px solid transparent;
      line-height: 1;
    }

    .btn:focus-visible {
      box-shadow:
        0 0 0 2px var(--edwyn-color-bg, #292e30),
        0 0 0 4px var(--edwyn-color-primary, #f08200);
    }

    /* Sizes */
    .size-sm {
      font-size: var(--edwyn-font-size-xs, 0.75rem);
      padding: 0.375rem 0.875rem;
      height: 32px;
    }

    .size-md {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      padding: 0.5rem 1.25rem;
      height: 40px;
    }

    .size-lg {
      font-size: var(--edwyn-font-size-base, 1rem);
      padding: 0.75rem 1.75rem;
      height: 48px;
    }

    /* Shapes */
    .pill {
      border-radius: var(--edwyn-radius-full, 9999px);
    }

    .rounded {
      border-radius: var(--edwyn-radius-md, 8px);
    }

    /* Primary */
    .variant-primary {
      background-color: var(--edwyn-color-primary, #f08200);
      color: var(--edwyn-color-primary-contrast, #0f172a);
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(240, 130, 0, 0.25);
    }

    .variant-primary:hover:not(.disabled) {
      background-color: var(--edwyn-color-primary-hover, #ff8f1a);
      box-shadow: var(--edwyn-glow-orange-sm, 0 0 15px rgba(240, 130, 0, 0.35));
      transform: translateY(-1px);
    }

    .variant-primary:active:not(.disabled) {
      background-color: var(--edwyn-color-primary-active, #d97400);
      transform: translateY(0);
    }

    /* Secondary */
    .variant-secondary {
      background-color: var(--edwyn-color-bg-elevated, #32383a);
      border-color: var(--edwyn-color-border, rgba(255, 255, 255, 0.08));
      color: var(--edwyn-color-text, #ffffff);
    }

    .variant-secondary:hover:not(.disabled) {
      background-color: var(--edwyn-color-card-hover, rgba(255, 255, 255, 0.12));
      border-color: var(--edwyn-color-border-primary, rgba(240, 130, 0, 0.3));
      transform: translateY(-1px);
    }

    /* Outline */
    .variant-outline {
      background-color: transparent;
      border-color: var(--edwyn-color-border-bright, rgba(255, 255, 255, 0.15));
      color: var(--edwyn-color-text, #ffffff);
    }

    .variant-outline:hover:not(.disabled) {
      background-color: var(--edwyn-color-primary, #f08200);
      border-color: var(--edwyn-color-primary, #f08200);
      color: var(--edwyn-color-primary-contrast, #0f172a);
      box-shadow: var(--edwyn-glow-orange-sm, 0 0 15px rgba(240, 130, 0, 0.25));
    }

    /* Ghost */
    .variant-ghost {
      background-color: transparent;
      border-color: transparent;
      color: var(--edwyn-color-text-muted, #a3a8aa);
    }

    .variant-ghost:hover:not(.disabled) {
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--edwyn-color-text-primary, #f08200);
    }

    /* Simulator Special Gradient */
    .variant-simulator {
      background: linear-gradient(90deg, rgba(240, 130, 0, 0.2) 0%, rgba(240, 130, 0, 0.1) 100%);
      border: 1px solid rgba(240, 130, 0, 0.3);
      color: var(--edwyn-color-text-primary, #f08200);
      font-weight: 700;
    }

    .variant-simulator:hover:not(.disabled) {
      background: linear-gradient(90deg, rgba(240, 130, 0, 0.3) 0%, rgba(240, 130, 0, 0.2) 100%);
      border-color: rgba(240, 130, 0, 0.5);
      box-shadow: var(--edwyn-glow-orange-sm, 0 0 15px rgba(240, 130, 0, 0.2));
      transform: translateY(-1px);
    }

    /* Disabled State */
    .disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Loading Spinner */
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }\n    }\n  `;

  /**
   * Visual variant of the button.
   */
  @property({ type: String })
  variant: ButtonVariant = 'primary';

  /**
   * Button size.
   */
  @property({ type: String })
  size: ButtonSize = 'md';

  /**
   * Whether the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button has fully rounded pill borders.
   */
  @property({ type: Boolean })
  pill = true;

  /**
   * Whether the button has medium rounded borders instead of pill shape.
   */
  @property({ type: Boolean })
  rounded = false;

  /**
   * Whether the button spans 100% of the parent width.
   */
  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Whether the button is in a loading state.
   */
  @property({ type: Boolean })
  loading = false;

  /**
   * Optional URL link target (renders as an anchor if specified).
   */
  @property({ type: String })
  href?: string;

  /**
   * Link target (e.g. _blank, _self).
   */
  @property({ type: String })
  target?: string;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleHostClick, true);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleHostClick, true);
  }

  private handleHostClick = (e: MouseEvent) => {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  private handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  override render() {
    const isPill = this.rounded ? false : this.pill;
    const dynamicClasses = [
      `variant-${this.variant}`,
      `size-${this.size}`,
      isPill ? 'pill' : 'rounded',
      this.disabled || this.loading ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = html`
      ${
        this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : html`<slot name="prefix"></slot>`
      }
      <slot></slot>
      <slot name="suffix"></slot>
    `;

    if (this.href) {
      return html`
        <a
          part="button"
          class="btn ${dynamicClasses}"
          href="${this.href}"
          target="${this.target || '_self'}"
          @click=${this.handleClick}
          tabindex="${this.disabled ? -1 : 0}"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        part="button"
        class="btn ${dynamicClasses}"
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-button': EdwynButton;
  }
}
