import { describe, it, expect, beforeEach } from 'vitest';
import './edwyn-stat-item';
import { EdwynStatItem } from './edwyn-stat-item';

describe('EdwynStatItem', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-stat-item custom element', () => {
    expect(customElements.get('edwyn-stat-item')).toBeDefined();
  });

  it('renders metric value and label', async () => {
    const stat = document.createElement('edwyn-stat-item') as EdwynStatItem;
    stat.value = '3,2M€';
    stat.label = "Volume d'affaires";
    document.body.appendChild(stat);
    await stat.updateComplete;

    expect(stat.shadowRoot?.querySelector('.value')?.textContent).toBe('3,2M€');
    expect(stat.shadowRoot?.querySelector('.label')?.textContent).toBe("Volume d'affaires");
  });
});
