import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-badge';
import { EdwynBadge } from './edwyn-badge';

describe('EdwynBadge', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-badge custom element', () => {
    expect(customElements.get('edwyn-badge')).toBeDefined();
  });

  it('creates and renders a badge with default values', async () => {
    const badge = document.createElement('edwyn-badge') as EdwynBadge;
    badge.textContent = 'Alpha';
    document.body.appendChild(badge);
    await badge.updateComplete;

    expect(badge.variant).toBe('subtle');
    expect(badge.size).toBe('sm');
    expect(badge.pill).toBe(true);
    expect(badge.shadowRoot?.querySelector('.badge')).not.toBeNull();
    expect(badge.shadowRoot?.querySelector('.variant-subtle')).not.toBeNull();
    expect(badge.shadowRoot?.querySelector('.size-sm')).not.toBeNull();
    expect(badge.shadowRoot?.querySelector('.pill')).not.toBeNull();
  });

  it('renders variants and rounded shape correctly', async () => {
    const variants = ['primary', 'subtle', 'outline', 'glass'] as const;
    for (const variant of variants) {
      const badge = document.createElement('edwyn-badge') as EdwynBadge;
      badge.variant = variant;
      document.body.appendChild(badge);
      await badge.updateComplete;
      expect(badge.shadowRoot?.querySelector(`.variant-${variant}`)).not.toBeNull();
      document.body.removeChild(badge);
    }

    const roundedBadge = document.createElement('edwyn-badge') as EdwynBadge;
    roundedBadge.rounded = true;
    document.body.appendChild(roundedBadge);
    await roundedBadge.updateComplete;
    expect(roundedBadge.shadowRoot?.querySelector('.rounded')).not.toBeNull();
    expect(roundedBadge.shadowRoot?.querySelector('.pill')).toBeNull();
  });

  it('renders a dot when dot property is true', async () => {
    const badge = document.createElement('edwyn-badge') as EdwynBadge;
    badge.dot = true;
    document.body.appendChild(badge);
    await badge.updateComplete;

    expect(badge.shadowRoot?.querySelector('.dot.pulse')).not.toBeNull();
  });
});
