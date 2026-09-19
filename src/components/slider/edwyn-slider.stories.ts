import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-slider';
import '../card/edwyn-card';

const meta: Meta = {
  title: 'Components/Forms & Inputs/Slider',
  component: 'edwyn-slider',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Curseur interactif de sélection de plage numérique (`edwyn-slider`). Utilisé au cœur du Simulateur de Rémunération Edwyn pour sélectionner l’expérience, le TJM et le nombre de jours facturés. Propose un remplissage dynamique en Orange signature, un affichage temps réel de la valeur, des bornes configurables et un support complet du thème sombre Dark Slate et du mode Light.',
      },
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    label: { control: { type: 'text' } },
    sublabel: { control: { type: 'text' } },
    unit: { control: { type: 'text' } },
    minLabel: { control: { type: 'text' } },
    maxLabel: { control: { type: 'text' } },
    warning: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    label: 'Niveau d’autonomie',
    sublabel: 'Auto-évaluation sur l’échelle de 0 à 100%',
    value: 65,
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    minLabel: '0% (Débutant)',
    maxLabel: '100% (Expert)',
  },
  render: (args) => html`
    <div style="width: 440px; max-width: 100%; padding: 1rem;">
      <edwyn-slider
        .label=${args.label}
        .sublabel=${args.sublabel}
        .value=${args.value}
        .min=${args.min}
        .max=${args.max}
        .step=${args.step}
        .unit=${args.unit}
        .minLabel=${args.minLabel}
        .maxLabel=${args.maxLabel}
        .warning=${args.warning || ''}
        ?disabled=${args.disabled}
      ></edwyn-slider>
    </div>
  `,
};

export const ExperienceSlider: Story = {
  name: 'Experience (Simulateur)',
  render: () => html`
    <div
      style="width: 440px; max-width: 100%; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;"
    >
      <edwyn-slider
        label="Expérience"
        sublabel="Années de pratique professionnelle"
        .value=${5}
        .min=${3}
        .max=${11}
        .step=${1}
        unit="ans"
        min-label="3 ans (Min)"
        max-label="11+ ans (Max)"
      ></edwyn-slider>
    </div>
  `,
};

export const DailyRateTjm: Story = {
  name: 'TJM Facturé (€)',
  render: () => html`
    <div
      style="width: 440px; max-width: 100%; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;"
    >
      <edwyn-slider
        label="TJM Facturé"
        sublabel="Tarif Journalier Moyen HT"
        .value=${650}
        .min=${350}
        .max=${1000}
        .step=${10}
        unit="€"
        min-label="Seuil Min. (350€)"
        max-label="1000€"
      ></edwyn-slider>
    </div>
  `,
};

export const WarningState: Story = {
  name: 'Warning State (Seuil Rentabilité)',
  render: () => html`
    <div
      style="width: 440px; max-width: 100%; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;"
    >
      <edwyn-slider
        label="TJM Facturé"
        sublabel="Tarif Journalier Moyen"
        .value=${420}
        .min=${350}
        .max=${1000}
        .step=${5}
        unit="€"
        min-label="Seuil Min. Requis (450€)"
        max-label="1000€"
        warning="⚠️ En dessous du seuil de rentabilité"
      ></edwyn-slider>
    </div>
  `,
};

export const ActivityDays: Story = {
  name: 'Activité (Jours / an)',
  render: () => html`
    <div
      style="width: 440px; max-width: 100%; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;"
    >
      <edwyn-slider
        label="Activité"
        sublabel="Jours facturés / an"
        .value=${218}
        .min=${180}
        .max=${235}
        .step=${1}
        unit="jours"
        min-label="Objectif min. (180)"
        max-label="Max (235)"
      ></edwyn-slider>
    </div>
  `,
};

export const Disabled: Story = {
  name: 'Disabled State',
  render: () => html`
    <div style="width: 440px; max-width: 100%; padding: 1.5rem;">
      <edwyn-slider
        label="Paramètre Verrouillé"
        sublabel="Modifiable uniquement par un administrateur"
        .value=${50}
        .min=${0}
        .max=${100}
        unit="%"
        disabled
      ></edwyn-slider>
    </div>
  `,
};
