import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-icon';
import { EdwynIcon } from './edwyn-icon';

describe('EdwynIcon', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-icon custom element', () => {
    expect(customElements.get('edwyn-icon')).toBeDefined();
  });

  it('renders default rocket icon SVG', async () => {
    const icon = document.createElement('edwyn-icon') as EdwynIcon;
    document.body.appendChild(icon);
    await icon.updateComplete;

    expect(icon.name).toBe('rocket');
    const svg = icon.shadowRoot?.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('renders all supported icons and fallback', async () => {
    const iconNames = [
      'rocket',
      'users',
      'check',
      'circle-check',
      'arrow-right',
      'chevron-down',
      'menu',
      'close',
      'sparkles',
      'logo',
    ] as const;

    for (const name of iconNames) {
      const icon = document.createElement('edwyn-icon') as EdwynIcon;
      icon.name = name;
      document.body.appendChild(icon);
      await icon.updateComplete;
      const svg = icon.shadowRoot?.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.children.length).toBeGreaterThan(0);
      document.body.removeChild(icon);
    }

    // Fallback for unknown icon
    const fallbackIcon = document.createElement('edwyn-icon') as any;
    fallbackIcon.name = 'unknown-icon';
    document.body.appendChild(fallbackIcon);
    await fallbackIcon.updateComplete;
    const svg = fallbackIcon.shadowRoot?.querySelector('svg');
    expect(svg?.querySelector('circle')).not.toBeNull();
  });

  it('applies custom size in inline styles', async () => {
    const icon = document.createElement('edwyn-icon') as EdwynIcon;
    icon.size = 32;
    document.body.appendChild(icon);
    await icon.updateComplete;

    const wrapper = icon.shadowRoot?.querySelector('.icon-wrapper') as HTMLElement;
    expect(wrapper.style.width).toBe('32px');
    expect(wrapper.style.height).toBe('32px');
  });
});
