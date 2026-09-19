import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../button/edwyn-button';
import '../slider/edwyn-slider';

export const SALARY_BY_EXP: Record<number, number> = {
  3: 51000,
  4: 54000,
  5: 57000,
  6: 60000,
  7: 63000,
  8: 66000,
  9: 69000,
  10: 71000,
  11: 71000,
};

export const DEFAULT_TJM_BY_EXP: Record<number, number> = {
  3: 540,
  4: 560,
  5: 580,
  6: 595,
  7: 620,
  8: 640,
  9: 650,
  10: 670,
  11: 670,
};

export interface SimulatorState {
  experience: number;
  tjm: number;
  daysBilled: number;
  grossSalary: number;
  variableBonus: number;
  salaryPackage: number;
  billedRevenue: number;
  totalHolidays: number;
  isBelowMinimum: boolean;
  minDaysBillable: number;
  minValidTjm: number;
}

export function getGrossSalary(experience: number): number {
  const clampedExp = Math.min(Math.max(experience, 3), 11);
  return SALARY_BY_EXP[clampedExp] ?? 57000;
}

export function getCostThreshold(grossSalary: number): number {
  return 30000 + 1.5 * grossSalary;
}

export function getMinDaysBillable(costThreshold: number, tjm: number): number {
  return Math.ceil(costThreshold / tjm);
}

export function calculateSimulator(
  experience: number,
  tjm: number,
  daysBilled: number
): SimulatorState {
  const grossSalary = getGrossSalary(experience);
  const costThreshold = getCostThreshold(grossSalary);
  const billedRevenue = tjm * daysBilled;

  let variableBonus = 0;
  if (billedRevenue > costThreshold) {
    variableBonus = Math.round((billedRevenue - costThreshold) * 0.69);
  }

  const salaryPackage = grossSalary + variableBonus;
  const isBelowMinimum = billedRevenue < costThreshold;

  // Holidays logic: 218 is default syntec billable days => 47 off days
  // 365 days - 104 weekends = 261 working days.
  // totalHolidays = 261 - daysBilled
  const workingDaysPerYear = 261;
  const totalHolidays = Math.max(0, workingDaysPerYear - daysBilled);

  const minDaysBillable = getMinDaysBillable(costThreshold, tjm);
  // minValidTjm is TJM needed to break even at 218 standard days
  const minValidTjm = Math.ceil(costThreshold / 218);

  return {
    experience,
    tjm,
    daysBilled,
    grossSalary,
    variableBonus,
    salaryPackage,
    billedRevenue,
    totalHolidays,
    isBelowMinimum,
    minDaysBillable,
    minValidTjm,
  };
}

/**
 * Interactive salary simulation tool matching the exact business logic and visual design
 * of the official Edwyn Tech salary simulator at https://www.edwyn.tech/simulateur.
 *
 * @summary Edwyn salary and package simulator
 * @tag edwyn-simulator
 *
 * @fires simulator-change - Fired whenever any slider value changes, with complete calculated state in detail
 */
