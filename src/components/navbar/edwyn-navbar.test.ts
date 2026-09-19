import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-navbar';
import { EdwynNavbar, DEFAULT_NAV_ITEMS } from './edwyn-navbar';

describe('EdwynNavbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-navbar custom element', () => {
    expect(customElements.get('edwyn-navbar')).toBeDefined();
  });

  it('toggles position property (fixed, sticky, relative)', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    document.body.appendChild(nav);
    await nav.updateComplete;

    expect(nav.position).toBe('fixed');

    nav.position = 'relative';
    await nav.updateComplete;
    expect(nav.getAttribute('position')).toBe('relative');

    nav.position = 'sticky';
    await nav.updateComplete;
    expect(nav.getAttribute('position')).toBe('sticky');

    document.body.removeChild(nav);
  });

  it('renders header with brand name and default items', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.brandName = 'EDWYN TECH';
    document.body.appendChild(nav);
    await nav.updateComplete;

    const brandTitle = nav.shadowRoot?.querySelector('.brand-title');
    expect(brandTitle?.textContent).toContain('EDWYN TECH');
    expect(brandTitle?.classList.contains('sr-only')).toBe(true);
    expect(nav.items).toEqual(DEFAULT_NAV_ITEMS);

    const navLinks = nav.shadowRoot?.querySelectorAll('.nav-links .nav-item');
    expect(navLinks?.length).toBe(DEFAULT_NAV_ITEMS.length);
  });

  it('supports custom navigation items and handles invalid items gracefully', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    const customItems = [
      { label: 'Simulateur', href: '/simulateur' },
      { label: 'Blog', href: '/blog' },
    ];
    nav.items = customItems;
    document.body.appendChild(nav);
    await nav.updateComplete;

    let renderedItems = nav.shadowRoot?.querySelectorAll('.nav-links .nav-item');
    expect(renderedItems?.length).toBe(2);
    expect(renderedItems?.[0]?.textContent?.trim()).toBe('Simulateur');

    // Fallback when items is not an array
    (nav as any).items = null;
    await nav.updateComplete;
    renderedItems = nav.shadowRoot?.querySelectorAll('.nav-links .nav-item');
    expect(renderedItems?.length).toBe(DEFAULT_NAV_ITEMS.length);
  });

  it('configures brandHref, action labels, and action URLs', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.brandHref = '/home';
    nav.simulatorLabel = 'Calculer';
    nav.simulatorHref = '/calc';
    nav.contactLabel = 'Aide';
    nav.contactHref = '/aide';
    document.body.appendChild(nav);
    await nav.updateComplete;

    const brandLink = nav.shadowRoot?.querySelector('.brand-link');
    expect(brandLink?.getAttribute('href')).toBe('/home');

    const simBtn = nav.shadowRoot?.querySelector('.simulator-btn');
    expect(simBtn?.getAttribute('href')).toBe('/calc');
    expect(simBtn?.textContent?.trim()).toBe('Calculer');

    const contactBtn = nav.shadowRoot?.querySelector('.contact-btn');
    expect(contactBtn?.getAttribute('href')).toBe('/aide');
    expect(contactBtn?.textContent?.trim()).toBe('Aide');
  });

  it('supports toggling showSimulator and showContact', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.showSimulator = false;
    nav.showContact = false;
    document.body.appendChild(nav);
    await nav.updateComplete;

    expect(nav.shadowRoot?.querySelector('.simulator-btn')).toBeNull();
    expect(nav.shadowRoot?.querySelector('.contact-btn')).toBeNull();

    nav.showSimulator = true;
    nav.showContact = true;
    await nav.updateComplete;

    expect(nav.shadowRoot?.querySelector('.simulator-btn')).not.toBeNull();
    expect(nav.shadowRoot?.querySelector('.contact-btn')).not.toBeNull();
  });

  it('handles empty logoSrc gracefully', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.logoSrc = '';
    document.body.appendChild(nav);
    await nav.updateComplete;

    expect(nav.shadowRoot?.querySelector('.brand-logo')).toBeNull();
  });

  it('shows brand title visibly when showBrandTitle is true', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.showBrandTitle = true;
    document.body.appendChild(nav);
    await nav.updateComplete;

    const brandTitle = nav.shadowRoot?.querySelector('.brand-title');
    expect(brandTitle?.classList.contains('sr-only')).toBe(false);
  });

  it('highlights the active route link', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.activeHref = '/notre-vision';
    document.body.appendChild(nav);
    await nav.updateComplete;

    const activeLink = nav.shadowRoot?.querySelector('.nav-links .nav-item.active');
    expect(activeLink?.getAttribute('href')).toBe('/notre-vision');
  });

  it('toggles mobile drawer on hamburger button click', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    document.body.appendChild(nav);
    await nav.updateComplete;

    const toggleBtn = nav.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    const mobileMenu = nav.shadowRoot?.querySelector('.mobile-menu') as HTMLElement;
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('open')).toBe(false);
    expect(mobileMenu.getAttribute('role')).toBe('dialog');
    expect(mobileMenu.getAttribute('aria-modal')).toBe('false');

    // Open drawer
    toggleBtn.click();
    await nav.updateComplete;

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('open')).toBe(true);
    expect(mobileMenu.getAttribute('aria-modal')).toBe('true');

    // Close drawer
    toggleBtn.click();
    await nav.updateComplete;

    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('open')).toBe(false);
  });

  it('closes mobile drawer when clicking a navigation link inside mobile menu', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    nav.activeHref = '/notre-vision';
    document.body.appendChild(nav);
    await nav.updateComplete;

    const toggleBtn = nav.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    toggleBtn.click();
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(true);

    // Check mobile link highlighting
    const activeMobileLink = nav.shadowRoot?.querySelector('.mobile-menu .nav-item.active');
    expect(activeMobileLink?.getAttribute('href')).toBe('/notre-vision');

    const mobileLink = nav.shadowRoot?.querySelector('.mobile-menu .nav-item') as HTMLAnchorElement;
    mobileLink.click();
    await nav.updateComplete;

    expect(nav.mobileOpen).toBe(false);
    const mobileMenu = nav.shadowRoot?.querySelector('.mobile-menu');
    expect(mobileMenu?.classList.contains('open')).toBe(false);
  });

  it('closes mobile menu on Escape key press and ignores other keys', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    document.body.appendChild(nav);
    await nav.updateComplete;

    // When mobile drawer is closed, Escape does nothing
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(nav.mobileOpen).toBe(false);

    // Open drawer
    nav.mobileOpen = true;
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(true);

    // Non-Escape key does nothing
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(nav.mobileOpen).toBe(true);

    // Escape key closes drawer
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nav.updateComplete;

    expect(nav.mobileOpen).toBe(false);
  });

  it('closes mobile drawer when clicking simulator or contact CTA in mobile menu', async () => {
    const nav = document.createElement('edwyn-navbar') as EdwynNavbar;
    document.body.appendChild(nav);
    await nav.updateComplete;

    const toggleBtn = nav.shadowRoot?.querySelector('.mobile-toggle') as HTMLButtonElement;
    toggleBtn.click();
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(true);

    const simulatorBtn = nav.shadowRoot?.querySelector(
      '.mobile-menu .simulator-btn'
    ) as HTMLAnchorElement;
    simulatorBtn.click();
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(false);

    toggleBtn.click();
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(true);

    const contactBtn = nav.shadowRoot?.querySelector(
      '.mobile-menu .contact-btn'
    ) as HTMLAnchorElement;
    contactBtn.click();
    await nav.updateComplete;
    expect(nav.mobileOpen).toBe(false);

    // Clean up DOM and check disconnectedCallback
    document.body.removeChild(nav);
  });
});
