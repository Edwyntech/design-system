import { describe, it, expect, beforeEach, vi } from 'vitest';
import './edwyn-simulator';
import {
  EdwynSimulator,
  calculateSimulator,
  getGrossSalary,
  getCostThreshold,
  getMinDaysBillable,
  SALARY_BY_EXP,
  DEFAULT_TJM_BY_EXP,
} from './edwyn-simulator';
import { EdwynSlider } from '../slider/edwyn-slider';

describe('EdwynSimulator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers edwyn-simulator custom element', () => {
    expect(customElements.get('edwyn-simulator')).toBeDefined();
  });

  describe('Pure Calculation Engine', () => {
    it('provides correct salary and cost thresholds by experience', () => {
      expect(SALARY_BY_EXP[3]).toBe(51000);
      expect(SALARY_BY_EXP[5]).toBe(57000);
      expect(SALARY_BY_EXP[11]).toBe(71000);

      expect(getGrossSalary(3)).toBe(51000);
      expect(getGrossSalary(5)).toBe(57000);
      expect(getGrossSalary(12)).toBe(71000);

      expect(DEFAULT_TJM_BY_EXP[3]).toBe(540);
      expect(DEFAULT_TJM_BY_EXP[5]).toBe(580);
      expect(DEFAULT_TJM_BY_EXP[11]).toBe(670);

      const threshold5 = getCostThreshold(57000);
      expect(threshold5).toBe(30000 + 1.5 * 57000);
      expect(getMinDaysBillable(threshold5, 580)).toBe(Math.ceil(threshold5 / 580));
    });

    it('calculates package with margin redistribution properly', () => {
      // 5 years experience (57k base), 580 TJM, 218 days
      const result = calculateSimulator(5, 580, 218);
      expect(result.billedRevenue).toBe(580 * 218);
      expect(result.grossSalary).toBe(57000);
      expect(result.variableBonus).toBeGreaterThan(0);
      expect(result.salaryPackage).toBe(result.grossSalary + result.variableBonus);
      expect(result.isBelowMinimum).toBe(false);
    });

    it('handles zero variable bonus when billed revenue does not reach cost threshold', () => {
      // 10 days billed at 500 TJM = 5000 billed revenue (< threshold)
      const result = calculateSimulator(5, 500, 10);
      expect(result.variableBonus).toBe(0);
      expect(result.salaryPackage).toBe(result.grossSalary);
      expect(result.isBelowMinimum).toBe(true);
    });
  });

  describe('Component Rendering & Interactions', () => {
    it('creates and renders simulator with default calculation values', async () => {
      const sim = document.createElement('edwyn-simulator') as EdwynSimulator;
      document.body.appendChild(sim);
      await sim.updateComplete;

      expect(sim.experience).toBe(5);
      expect(sim.tjm).toBe(580);
      expect(sim.daysBilled).toBe(218);

      const sliders = sim.shadowRoot?.querySelectorAll('edwyn-slider');
      expect(sliders?.length).toBe(3);

      const packageVal = sim.shadowRoot?.querySelector('.package-value');
      expect(packageVal?.textContent).toContain('€');
    });

    it('updates calculations and emits simulator-change event when sliders change', async () => {
      const sim = document.createElement('edwyn-simulator') as EdwynSimulator;
      document.body.appendChild(sim);
      await sim.updateComplete;

      const changeSpy = vi.fn();
      sim.addEventListener('simulator-change', changeSpy);

      // Change experience
      const expSlider = sim.shadowRoot?.querySelectorAll('edwyn-slider')[0] as EdwynSlider;
      expSlider.dispatchEvent(new CustomEvent('input', { detail: { value: 7 }, bubbles: true }));
      await sim.updateComplete;

      expect(sim.experience).toBe(7);
      expect(sim.tjm).toBe(620); // default for 7 yrs
      expect(changeSpy).toHaveBeenCalled();

      // Change TJM
      const tjmSlider = sim.shadowRoot?.querySelectorAll('edwyn-slider')[1] as EdwynSlider;
      tjmSlider.dispatchEvent(new CustomEvent('input', { detail: { value: 750 }, bubbles: true }));
      await sim.updateComplete;

      expect(sim.tjm).toBe(750);

      // Change Days
      const daysSlider = sim.shadowRoot?.querySelectorAll('edwyn-slider')[2] as EdwynSlider;
      daysSlider.dispatchEvent(new CustomEvent('input', { detail: { value: 210 }, bubbles: true }));
      await sim.updateComplete;

      expect(sim.daysBilled).toBe(210);
    });

    it('handles hide-header property', async () => {
      const sim = document.createElement('edwyn-simulator') as EdwynSimulator;
      sim.hideHeader = true;
      document.body.appendChild(sim);
      await sim.updateComplete;

      expect(sim.shadowRoot?.querySelector('.header-section')).toBeNull();

      sim.hideHeader = false;
      await sim.updateComplete;
      expect(sim.shadowRoot?.querySelector('.header-section')).not.toBeNull();
    });
  });
});
