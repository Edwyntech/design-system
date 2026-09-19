import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-input';
import '../button/edwyn-button';
import '../badge/edwyn-badge';
import '../card/edwyn-card';
import '../icon/edwyn-icon';

const meta: Meta = {
  title: 'Components/Forms & Inputs/Input',
  component: 'edwyn-input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Champ de saisie texte accessible et interactif, doté de slots pour préfixe et suffixe (`prefix`, `suffix`), validation d’erreur intégrée avec attributs ARIA et bouton d’effacement rapide.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    label: 'Nom complet',
    placeholder: 'ex: Sarah Connor',
    helperText: 'Renseignez votre nom ou pseudonyme professionnel',
    size: 'md',
    clearable: true,
  },
  render: (args) => html`
    <div style="width: 360px; max-width: 100%;">
      <edwyn-input
        .label="${args.label}"
        .placeholder="${args.placeholder}"
        .helperText="${args.helperText}"
        .size="${args.size}"
        ?clearable="${args.clearable}"
      ></edwyn-input>
    </div>
  `,
};

export const ValidationErrorState: Story = {
  name: 'Validation Error State',
  args: {
    label: 'Adresse email professionnelle',
    value: 'contact@email-invalide',
    errorMessage: 'Veuillez saisir une adresse email valide (ex: consultant@edwyn.tech)',
    required: true,
  },
  render: (args) => html`
    <div style="width: 360px; max-width: 100%;">
      <edwyn-input
        .label="${args.label}"
        .value="${args.value}"
        .errorMessage="${args.errorMessage}"
        ?required="${args.required}"
      ></edwyn-input>
    </div>
  `,
};

export const DailyRateInput: Story = {
  name: 'Daily Rate Input',
  render: () => html`
    <div style="width: 380px; max-width: 100%;">
      <edwyn-input
        label="Taux Journalier Moyen (TJM)"
        type="number"
        value="650"
        min="300"
        max="2000"
        step="10"
        helper-text="Moyenne constatée en Île-de-France : 600€ - 850€"
      >
        <span slot="prefix" style="color: var(--edwyn-color-primary, #f08200); font-weight: 700;"
          >€</span
        >
        <span
          slot="suffix"
          style="color: var(--edwyn-color-text-muted, #a3a8aa); font-size: 0.8125rem;"
          >/ jour HT</span
        >
      </edwyn-input>
    </div>
  `,
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => html`
    <div style="width: 360px; display: flex; flex-direction: column; gap: 1.25rem;">
      <edwyn-input
        size="sm"
        label="Taille Petite (32px)"
        placeholder="Saisie compacte"
      ></edwyn-input>
      <edwyn-input
        size="md"
        label="Taille Moyenne (40px)"
        placeholder="Saisie standard"
      ></edwyn-input>
      <edwyn-input
        size="lg"
        label="Taille Grande (48px)"
        placeholder="Saisie mise en avant"
      ></edwyn-input>
    </div>
  `,
};

export const IntegratedSimulatorWidget: Story = {
  name: 'Integrated Simulator Widget',
  render: () => html`
    <div style="width: 440px; max-width: 100%;">
      <edwyn-card interactive>
        <div
          slot="title"
          style="display: flex; justify-content: space-between; align-items: center; width: 100%;"
        >
          <span>Simulateur de Salaire</span>
          <edwyn-badge variant="primary" size="sm" dot>Live</edwyn-badge>
        </div>
        <div
          slot="description"
          style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;"
        >
          <p style="margin: 0; color: var(--edwyn-color-text-muted, #a3a8aa); font-size: 0.875rem;">
            Modèle transparent Edwyn : 100% de la marge excédentaire redistribuée sous forme de
            variable.
          </p>
          <edwyn-input
            label="Votre TJM estimé"
            type="number"
            value="580"
            helper-text="Tarif Journalier Moyen Hors Taxes"
          >
            <span
              slot="prefix"
              style="color: var(--edwyn-color-primary, #f08200); font-weight: 700;"
              >€</span
            >
            <span slot="suffix">/ jour HT</span>
          </edwyn-input>
          <edwyn-input
            label="Jours facturés par an"
            type="number"
            value="218"
            helper-text="Base forfait jours standard"
          >
            <span slot="suffix">jours / an</span>
          </edwyn-input>
        </div>
        <div slot="footer" style="display: flex; justify-content: flex-end; width: 100%;">
          <edwyn-button variant="simulator" full-width href="/simulateur">
            Simuler mon package complet 🚀
          </edwyn-button>
        </div>
      </edwyn-card>
    </div>
  `,
};
