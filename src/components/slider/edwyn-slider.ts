import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

let nextSliderId = 0;

/**
 * Modern interactive range slider component extracted from the Edwyn Tech Salary Simulator.
 * Features signature Orange track filling, interactive thumb with glow on hover/focus,
 * customizable labels, sublabels, units, boundary markers, and warning indicators.
 * Fully supports Dark Slate (#292e30) and Light Mode themes.
 *
 * @summary Edwyn interactive range slider
 * @tag edwyn-slider
 *
 * @csspart root - Root wrapper container
 * @csspart header - Header container with labels and value display
 * @csspart label - Title label
 * @csspart sublabel - Subtitle description label
 * @csspart value-display - Value container
 * @csspart value-number - Numeric value span
 * @csspart value-unit - Unit text span
 * @csspart warning - Warning indicator text
 * @csspart track-wrap - Range input wrapper container
 * @csspart input - Native HTML range input
 * @csspart bounds - Lower and upper boundary bounds
 *
 * @fires input - Fired continuously as the user drags the slider thumb
 * @fires change - Fired when the user releases or commits a new value
 */
@customElement('edwyn-slider')
export class EdwynSlider extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      box-sizing: border-box;
    }

    .slider-group {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      width: 100%;
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 1rem;
    }

    .label-box {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .slider-label {
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--edwyn-color-text, #ffffff);
      line-height: 1.25;
      user-select: none;
      cursor: pointer;
    }

    .slider-sublabel {
      font-size: 0.75rem;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      margin-top: 0.25rem;
      line-height: 1.2;
    }

    .value-display {
      text-align: right;
      flex-shrink: 0;
    }

    .value-number {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--edwyn-color-primary, #f08200);
      line-height: 1;
    }

    .value-unit {
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      margin-left: 0.25rem;
    }

    .warning-indicator {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--edwyn-color-error, #ef4444);
      margin-top: 0.25rem;
    }

    /* Range Slider Styling */
    .slider-track-wrap {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      width: 100%;
    }

    .range-input {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      border-radius: var(--edwyn-radius-full, 9999px);
      background: var(--edwyn-slider-track-empty, rgba(255, 255, 255, 0.2));
      outline: none;
      margin: 0;
      cursor: pointer;
      position: relative;
      touch-action: none;
      transition: opacity var(--edwyn-transition-fast, 150ms ease);
    }

    .range-input:focus-visible {
      outline: 2px solid var(--edwyn-color-primary, #f08200);
      outline-offset: 4px;
    }

    /* Webkit Slider Thumb */
    .range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: var(--edwyn-radius-full, 9999px);
      border: 2px solid var(--edwyn-color-primary, #f08200);
      background-color: var(--edwyn-slider-thumb-bg, var(--edwyn-color-bg, #292e30));
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      transition:
        transform var(--edwyn-transition-fast, 150ms ease),
        box-shadow var(--edwyn-transition-fast, 150ms ease);
    }

    .range-input::-webkit-slider-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 0 12px var(--edwyn-color-primary, #f08200);
    }

    /* Firefox Slider Thumb */
    .range-input::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: var(--edwyn-radius-full, 9999px);
      border: 2px solid var(--edwyn-color-primary, #f08200);
      background-color: var(--edwyn-slider-thumb-bg, var(--edwyn-color-bg, #292e30));
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
      border-style: solid;
      transition:
        transform var(--edwyn-transition-fast, 150ms ease),
        box-shadow var(--edwyn-transition-fast, 150ms ease);
    }

    .range-input::-moz-range-thumb:hover {
      transform: scale(1.15);
      box-shadow: 0 0 12px var(--edwyn-color-primary, #f08200);
    }

    /* Bounds Labeling */
    .slider-bounds {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Disabled State */
    :host([disabled]) {
      pointer-events: none;
    }

    :host([disabled]) .slider-label,
    :host([disabled]) .value-number {
      opacity: 0.7;
    }

    :host([disabled]) .range-input {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `;

  /**
   * Current numeric value of the slider.
   */
  @property({ type: Number })
  value = 0;

  /**
   * Minimum permitted value.
   */
  @property({ type: Number })
  min = 0;

  /**
   * Maximum permitted value.
   */
  @property({ type: Number })
  max = 100;

  /**
   * Stepping increment interval.
   */
  @property({ type: Number })
  step = 1;

  /**
   * Main title label displayed above the slider.
   */
  @property({ type: String })
  label = '';

  /**
   * Optional subtitle description displayed below the label.
   */
  @property({ type: String })
  sublabel = '';

  /**
   * Unit displayed beside the current value (e.g., '€', 'ans', 'jours').
   */
  @property({ type: String })
  unit = '';

  /**
   * Optional custom label for the minimum boundary. Defaults to min value + unit.
   */
  @property({ type: String, attribute: 'min-label' })
  minLabel = '';

  /**
   * Optional custom label for the maximum boundary. Defaults to max value + unit.
   */
  @property({ type: String, attribute: 'max-label' })
  maxLabel = '';

  /**
   * Optional warning or alert message displayed below the value.
   */
  @property({ type: String })
  warning = '';

  /**
   * Whether the slider is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Form field name.
   */
  @property({ type: String })
  name = '';

  /**
   * HTML element ID for the inner range input.
   */
  @property({ type: String, attribute: 'input-id' })
  inputId = `edwyn-slider-${++nextSliderId}`;

  override updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value);

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value, name: this.name },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = parseFloat(input.value);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, name: this.name },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _calculatePercent(): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const clamped = Math.max(this.min, Math.min(this.max, this.value));
    return Math.max(0, Math.min(100, ((clamped - this.min) / range) * 100));
  }

  override render() {
    const percent = this._calculatePercent();
    const activeTrackStyle = `background: linear-gradient(to right, var(--edwyn-color-primary, #f08200) 0%, var(--edwyn-color-primary, #f08200) ${percent}%, var(--edwyn-slider-track-empty, rgba(255, 255, 255, 0.2)) ${percent}%, var(--edwyn-slider-track-empty, rgba(255, 255, 255, 0.2)) 100%);`;

    const lowerBound = this.minLabel || `${this.min} ${this.unit}`.trim();
    const upperBound = this.maxLabel || `${this.max} ${this.unit}`.trim();

    return html`
      <div class="slider-group" part="root">
        ${
          this.label || this.unit
            ? html`
                <div class="slider-header" part="header">
                  <div class="label-box">
                    <label class="slider-label" for="${this.inputId}" part="label"
                      >${this.label}</label
                    >
                    ${
                      this.sublabel
                        ? html`<span class="slider-sublabel" part="sublabel"
                            >${this.sublabel}</span
                          >`
                        : null
                    }
                  </div>
                  <div class="value-display" part="value-display">
                    <div>
                      <span class="value-number" part="value-number">${this.value}</span>
                      ${this.unit ? html`<span class="value-unit" part="value-unit">${this.unit}</span>` : null}
                    </div>
                    ${
                      this.warning
                        ? html`<div class="warning-indicator" part="warning">${this.warning}</div>`
                        : null
                    }
                  </div>
                </div>
              `
            : null
        }

        <div class="slider-track-wrap" part="track-wrap">
          <input
            id="${this.inputId}"
            type="range"
            part="input"
            class="range-input"
            .min=${String(this.min)}
            .max=${String(this.max)}
            .step=${String(this.step)}
            .value=${String(this.value)}
            ?disabled=${this.disabled}
            aria-label="${this.label || 'Curseur de sélection'}"
            aria-valuenow="${this.value}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuetext="${this.value}${this.unit ? ' ' + this.unit : ''}"
            style="${activeTrackStyle}"
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
        </div>

        <div class="slider-bounds" part="bounds">
          <span>${lowerBound}</span>
          <span>${upperBound}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-slider': EdwynSlider;
  }
}
