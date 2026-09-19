import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Key metric statistic display item with large Syne typography.
 * Aligned with https://www.edwyn.tech
 *
 * @summary Edwyn stat item metric
 * @tag edwyn-stat-item
 *
 * @csspart value - The metric value element
 * @csspart label - The description label element
 * @cssprop --edwyn-font-heading - Heading font family for the number (Syne)
 * @cssprop --edwyn-color-primary - Brand accent color for the value
 */
@customElement('edwyn-stat-item')
export class EdwynStatItem extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem; /* py-10 px-4 */
      text-align: center;
      gap: 0.25rem; /* gap-1 */
      box-sizing: border-box;
    }

    .value {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: 1.875rem; /* text-3xl */
      font-weight: 700; /* font-bold */
      color: var(--edwyn-color-primary, #f08200);
      line-height: 1.1;
      letter-spacing: -0.025em;
    }

    .label {
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: 0.75rem; /* text-xs */
      color: var(--edwyn-color-text-muted, #a3a8aa);
      max-width: 200px;
      line-height: 1.35;
    }

    @media (min-width: 768px) {
      .value {
        font-size: 2.25rem; /* md:text-4xl */
      }
      .label {
        font-size: 0.875rem; /* md:text-sm */
      }
    }
  `;

  /**
   * Main number or metric value (e.g. 2021, 3,2M€, +30).
   */
  @property({ type: String })
  value = '';

  /**
   * Description label underneath the value.
   */
  @property({ type: String })
  label = '';

  override render() {
    return html`
      <div part="value" class="value">${this.value}</div>
      <div part="label" class="label">${this.label}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-stat-item': EdwynStatItem;
  }
}
