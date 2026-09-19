import { describe, it, expect, beforeEach, vi } from 'vitest';
import './edwyn-button';
import { EdwynButton } from './edwyn-button';

describe('EdwynButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-button custom element', () => {
    expect(customElements.get('edwyn-button')).toBeDefined();
  });

  it('creates and renders a button with default values', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.textContent = 'Click me';
    document.body.appendChild(btn);
    await btn.updateComplete;

    expect(btn.variant).toBe('primary');
    expect(btn.size).toBe('md');
    expect(btn.pill).toBe(true);
    expect(btn.disabled).toBe(false);
    expect(btn.loading).toBe(false);
    expect(btn.shadowRoot?.querySelector('button')).not.toBeNull();
    expect(btn.shadowRoot?.querySelector('.variant-primary')).not.toBeNull();
    expect(btn.shadowRoot?.querySelector('.size-md')).not.toBeNull();
    expect(btn.shadowRoot?.querySelector('.pill')).not.toBeNull();
  });

  it('renders all variants and sizes with correct classes', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'simulator'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const variant of variants) {
      const btn = document.createElement('edwyn-button') as EdwynButton;
      btn.variant = variant;
      document.body.appendChild(btn);
      await btn.updateComplete;
      expect(btn.shadowRoot?.querySelector(`.variant-${variant}`)).not.toBeNull();
      document.body.removeChild(btn);
    }

    for (const size of sizes) {
      const btn = document.createElement('edwyn-button') as EdwynButton;
      btn.size = size;
      document.body.appendChild(btn);
      await btn.updateComplete;
      expect(btn.shadowRoot?.querySelector(`.size-${size}`)).not.toBeNull();
      document.body.removeChild(btn);
    }
  });

  it('handles rounded vs pill shape', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.rounded = true;
    document.body.appendChild(btn);
    await btn.updateComplete;

    expect(btn.shadowRoot?.querySelector('.rounded')).not.toBeNull();
    expect(btn.shadowRoot?.querySelector('.pill')).toBeNull();
  });

  it('fires click handlers when active', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    const clickHandler = vi.fn();
    btn.addEventListener('click', clickHandler);
    document.body.appendChild(btn);
    await btn.updateComplete;

    const innerBtn = btn.shadowRoot?.querySelector('button');
    innerBtn?.click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('prevents click and stops propagation when disabled', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.disabled = true;
    const clickHandler = vi.fn();
    btn.addEventListener('click', clickHandler);
    document.body.appendChild(btn);
    await btn.updateComplete;

    const innerBtn = btn.shadowRoot?.querySelector('button');
    expect(innerBtn?.hasAttribute('disabled')).toBe(true);
    expect(innerBtn?.classList.contains('disabled')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');

    // Click on inner button
    innerBtn?.click();
    expect(clickHandler).not.toHaveBeenCalled();

    // Click on host element directly
    const hostClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    btn.dispatchEvent(hostClick);
    expect(hostClick.defaultPrevented).toBe(true);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');
    const stopSpy = vi.spyOn(event, 'stopPropagation');
    (btn as any).handleClick(event);
    expect(preventSpy).toHaveBeenCalled();
    expect(stopSpy).toHaveBeenCalled();

    // Reset disabled to false to test aria-disabled removal
    btn.disabled = false;
    await btn.updateComplete;
    expect(btn.hasAttribute('aria-disabled')).toBe(false);
  });

  it('displays spinner and disables button when loading', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.loading = true;
    const clickHandler = vi.fn();
    btn.addEventListener('click', clickHandler);
    document.body.appendChild(btn);
    await btn.updateComplete;

    const innerBtn = btn.shadowRoot?.querySelector('button');
    expect(innerBtn?.hasAttribute('disabled')).toBe(true);
    expect(btn.shadowRoot?.querySelector('.spinner')).not.toBeNull();

    innerBtn?.click();
    expect(clickHandler).not.toHaveBeenCalled();

    // Dispatch host click when loading
    const hostClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    btn.dispatchEvent(hostClick);
    expect(hostClick.defaultPrevented).toBe(true);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');
    const stopSpy = vi.spyOn(event, 'stopPropagation');
    (btn as any).handleClick(event);
    expect(preventSpy).toHaveBeenCalled();
    expect(stopSpy).toHaveBeenCalled();
  });

  it('renders an anchor tag when href is provided with proper target and tabindex', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.href = 'https://edwyn.tech';
    btn.target = '_blank';
    btn.textContent = 'Visit';
    document.body.appendChild(btn);
    await btn.updateComplete;

    const anchor = btn.shadowRoot?.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('https://edwyn.tech');
    expect(anchor?.getAttribute('target')).toBe('_blank');
    expect(anchor?.getAttribute('tabindex')).toBe('0');
  });

  it('updates rendered element to anchor when href is assigned dynamically after initial connection', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    document.body.appendChild(btn);
    await btn.updateComplete;
    expect(btn.shadowRoot?.querySelector('button')).not.toBeNull();

    btn.href = 'https://edwyn.tech/services';
    await btn.updateComplete;
    expect(btn.shadowRoot?.querySelector('a')).not.toBeNull();
    expect(btn.shadowRoot?.querySelector('a')?.getAttribute('href')).toBe(
      'https://edwyn.tech/services'
    );
  });

  it('sets tabindex -1 on disabled anchor and stops click propagation', async () => {
    const btn = document.createElement('edwyn-button') as EdwynButton;
    btn.href = 'https://edwyn.tech';
    btn.disabled = true;
    document.body.appendChild(btn);
    await btn.updateComplete;

    const anchor = btn.shadowRoot?.querySelector('a');
    expect(anchor?.getAttribute('tabindex')).toBe('-1');

    // Click the anchor inside shadowRoot directly
    const anchorClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    anchor?.dispatchEvent(anchorClick);
    expect(anchorClick.defaultPrevented).toBe(true);

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventSpy = vi.spyOn(event, 'preventDefault');
    const stopSpy = vi.spyOn(event, 'stopPropagation');
    (btn as any).handleClick(event);
    expect(preventSpy).toHaveBeenCalled();
    expect(stopSpy).toHaveBeenCalled();
  });
});
