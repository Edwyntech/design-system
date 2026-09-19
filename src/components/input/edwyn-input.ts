import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '../icon/edwyn-icon';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';

let nextUniqueId = 0;

/**
 * Modern input field with Edwyn Tech dark glassmorphism styling, floating focus glow,
 * prefix/suffix slot integrations, accessibility, and validation states.
 * Fully supports Dark Slate (#292e30) and Light Mode (#f8fafc) themes.
 *
 * @summary Edwyn input field
 * @tag edwyn-input
 * @csspart root - Root wrapper container
 * @csspart label - Label element
 * @csspart input-box - Container wrapping input and prefix/suffix
 * @csspart input - Inner HTML input element
 * @csspart prefix - Prefix slot container
 * @csspart suffix - Suffix slot container
 * @csspart helper-text - Hint message container
 * @csspart error-text - Error message container
 *
 * @fires input - Fired when the input value changes
 * @fires change - Fired when a change is committed
 */
@customElement('edwyn-input')
export class EdwynInput extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
    }

    .form-control {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      width: 100%;
    }

    /* Label */
    .label {
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      font-weight: 500;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      user-select: none;
      cursor: pointer;
    }

    .required-marker {
      color: var(--edwyn-color-primary, #f08200);
    }

    /* Input Box Wrapper */
    .input-box {
      display: flex;
      align-items: center;
      width: 100%;
      background: var(--edwyn-color-bg-darker, #1e2224);
      border: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.1));
      border-radius: var(--edwyn-radius-md, 8px);
      box-sizing: border-box;
      transition: all var(--edwyn-transition-fast, 150ms ease);
      position: relative;
    }

    .input-box:hover:not(.disabled) {
      border-color: var(--edwyn-color-border-bright, rgba(255, 255, 255, 0.2));
    }

    .input-box.focused:not(.disabled):not(.error) {
      border-color: var(--edwyn-color-primary, #f08200);
      box-shadow:
        0 0 0 1px var(--edwyn-color-primary, #f08200),
        var(--edwyn-glow-orange-sm, 0 0 12px rgba(240, 130, 0, 0.25));
    }

    .input-box.error:not(.disabled) {
      border-color: var(--edwyn-color-error, #fb2c36);
      box-shadow:
        0 0 0 1px var(--edwyn-color-error, #fb2c36),
        0 0 12px rgba(239, 68, 68, 0.25);
    }

    .input-box.disabled {
      opacity: 0.45;
      cursor: not-allowed;
      background: var(--edwyn-color-white-2, rgba(255, 255, 255, 0.02));
    }

    /* Native Input */
    input {
      flex: 1;
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      color: var(--edwyn-color-text, #ffffff);
      font-family: inherit;
      box-sizing: border-box;
    }

    input::placeholder {
      color: var(--edwyn-color-text-dim, rgba(163, 168, 170, 0.5));
    }

    input:disabled {
      cursor: not-allowed;
    }

    /* Sizes */
    .size-sm {
      height: 32px;
      padding: 0 0.625rem;
      font-size: var(--edwyn-font-size-xs, 0.75rem);
    }

    .size-md {
      height: 40px;
      padding: 0 0.875rem;
      font-size: var(--edwyn-font-size-sm, 0.875rem);
    }

    .size-lg {
      height: 48px;
      padding: 0 1.125rem;
      font-size: var(--edwyn-font-size-base, 1rem);
    }

    /* Prefix & Suffix slots */
    .prefix,
    .suffix {
      display: inline-flex;
      align-items: center;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      font-size: var(--edwyn-font-size-sm, 0.875rem);
      flex-shrink: 0;
    }

    .prefix {
      margin-right: 0.5rem;
    }

    .suffix {
      margin-left: 0.5rem;
    }

    /* Clear button */
    .clear-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: var(--edwyn-color-text-muted, #a3a8aa);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.375rem;
      transition: color var(--edwyn-transition-fast, 150ms ease);
    }

    .clear-btn:hover {
      color: var(--edwyn-color-text, #ffffff);
    }

    /* Messages */
    .helper-text,
    .error-text {
      font-size: var(--edwyn-font-size-xs, 0.75rem);
      line-height: 1.4;
      margin: 0;
    }

    .helper-text {
      color: var(--edwyn-color-text-muted, #a3a8aa);
    }

    .error-text {
      color: var(--edwyn-color-error-text, #ff6b6b);
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  `;

  private inputId = `edwyn-input-${++nextUniqueId}`;
  private descId = `edwyn-input-desc-${nextUniqueId}`;

  @query('input')
  private inputElement?: HTMLInputElement;

  /**
   * Current value of the input.
   */
  @property({ type: String })
  value = '';

  /**
   * Field type (text, number, email, password, etc.).
   */
  @property({ type: String })
  type: InputType = 'text';

  /**
   * Accessible field label.
   */
  @property({ type: String })
  label = '';

  /**
   * Placeholder hint text.
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Informative helper message below the input.
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  /**
   * Error message displayed in red, triggering error state.
   */
  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  /**
   * Size of the input container (sm, md, lg).
   */
  @property({ type: String })
  size: InputSize = 'md';

  /**
   * Form field name.
   */
  @property({ type: String })
  name = '';

  /**
   * Whether the field is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is read-only.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the field is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether to show a clear button when text is present.
   */
  @property({ type: Boolean })
  clearable = false;

  /**
   * Minimum value for number inputs or minlength for text.
   */
  @property({ type: String })
  min?: string;

  /**
   * Maximum value for number inputs or maxlength for text.
   */
  @property({ type: String })
  max?: string;

  /**
   * Step increment for number inputs.
   */
  @property({ type: String })
  step?: string;

  /**
   * Autocomplete attribute value.
   */
  @property({ type: String })
  autocomplete = 'off';

  @state()
  private isFocused = false;

  /**
   * Sets focus onto the underlying input element.
   */
  override focus() {
    this.inputElement?.focus();
  }

  /**
   * Removes focus from the underlying input element.
   */
  override blur() {
    this.inputElement?.blur();
  }

  /**
   * Selects all text within the input.
   */
  select() {
    this.inputElement?.select();
  }

  private handleFocus = () => {
    this.isFocused = true;
  };

  private handleBlur = () => {
    this.isFocused = false;
  };

  private handleInput = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleChange = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.value = '';
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputElement.focus();
    }
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );
  };

  override render() {
    const hasError = Boolean(this.errorMessage);
    const boxClasses = [
      'input-box',
      `size-${this.size}`,
      this.isFocused ? 'focused' : '',
      hasError ? 'error' : '',
      this.disabled ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return html`
      <div class="form-control" part="root">
        ${
          this.label
            ? html`
                <label class="label" for="${this.inputId}" part="label">
                  ${this.label}
                  ${this.required ? html`<span class="required-marker" aria-hidden="true">*</span>` : ''}
                </label>
              `
            : ''
        }

        <div class="${boxClasses}" part="input-box">
          <div class="prefix" part="prefix">
            <slot name="prefix"></slot>
          </div>

          <input
            id="${this.inputId}"
            part="input"
            type="${this.type}"
            .value="${this.value}"
            name="${this.name}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            ?required="${this.required}"
            min="${this.min || ''}"
            max="${this.max || ''}"
            step="${this.step || ''}"
            autocomplete="${this.autocomplete}"
            aria-invalid="${hasError ? 'true' : 'false'}"
            aria-describedby="${hasError || this.helperText ? this.descId : ''}"
            @focus="${this.handleFocus}"
            @blur="${this.handleBlur}"
            @input="${this.handleInput}"
            @change="${this.handleChange}"
          />

          ${
            this.clearable && this.value && !this.disabled && !this.readonly
              ? html`
                  <button
                    type="button"
                    class="clear-btn"
                    aria-label="Effacer le texte"
                    @click="${this.handleClear}"
                  >
                    <edwyn-icon name="close" size="16"></edwyn-icon>
                  </button>
                `
              : ''
          }

          <div class="suffix" part="suffix">
            <slot name="suffix"></slot>
          </div>
        </div>

        ${
          hasError
            ? html`
                <p id="${this.descId}" class="error-text" part="error-text" role="alert">
                  ${this.errorMessage}
                </p>
              `
            : this.helperText
              ? html`
                  <p id="${this.descId}" class="helper-text" part="helper-text">
                    ${this.helperText}
                  </p>
                `
              : ''
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-input': EdwynInput;
  }
}
