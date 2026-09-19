import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-hero';
import { EdwynHero } from './edwyn-hero';

describe('EdwynHero', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-hero custom element', () => {
    expect(customElements.get('edwyn-hero')).toBeDefined();
  });

  it('renders hero section with title and highlight', async () => {
    const hero = document.createElement('edwyn-hero') as EdwynHero;
    hero.title = 'Hello';
    hero.highlight = 'World';
    hero.subtitle = 'Subtitle test';
    document.body.appendChild(hero);
    await hero.updateComplete;

    const headline = hero.shadowRoot?.querySelector('.headline');
    expect(headline?.textContent).toContain('Hello');
    expect(headline?.textContent).toContain('World');
    expect(hero.shadowRoot?.querySelector('.subtitle')?.textContent).toBe('Subtitle test');
  });

  it('toggles attenuated shader overlays', async () => {
    const hero = document.createElement('edwyn-hero') as EdwynHero;
    hero.attenuated = false;
    document.body.appendChild(hero);
    await hero.updateComplete;

    expect(hero.shadowRoot?.querySelector('.hero-bottom-fade')).not.toBeNull();
    expect(hero.shadowRoot?.querySelector('.hero-bg-overlay')).toBeNull();

    hero.attenuated = true;
    await hero.updateComplete;

    expect(hero.shadowRoot?.querySelector('.hero-bottom-fade')).toBeNull();
    expect(hero.shadowRoot?.querySelector('.hero-bg-overlay')).not.toBeNull();
    expect(hero.shadowRoot?.querySelector('.hero-bg-gradient')).not.toBeNull();
  });

  it('toggles scroll indicator visibility', async () => {
    const hero = document.createElement('edwyn-hero') as EdwynHero;
    hero.showScrollIndicator = true;
    document.body.appendChild(hero);
    await hero.updateComplete;

    expect(hero.shadowRoot?.querySelector('.scroll-indicator')).not.toBeNull();

    hero.showScrollIndicator = false;
    await hero.updateComplete;

    expect(hero.shadowRoot?.querySelector('.scroll-indicator')).toBeNull();
  });

  it('handles empty image and logo sources gracefully', async () => {
    const hero = document.createElement('edwyn-hero') as EdwynHero;
    hero.backgroundImage = '';
    hero.logoSrc = '';
    document.body.appendChild(hero);
    await hero.updateComplete;

    expect(hero.shadowRoot?.querySelector('.hero-bg-image')).toBeNull();
    expect(hero.shadowRoot?.querySelector('.center-logo')).toBeNull();
  });
});