@customElement('edwyn-simulator')
export class EdwynSimulator extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      color: var(--edwyn-color-text, #ffffff);
      box-sizing: border-box;
    }

    /* Container */
    .simulator-container {
      max-width: 1152px; /* max-w-6xl */
      margin: 0 auto;
      width: 100%;
    }

    /* Header */
    .header-section {
      text-align: center;
      max-width: 56rem;
      margin: 0 auto 3rem auto;
      padding: 0 1rem;
    }

    .main-title {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: clamp(2.25rem, 5vw, 4rem);
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.1;
      margin: 0 0 1.25rem 0;
      color: var(--edwyn-color-text, #ffffff);
    }

    .highlight {
      color: var(--edwyn-color-text-primary, #f08200);
    }

    .subtitle {
      font-size: clamp(1.125rem, 2.5vw, 1.375rem);
      color: var(--edwyn-color-text-muted, #a3a8aa);
      font-weight: 300;
      max-width: 42rem;
      margin: 0 auto;
      line-height: 1.6;
    }

    .subtitle strong {
      color: var(--edwyn-color-text, #ffffff);
      font-weight: 500;
    }

    /* Grid Layout */
    .simulator-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (min-width: 1024px) {
      .simulator-grid {
        grid-template-columns: 7fr 5fr;
      }
    }

    /* Controls Card (Left Column) */
    .controls-card {
      background: var(--edwyn-color-card, rgba(255, 255, 255, 0.03));
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.1));
      border-radius: 0.75rem; /* rounded-xl */
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      gap: 2.25rem;
    }

    @media (min-width: 768px) {
      .controls-card {
        padding: 2rem 2.5rem;
      }
    }

    /* Results Column (Right Column) */
    .results-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    @media (min-width: 1024px) {
      .results-column {
        position: sticky;
        top: 6rem;
      }
    }

    /* Main Orange Package Card */
    .package-card {
      background: var(--edwyn-color-primary, #f08200);
      color: var(--edwyn-color-primary-contrast, #0f172a);
      border-radius: 0.75rem;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(240, 130, 0, 0.35);
      border: none;
      text-align: center;
    }

    /* Ambient Glow Blobs */
    .orb-top {
      position: absolute;
      right: -3rem;
      top: -3rem;
      width: 12rem;
      height: 12rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      filter: blur(48px);
      pointer-events: none;
    }

    .orb-bottom {
      position: absolute;
      left: -3rem;
      bottom: -3rem;
      width: 12rem;
      height: 12rem;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 9999px;
      filter: blur(48px);
      pointer-events: none;
    }

    .package-inner {
      position: relative;
      z-index: 10;
    }

    .package-label {
      font-size: 0.9375rem;
      font-weight: 600;
      opacity: 0.95;
      margin: 0;
      color: var(--edwyn-color-primary-contrast, #0f172a);
    }

    .package-value {
      font-family: var(--edwyn-font-heading), 'Syne', sans-serif;
      font-size: clamp(2.5rem, 5vw, 3.75rem);
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1;
      margin: 0;
      color: var(--edwyn-color-primary-contrast, #0f172a);
    }

    .package-value-currency {
      font-size: 1.875rem;
      opacity: 0.85;
      font-weight: 600;
    }

    .package-sublabel {
      font-size: 0.875rem;
      opacity: 0.9;
      margin: 0.5rem 0 0 0;
      font-weight: 600;
      color: var(--edwyn-color-primary-contrast, #0f172a);
    }

    /* Details Breakdown Card */
    .breakdown-card {
      background: var(--edwyn-color-card, rgba(41, 46, 48, 0.3));
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.1));
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      transition: all 200ms ease;
    }

    .breakdown-card.below-minimum {
      border-color: rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.05);
    }

    .salary-rows {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .salary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
    }

    .row-fixe {
      background: var(--edwyn-color-white-5, rgba(255, 255, 255, 0.05));
    }

    .row-fixe-label {
      color: var(--edwyn-color-text-muted, #a3a8aa);
      font-size: 0.9375rem;
    }

    .row-fixe-value {
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--edwyn-color-text, #ffffff);
    }

    .row-variable-active {
      background: rgba(34, 197, 94, 0.06);
      border: 1px solid var(--edwyn-color-success, #00c758);
    }

    .row-variable-inactive {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.05));
    }

    .row-variable-label {
      font-weight: 600;
      font-size: 0.9375rem;
      color: var(--edwyn-color-text, #ffffff);
    }

    .variable-text-active {
      color: var(--edwyn-color-success-light, #05df72);
    }

    .variable-text-inactive {
      color: var(--edwyn-color-text-muted, #a3a8aa);
    }

    .row-variable-value {
      font-weight: 700;
      font-size: 1.25rem;
    }

    .extra-metrics {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding-top: 1rem;
      border-top: 1px solid var(--edwyn-color-border, rgba(255, 255, 255, 0.1));
    }

    .extra-metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
    }

    .metric-label {
      color: var(--edwyn-color-text-muted, #a3a8aa);
    }

    .metric-val {
      font-family: var(--edwyn-font-mono), monospace;
      color: var(--edwyn-color-text, #ffffff);
      font-weight: 500;
    }

    /* CTA Area */
    .cta-container {
      padding-top: 0.5rem;
      width: 100%;
    }

    .cta-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 3.5rem; /* h-14 */
      padding: 0 2rem;
      background-color: var(--edwyn-color-primary, #f08200);
      color: var(--edwyn-color-primary-contrast, #0f172a);
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: 1.125rem; /* text-lg */
      font-weight: 700;
      border-radius: 0.375rem; /* rounded-md */
      text-decoration: none;
      box-shadow: 0 10px 15px -3px rgba(240, 130, 0, 0.25);
      transition:
        transform 200ms ease,
        background-color 200ms ease;
    }

    .cta-link:hover {
      background-color: var(--edwyn-color-primary-hover, #ff8f1a);
      transform: scale(1.02);
    }
  `;

  /** Initial experience in years (3 to 11) */
  @property({ type: Number }) experience = 5;

  /** Initial TJM in euros */
  @property({ type: Number }) tjm = 580;

  /** Initial days billed per year */
  @property({ type: Number }) daysBilled = 218;

  /** Destination URL for candidate contact CTA */
  @property({ type: String, attribute: 'contact-href' }) contactHref = '/contact';

  /** Whether to hide the top title/subtitle section */
  @property({ type: Boolean, attribute: 'hide-header' }) hideHeader = false;

  private _handleExperienceChange(e: Event | CustomEvent<{ value: number }>) {
    const detail = (e as CustomEvent<{ value: number }>).detail;
    const newExp =
      typeof detail?.value === 'number'
        ? detail.value
        : parseInt((e.target as HTMLInputElement).value, 10);
    this.experience = newExp;

    // Reset default TJM based on experience table
    const defaultTjm = DEFAULT_TJM_BY_EXP[newExp] ?? 580;
    this.tjm = defaultTjm;

    // Ensure days billed meets minimum requirement
    const gross = getGrossSalary(newExp);
    const threshold = getCostThreshold(gross);
    const minDays = getMinDaysBillable(threshold, defaultTjm);
    if (this.daysBilled < minDays) {
      this.daysBilled = minDays;
    }

    this._dispatchChange();
  }

  private _handleTjmChange(e: Event | CustomEvent<{ value: number }>) {
    const detail = (e as CustomEvent<{ value: number }>).detail;
    const newTjm =
      typeof detail?.value === 'number'
        ? detail.value
        : parseInt((e.target as HTMLInputElement).value, 10);
    this.tjm = newTjm;

    // Ensure days billed meets minimum requirement
    const gross = getGrossSalary(this.experience);
    const threshold = getCostThreshold(gross);
    const minDays = getMinDaysBillable(threshold, newTjm);
    if (this.daysBilled < minDays) {
      this.daysBilled = minDays;
    }

    this._dispatchChange();
  }

  private _handleDaysChange(e: Event | CustomEvent<{ value: number }>) {
    const detail = (e as CustomEvent<{ value: number }>).detail;
    this.daysBilled =
      typeof detail?.value === 'number'
        ? detail.value
        : parseInt((e.target as HTMLInputElement).value, 10);
    this._dispatchChange();
  }

  private _dispatchChange() {
    const state = calculateSimulator(this.experience, this.tjm, this.daysBilled);
    this.dispatchEvent(
      new CustomEvent('simulator-change', {
        detail: state,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    const state = calculateSimulator(this.experience, this.tjm, this.daysBilled);

    // Dynamic slider min values
    const minSliderTjm = state.minValidTjm > 350 ? 350 : state.minValidTjm;
    const daysMin = state.minDaysBillable;
    const expUnitText = this.experience === 11 ? 'ans+' : this.experience > 1 ? 'ans' : 'an';

    return html`
      <div class="simulator-container">
        ${
          !this.hideHeader
            ? html`
                <div class="header-section">
                  <h1 class="main-title">Simulateur <span class="highlight">de Salaire</span></h1>
                  <p class="subtitle">
                    Joue avec les curseurs et découvre ton futur package de
                    <strong>Développeur</strong> à Paris (IDF).
                  </p>
                </div>
              `
            : null
        }

        <div class="simulator-grid">
          <!-- Left Column: Sliders using EdwynSlider Component -->
          <div class="controls-card">
            <!-- 1. Experience Slider -->
            <edwyn-slider
              label="Expérience"
              .value=${this.experience}
              .min=${3}
              .max=${11}
              .step=${1}
              .unit=${expUnitText}
              min-label="3 ans (Min)"
              max-label="11+ ans (Max)"
              @input=${this._handleExperienceChange}
            ></edwyn-slider>

            <!-- 2. TJM Slider -->
            <edwyn-slider
              label="TJM Facturé"
              sublabel="Tarif Journalier Moyen"
              .value=${this.tjm}
              .min=${minSliderTjm}
              .max=${1000}
              .step=${5}
              unit="€"
              min-label="Seuil Min. Requis (${state.minValidTjm}€)"
              max-label="1000€"
              .warning=${state.isBelowMinimum ? '⚠️ En dessous du seuil de rentabilité' : ''}
              @input=${this._handleTjmChange}
            ></edwyn-slider>

            <!-- 3. Activite Slider -->
            <edwyn-slider
              label="Activité"
              sublabel="Jours facturés / an"
              .value=${this.daysBilled}
              .min=${daysMin}
              .max=${235}
              .step=${1}
              unit="jours"
              min-label="Objectif min. (${daysMin})"
              max-label="Max (235)"
              @input=${this._handleDaysChange}
            ></edwyn-slider>
          </div>

          <!-- Right Column: Results -->
          <div class="results-column">
            <!-- Orange Package Total Card -->
            <div class="package-card">
              <div class="orb-top"></div>
              <div class="orb-bottom"></div>
              <div class="package-inner">
                <p class="package-label">Package Total Annuel</p>
                <h2 class="package-value">
                  ${state.salaryPackage.toLocaleString('fr-FR')}
                  <span class="package-value-currency">€</span>
                </h2>
                <p class="package-sublabel">Brut Global (Fixe + Variable)</p>
              </div>
            </div>

            <!-- Details Breakdown Card -->
            <div class="breakdown-card ${state.isBelowMinimum ? 'below-minimum' : ''}">
              <div class="salary-rows">
                <div class="salary-row row-fixe">
                  <span class="row-fixe-label">Salaire Fixe (Paris IDF)</span>
                  <span class="row-fixe-value">
                    ${state.grossSalary.toLocaleString('fr-FR')} €
                  </span>
                </div>

                <div
                  class="salary-row ${
                    state.variableBonus > 0 ? 'row-variable-active' : 'row-variable-inactive'
                  }"
                >
                  <span class="row-variable-label"> Part Variable </span>
                  <span
                    class="row-variable-value ${
                      state.variableBonus > 0 ? 'variable-text-active' : 'variable-text-inactive'
                    }"
                  >
                    ${
                      state.variableBonus > 0
                        ? `+ ${state.variableBonus.toLocaleString('fr-FR')} €`
                        : '0 €'
                    }
                  </span>
                </div>
              </div>

              <div class="extra-metrics">
                <div class="extra-metric-row">
                  <span class="metric-label">Chiffre d'affaires estimé</span>
                  <span class="metric-val"> ${state.billedRevenue.toLocaleString('fr-FR')} € </span>
                </div>
                <div class="extra-metric-row">
                  <span class="metric-label">Congés &amp; RTT &amp; Repos</span>
                  <span class="metric-val">${state.totalHolidays} jours</span>
                </div>
              </div>
            </div>

            <!-- Contact CTA -->
            <div class="cta-container">
              <a href="${this.contactHref}" class="cta-link"> Postuler avec ce profil </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-simulator': EdwynSimulator;
  }
}
