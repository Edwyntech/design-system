import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Package Configuration & Exports', () => {
  const rootDir = path.resolve(__dirname, '..');
  const pkgPath = path.join(rootDir, 'package.json');

  it('has valid package.json with name @edwyn-tech/design-system', () => {
    expect(fs.existsSync(pkgPath)).toBe(true);
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.name).toBe('@edwyn-tech/design-system');
    expect(pkg.type).toBe('module');
    expect(pkg.main).toBe('./dist/index.js');
    expect(pkg.types).toBe('./dist/index.d.ts');
  });

  it('declares essential subpath exports', () => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    expect(pkg.exports['.']).toBeDefined();
    expect(pkg.exports['./tokens']).toBeDefined();
    expect(pkg.exports['./tokens.css']).toBe('./src/tokens/tokens.css');
    expect(pkg.exports['./typography.css']).toBe('./src/tokens/typography.css');
  });

  it('points to existing CSS token files', () => {
    const tokensCss = path.join(rootDir, 'src/tokens/tokens.css');
    const typographyCss = path.join(rootDir, 'src/tokens/typography.css');
    expect(fs.existsSync(tokensCss)).toBe(true);
    expect(fs.existsSync(typographyCss)).toBe(true);
  });
});
