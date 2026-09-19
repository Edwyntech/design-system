import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-footer';
import { EdwynFooter, DEFAULT_FOOTER_NAV_LINKS, DEFAULT_FOOTER_LEGAL_LINKS } from './edwyn-footer';

describe('EdwynFooter', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-footer custom element', () => {
    expect(customElements.get('edwyn-footer')).toBeDefined();
  });

  it('renders footer with current year and default links', async () => {
    const footer = document.createElement('edwyn-footer') as EdwynFooter;
    document.body.appendChild(footer);
    await footer.updateComplete;

    const currentYear = new Date().getFullYear();
    expect(footer.year).toBe(currentYear);
    const bottomBar = footer.shadowRoot?.querySelector('.bottom-bar');
    expect(bottomBar?.textContent).toContain(String(currentYear));

    expect(footer.navLinks).toEqual(DEFAULT_FOOTER_NAV_LINKS);
    expect(footer.legalLinks).toEqual(DEFAULT_FOOTER_LEGAL_LINKS);
    expect(footer.brandTitle).toBe('EDWYN');
    expect(footer.contactEmail).toBe('contact@edwyn.tech');
  });

  it('supports custom year override', async () => {
    const footer = document.createElement('edwyn-footer') as EdwynFooter;
    footer.year = 2030;
    document.body.appendChild(footer);
    await footer.updateComplete;

    const bottomBar = footer.shadowRoot?.querySelector('.bottom-bar');
    expect(bottomBar?.textContent).toContain('2030');
  });

  it('renders navigation links and contact item', async () => {
    const footer = document.createElement('edwyn-footer') as EdwynFooter;
    document.body.appendChild(footer);
    await footer.updateComplete;

    const links = footer.shadowRoot?.querySelectorAll('.link');
    expect(links?.length).toBeGreaterThanOrEqual(5);

    const email = footer.shadowRoot?.querySelector('.contact-email');
    expect(email?.textContent).toContain('contact@edwyn.tech');
  });

  it('supports custom navLinks, legalLinks, brandTitle, and contact overrides', async () => {
    const footer = document.createElement('edwyn-footer') as EdwynFooter;
    footer.brandTitle = 'EDWYN LABS';
    footer.tagline = 'Laboratoire R&D.';
    footer.navTitle = 'Outils';
    footer.navLinks = [{ label: 'Simulateur', href: '/tools/sim' }];
    footer.legalTitle = 'CGU';
    footer.legalLinks = [{ label: 'Conditions', href: '/conditions' }];
    footer.contactTitle = 'Équipe';
    footer.contactEmail = 'labs@edwyn.tech';
    footer.contactLocation = 'Bordeaux, France';
    footer.copyrightText = 'Edwyn Labs.';

    document.body.appendChild(footer);
    await footer.updateComplete;

    expect(footer.shadowRoot?.querySelector('.brand-title')?.textContent).toBe('EDWYN LABS');
    expect(footer.shadowRoot?.querySelector('.tagline')?.textContent).toBe('Laboratoire R&D.');
    expect(footer.shadowRoot?.querySelectorAll('.links-list')[0]?.children.length).toBe(1);
    expect(footer.shadowRoot?.querySelectorAll('.links-list')[1]?.children.length).toBe(1);
    expect(footer.shadowRoot?.querySelector('.contact-email')?.textContent).toContain(
      'labs@edwyn.tech'
    );
    expect(footer.shadowRoot?.querySelector('.contact-item')?.textContent).toContain(
      'Bordeaux, France'
    );
    expect(footer.shadowRoot?.querySelector('.bottom-bar')?.textContent).toContain('Edwyn Labs.');
  });

  it('handles empty contactEmail and non-array link fallbacks gracefully', async () => {
    const footer = document.createElement('edwyn-footer') as EdwynFooter;
    footer.contactEmail = '';
    (footer as any).navLinks = null;
    (footer as any).legalLinks = null;

    document.body.appendChild(footer);
    await footer.updateComplete;

    expect(footer.shadowRoot?.querySelector('.contact-email')).toBeNull();
    // Should fallback to default links
    const firstColLinks = footer.shadowRoot?.querySelectorAll('.links-list')[0]?.children;
    expect(firstColLinks?.length).toBe(DEFAULT_FOOTER_NAV_LINKS.length);
  });
});
