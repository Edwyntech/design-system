import { describe, it, expect, beforeEach, vi } from 'vitest';
import './edwyn-slider';
import { EdwynSlider } from './edwyn-slider';

describe('EdwynSlider', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-slider custom element', () => {
    expect(customElements.get('edwyn-slider')).toBeDefined();
  });

  it('creates and renders a slider with default properties', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect(slider.value).toBe(0);
    expect(slider.min).toBe(0);
    expect(slider.max).toBe(100);
    expect(slider.step).toBe(1);
    expect(slider.disabled).toBe(false);

    const input = slider.shadowRoot?.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe('0');
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
  });

  it('displays label, sublabel, unit, and warning correctly', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    slider.label = 'TJM Facturé';
    slider.sublabel = 'Tarif Journalier Moyen';
    slider.unit = '€';
    slider.value = 550;
    slider.warning = '⚠️ Seuil bas';
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect(slider.shadowRoot?.querySelector('.slider-label')?.textContent).toBe('TJM Facturé');
    expect(slider.shadowRoot?.querySelector('.slider-sublabel')?.textContent).toBe(
      'Tarif Journalier Moyen'
    );
    expect(slider.shadowRoot?.querySelector('.value-number')?.textContent).toBe('550');
    expect(slider.shadowRoot?.querySelector('.value-unit')?.textContent).toBe('€');
    expect(slider.shadowRoot?.querySelector('.warning-indicator')?.textContent).toBe(
      '⚠️ Seuil bas'
    );
  });

  it('dispatches input and change events when dragged or updated', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    slider.name = 'experience';
    slider.min = 3;
    slider.max = 11;
    slider.value = 5;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const inputSpy = vi.fn();
    const changeSpy = vi.fn();
    slider.addEventListener('input', inputSpy);
    slider.addEventListener('change', changeSpy);

    const nativeInput = slider.shadowRoot?.querySelector('input') as HTMLInputElement;
    nativeInput.value = '8';

    nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    await slider.updateComplete;
    expect(slider.value).toBe(8);
    expect(inputSpy).toHaveBeenCalledTimes(1);
    expect(inputSpy.mock.calls[0][0].detail).toEqual({ value: 8, name: 'experience' });

    nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    await slider.updateComplete;
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ value: 8, name: 'experience' });
  });

  it('respects min-label and max-label overrides', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    slider.min = 3;
    slider.max = 11;
    slider.minLabel = '3 ans (Junior)';
    slider.maxLabel = '11+ ans (Staff)';
    document.body.appendChild(slider);
    await slider.updateComplete;

    const bounds = slider.shadowRoot?.querySelectorAll('.slider-bounds span');
    expect(bounds?.[0]?.textContent).toBe('3 ans (Junior)');
    expect(bounds?.[1]?.textContent).toBe('11+ ans (Staff)');
  });

  it('handles disabled state properly', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    slider.disabled = true;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const nativeInput = slider.shadowRoot?.querySelector('input') as HTMLInputElement;
    expect(nativeInput.disabled).toBe(true);
    expect(slider.hasAttribute('disabled')).toBe(true);
  });

  it('handles min >= max edge cases in calculatePercent gracefully', async () => {
    const slider = document.createElement('edwyn-slider') as EdwynSlider;
    slider.min = 100;
    slider.max = 50;
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect((slider as any)._calculatePercent()).toBe(0);
  });
});
