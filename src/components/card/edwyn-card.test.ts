import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-card';
import { EdwynCard } from './edwyn-card';

describe('EdwynCard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-card custom element', () => {
    expect(customElements.get('edwyn-card')).toBeDefined();
  });

  it('renders a card container with slots and default interactive state', async () => {
    const card = document.createElement('edwyn-card') as EdwynCard;
    document.body.appendChild(card);
    await card.updateComplete;

    expect(card.interactive).toBe(true);
    expect(card.highlighted).toBe(false);
    expect(card.shadowRoot?.querySelector('.card.interactive')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('slot[name="icon"]')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('slot[name="title"]')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('slot[name="description"]')).not.toBeNull();
    expect(card.shadowRoot?.querySelector('slot[name="footer"]')).not.toBeNull();
  });

  it('updates classes when non-interactive or highlighted', async () => {
    const card = document.createElement('edwyn-card') as EdwynCard;
    card.interactive = false;
    card.highlighted = true;
    document.body.appendChild(card);
    await card.updateComplete;

    const cardEl = card.shadowRoot?.querySelector('.card');
    expect(cardEl?.classList.contains('interactive')).toBe(false);
    expect(cardEl?.classList.contains('highlighted')).toBe(true);
  });
});
