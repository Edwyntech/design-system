import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Build Assets & Manifests', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('generates a valid custom-elements.json manifest when present', () => {
    const cemPath = path.join(rootDir, 'custom-elements.json');
    if (!fs.existsSync(cemPath)) {
      // Manifest is generated during build/manifest step
      return;
    }

    const cem = JSON.parse(fs.readFileSync(cemPath, 'utf-8'));
    expect(cem.schemaVersion).toBe('1.0.0');
    expect(Array.isArray(cem.modules)).toBe(true);

    const expectedTags = [
      'edwyn-badge',
      'edwyn-button',
      'edwyn-card',
      'edwyn-footer',
      'edwyn-hero',
      'edwyn-navbar',
      'edwyn-icon',
      'edwyn-stat-item',
      'edwyn-input',
    ];

    const declaredTags: string[] = [];
    cem.modules.forEach((mod: any) => {
      (mod.declarations || []).forEach((dec: any) => {
        if (dec.customElement && dec.tagName) {
          declaredTags.push(dec.tagName);
        }
      });
    });

    expectedTags.forEach((tag) => {
      expect(declaredTags).toContain(tag);
    });
  });

  it('generates a valid web-types.json manifest for @edwyn-tech/design-system when present', () => {
    const wtPath = path.join(rootDir, 'web-types.json');
    if (!fs.existsSync(wtPath)) {
      return;
    }

    const wt = JSON.parse(fs.readFileSync(wtPath, 'utf-8'));
    expect(wt.$schema).toContain('web-types.json');
    expect(wt.name).toBe('@edwyn-tech/design-system');
    expect(wt.contributions?.html?.elements).toBeDefined();

    const elementNames = wt.contributions.html.elements.map((el: any) => el.name);
    const expectedElements = [
      'edwyn-badge',
      'edwyn-button',
      'edwyn-card',
      'edwyn-footer',
      'edwyn-hero',
      'edwyn-navbar',
      'edwyn-icon',
      'edwyn-stat-item',
      'edwyn-input',
    ];

    expectedElements.forEach((el) => {
      expect(elementNames).toContain(el);
    });
  });
});
