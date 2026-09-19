import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-badge';
import '../icon/edwyn-icon';

const meta: Meta = {
  title: 'Components/Feedback & Status/Badge',
  component: 'edwyn-badge',
  parameters: {
    docs: {
      description: {
        component:
          'Badge compact d’état ou de statut servant à mettre en valeur des métadonnées, des labels techniques ou des indicateurs animés.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Subtle: Story = {
  name: 'Subtle',
  args: {
    variant: 'subtle',
    size: 'sm',
    pill: true,
    dot: false,
  },
  render: (args) => html`
    <edwyn-badge
      variant="${args.variant}"
      size="${args.size}"
      ?pill="${args.pill}"
      ?dot="${args.dot}"
    >
      ESN Alternative
    </edwyn-badge>
  `,
};

export const WithPulsingDot: Story = {
  name: 'With Pulsing Dot',
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <edwyn-badge variant="subtle" dot>Disponible pour mission</edwyn-badge>
      <edwyn-badge variant="primary" dot>En Direct 2026</edwyn-badge>
      <edwyn-badge variant="glass" dot>Architecture Hexagonale</edwyn-badge>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <edwyn-badge variant="subtle">Java</edwyn-badge>
        <edwyn-badge variant="subtle">.NET</edwyn-badge>
        <edwyn-badge variant="subtle">Software Craftsmanship</edwyn-badge>
        <edwyn-badge variant="subtle">Domain-Driven Design</edwyn-badge>
      </div>

      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <edwyn-badge variant="primary">100% Transparence</edwyn-badge>
        <edwyn-badge variant="glass">Paris, France</edwyn-badge>
        <edwyn-badge variant="outline">Web Components</edwyn-badge>
      </div>
    </div>
  `,
};
