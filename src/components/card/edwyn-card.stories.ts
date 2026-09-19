import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-card';
import '../button/edwyn-button';
import '../icon/edwyn-icon';

const meta: Meta = {
  title: 'Components/Data Display & Containers/Card',
  component: 'edwyn-card',
  parameters: {
    docs: {
      description: {
        component:
          'Conteneur glassmorphism avec lueur atmosphérique orange, survol interactif animé et support pour mise en avant (`highlighted`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    interactive: true,
    highlighted: false,
  },
  render: (args) => html`
    <div style="max-width: 380px;">
      <edwyn-card ?interactive="${args.interactive}" ?highlighted="${args.highlighted}">
        <div slot="icon">
          <edwyn-icon name="rocket" .size="${28}"></edwyn-icon>
        </div>
        <h3 slot="title">Notre Vision</h3>
        <p slot="description">
          Une approche centrée sur l'humain, la transparence absolue, l'expertise technique et le
          partage de la valeur créée.
        </p>
        <div slot="footer">
          <edwyn-button variant="primary" full-width>
            Découvrir
            <edwyn-icon slot="suffix" name="arrow-right" .size="${16}"></edwyn-icon>
          </edwyn-button>
        </div>
      </edwyn-card>
    </div>
  `,
};

export const ThreePillarsGrid: Story = {
  name: 'Three Pillars Grid',
  render: () => html`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1100px;
        align-items: center;
        padding: 2rem 0;
      "
    >
      <!-- Pilier 1: Notre Vision -->
      <edwyn-card interactive>
        <div slot="icon">
          <edwyn-icon name="rocket" .size="${28}"></edwyn-icon>
        </div>
        <h3 slot="title">Notre Vision</h3>
        <p slot="description">
          Une approche centrée sur l'humain, la transparence, l'expertise technique et la
          redistribution équitable.
        </p>
        <div slot="footer">
          <edwyn-button variant="primary" full-width href="#vision">
            Découvrir
            <edwyn-icon slot="suffix" name="arrow-right" .size="${16}"></edwyn-icon>
          </edwyn-button>
        </div>
      </edwyn-card>

      <!-- Pilier 2: Notre Modèle (Highlighted) -->
      <edwyn-card interactive highlighted>
        <div slot="icon">
          <edwyn-icon name="users" .size="${28}"></edwyn-icon>
        </div>
        <h3 slot="title">Notre Modèle</h3>
        <p slot="description">
          100% de la marge excédentaire redistribuée aux consultants. Un modèle transparent,
          équitable et durable.
        </p>
        <div slot="footer">
          <edwyn-button variant="simulator" full-width href="/simulateur">
            Simulateur 🚀
          </edwyn-button>
        </div>
      </edwyn-card>

      <!-- Pilier 3: Nos Métiers -->
      <edwyn-card interactive>
        <div slot="icon">
          <edwyn-icon name="check" .size="${28}"></edwyn-icon>
        </div>
        <h3 slot="title">Nos Métiers</h3>
        <p slot="description">
          Développement, Architecture, DevOps, Data et Conseil en technologies innovantes par des
          artisans du code.
        </p>
        <div slot="footer">
          <edwyn-button variant="outline" full-width href="#expertises">
            Explorer
            <edwyn-icon slot="suffix" name="arrow-right" .size="${16}"></edwyn-icon>
          </edwyn-button>
        </div>
      </edwyn-card>
    </div>
  `,
};
