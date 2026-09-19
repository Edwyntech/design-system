import { describe, it, expect, beforeEach, vi } from 'vitest';
import './edwyn-input';
import { EdwynInput } from './edwyn-input';

describe('EdwynInput', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-input custom element', () => {
    expect(customElements.get('edwyn-input')).toBeDefined();
  });

  it('renders with default attributes and empty value', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    document.body.appendChild(input);
    await input.updateComplete;

    expect(input.value).toBe('');
    expect(input.type).toBe('text');
    expect(input.size).toBe('md');
    expect(input.disabled).toBe(false);
    expect(input.readonly).toBe(false);
    expect(input.required).toBe(false);
    expect(input.clearable).toBe(false);

    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput).not.toBeNull();
    expect(nativeInput?.getAttribute('type')).toBe('text');
    expect(nativeInput?.value).toBe('');
    expect(input.shadowRoot?.querySelector('.size-md')).not.toBeNull();
  });

  it('renders label with required indicator when set, and plain label without it', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.label = 'Adresse Email';
    input.required = true;
    document.body.appendChild(input);
    await input.updateComplete;

    let label = input.shadowRoot?.querySelector('label');
    expect(label).not.toBeNull();
    expect(label?.textContent).toContain('Adresse Email');
    expect(label?.querySelector('.required-marker')).not.toBeNull();

    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput?.hasAttribute('required')).toBe(true);
    expect(label?.getAttribute('for')).toBe(nativeInput?.id);

    // Label without required marker
    input.required = false;
    await input.updateComplete;
    label = input.shadowRoot?.querySelector('label');
    expect(label?.querySelector('.required-marker')).toBeNull();

    // Clear when inputElement is undefined
    Object.defineProperty(input, 'inputElement', { get: () => null, configurable: true });
    (input as any).handleClear(new MouseEvent('click'));
    expect(input.value).toBe('');
  });

  it('handles focus, blur, and select methods properly', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.value = 'Test Focus';
    document.body.appendChild(input);
    await input.updateComplete;

    const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    const focusSpy = vi.spyOn(nativeInput, 'focus');
    const blurSpy = vi.spyOn(nativeInput, 'blur');
    const selectSpy = vi.spyOn(nativeInput, 'select');

    input.focus();
    expect(focusSpy).toHaveBeenCalled();

    // Trigger focus event on native input to verify .focused CSS class
    nativeInput.dispatchEvent(new Event('focus'));
    await input.updateComplete;
    expect(input.shadowRoot?.querySelector('.input-box.focused')).not.toBeNull();

    input.blur();
    expect(blurSpy).toHaveBeenCalled();

    nativeInput.dispatchEvent(new Event('blur'));
    await input.updateComplete;
    expect(input.shadowRoot?.querySelector('.input-box.focused')).toBeNull();

    input.select();
    expect(selectSpy).toHaveBeenCalled();
  });

  it('dispatches input and change events when typed into', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    document.body.appendChild(input);
    await input.updateComplete;

    const inputHandler = vi.fn();
    const changeHandler = vi.fn();
    input.addEventListener('input', inputHandler);
    input.addEventListener('change', changeHandler);

    const nativeInput = input.shadowRoot?.querySelector('input') as HTMLInputElement;
    nativeInput.value = '750';

    nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    await input.updateComplete;
    expect(input.value).toBe('750');
    expect(inputHandler).toHaveBeenCalledTimes(1);
    expect(inputHandler.mock.calls[0][0].detail.value).toBe('750');

    nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    await input.updateComplete;
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler.mock.calls[0][0].detail.value).toBe('750');
  });

  it('supports clearable functionality with clear button', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.clearable = true;
    input.value = 'Clear me';
    document.body.appendChild(input);
    await input.updateComplete;

    let clearBtn = input.shadowRoot?.querySelector('.clear-btn') as HTMLButtonElement;
    expect(clearBtn).not.toBeNull();

    const inputHandler = vi.fn();
    const changeHandler = vi.fn();
    input.addEventListener('input', inputHandler);
    input.addEventListener('change', changeHandler);

    clearBtn.click();
    await input.updateComplete;

    expect(input.value).toBe('');
    expect(inputHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledTimes(1);

    // Clear button should disappear once value is empty
    clearBtn = input.shadowRoot?.querySelector('.clear-btn') as HTMLButtonElement;
    expect(clearBtn).toBeNull();
  });

  it('renders error message and toggles error state', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.errorMessage = 'Champ invalide';
    document.body.appendChild(input);
    await input.updateComplete;

    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput?.getAttribute('aria-invalid')).toBe('true');
    expect(input.shadowRoot?.querySelector('.input-box.error')).not.toBeNull();

    const errorText = input.shadowRoot?.querySelector('.error-text');
    expect(errorText?.textContent?.trim()).toBe('Champ invalide');
    expect(errorText?.getAttribute('role')).toBe('alert');
    expect(nativeInput?.getAttribute('aria-describedby')).toBe(errorText?.id);
  });

  it('renders helper text when no error message is provided', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.helperText = 'Format: JJ/MM/AAAA';
    document.body.appendChild(input);
    await input.updateComplete;

    const helperText = input.shadowRoot?.querySelector('.helper-text');
    expect(helperText?.textContent?.trim()).toBe('Format: JJ/MM/AAAA');
    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput?.getAttribute('aria-describedby')).toBe(helperText?.id);
  });

  it('handles numeric parameters min, max, step, placeholder and autocomplete', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.type = 'number';
    input.min = '100';
    input.max = '2000';
    input.step = '10';
    input.placeholder = 'TJM';
    input.autocomplete = 'on';
    document.body.appendChild(input);
    await input.updateComplete;

    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput?.getAttribute('type')).toBe('number');
    expect(nativeInput?.getAttribute('min')).toBe('100');
    expect(nativeInput?.getAttribute('max')).toBe('2000');
    expect(nativeInput?.getAttribute('step')).toBe('10');
    expect(nativeInput?.getAttribute('placeholder')).toBe('TJM');
    expect(nativeInput?.getAttribute('autocomplete')).toBe('on');
  });

  it('applies disabled and readonly states appropriately', async () => {
    const input = document.createElement('edwyn-input') as EdwynInput;
    input.disabled = true;
    input.readonly = true;
    input.clearable = true;
    input.value = 'Non-editable';
    document.body.appendChild(input);
    await input.updateComplete;

    const nativeInput = input.shadowRoot?.querySelector('input');
    expect(nativeInput?.hasAttribute('disabled')).toBe(true);
    expect(nativeInput?.hasAttribute('readonly')).toBe(true);
    expect(input.shadowRoot?.querySelector('.input-box.disabled')).not.toBeNull();
    // Clear button must not be shown when disabled/readonly
    expect(input.shadowRoot?.querySelector('.clear-btn')).toBeNull();
  });
});
