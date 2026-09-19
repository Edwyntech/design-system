import type { Meta, StoryObj } from '@storybook/web-components';
import { expect, fn } from 'storybook/test';
import { html } from 'lit';
import './edwyn-button';
import '../icon/edwyn-icon';

const meta: Meta = {
  title: 'Components/Actions/Button',
  component: 'edwyn-button',
  parameters: {
    docs: {
      description: {
        component:
          'Bouton interactif supportant plusieurs variantes visuelles, tailles standardisées, formes pilules ou rectangles adoucis, états de chargement et gestion native des liens (`href`).',
      },
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  name: 'Primary',
  args: {
    variant: 'primary',
    size: 'md',
    pill: true,
    label: 'Contacter',
  },
  render: (args) => html`
    <edwyn-button
      variant="${args.variant}"
      size="${args.size}"
      ?pill="${args.pill}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      @click=${args.onClick}
    >
      ${args.label || 'Contacter'}
    </edwyn-button>
  `,
  play: async function ({ args, canvasElement, userEvent }) {
    const button = canvasElement.querySelector('edwyn-button');
    if (button) {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalled();
    }
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true,
    label: 'Désactivé',
  },
  render: (args) => html`
    <edwyn-button ?disabled="${args.disabled}" @click=${args.onClick}> ${args.label} </edwyn-button>
  `,
  play: async function ({ args, canvasElement, userEvent }) {
    const button = canvasElement.querySelector('edwyn-button');
    if (button) {
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-disabled', 'true');
      await expect(args.onClick).not.toHaveBeenCalled();
    }
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <edwyn-button variant="primary">
        Découvrir la Vision
        <edwyn-icon slot="suffix" name="arrow-right" .size="${16}"></edwyn-icon>
      </edwyn-button>

      <edwyn-button variant="simulator">
        <edwyn-icon slot="prefix" name="sparkles" .size="${16}"></edwyn-icon>
        Simulateur 🚀
      </edwyn-button>

      <edwyn-button variant="outline">
        Voir le Modèle
        <edwyn-icon slot="suffix" name="arrow-right" .size="${16}"></edwyn-icon>
      </edwyn-button>
    </div>
  `,
};

export const AllVariantsAndSizes: Story = {
  name: 'All Variants & Sizes',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <edwyn-button variant="primary">Primaire</edwyn-button>
        <edwyn-button variant="secondary">Secondaire</edwyn-button>
        <edwyn-button variant="outline">Contour</edwyn-button>
        <edwyn-button variant="ghost">Discret</edwyn-button>
        <edwyn-button variant="simulator">Simulateur 🚀</edwyn-button>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <edwyn-button variant="primary" size="sm">Petit (SM)</edwyn-button>
        <edwyn-button variant="primary" size="md">Moyen (MD)</edwyn-button>
        <edwyn-button variant="primary" size="lg">Grand (LG)</edwyn-button>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <edwyn-button variant="primary" disabled>Désactivé</edwyn-button>
        <edwyn-button variant="primary" loading>En Chargement</edwyn-button>
        <edwyn-button variant="outline" ?pill="${false}">Coins Droits Adoucis</edwyn-button>
      </div>
    </div>
  `,
};
