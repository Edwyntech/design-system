import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-stat-item';

const meta: Meta = {
  title: 'Components/Feedback & Status/StatItem',
  component: 'edwyn-stat-item',
  parameters: {
    docs: {
      description: {
        component:
          'Bloc d’affichage de métrique ou statistique clé, combinant un chiffre à fort impact en police Syne et une légende explicative en Inter.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SingleMetric: Story = {
  name: 'Single Metric',
  args: {
    value: '3,2M€',
    label: "de chiffre d'affaires",
  },
  render: (args) => html`
    <edwyn-stat-item .value=${args.value} .label=${args.label}></edwyn-stat-item>
  `,
};

export const KeyMetricsBar: Story = {
  name: 'Key Metrics Bar',
  render: () => html`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid var(--edwyn-color-border);
        border-bottom: 1px solid var(--edwyn-color-border);
        border-radius: 12px;
        overflow: hidden;
      "
    >
      <edwyn-stat-item value="2021" label="Fondée en"></edwyn-stat-item>
      <edwyn-stat-item value="3,2M€" label="de chiffre d'affaires"></edwyn-stat-item>
      <edwyn-stat-item value="+30" label="missions en cours"></edwyn-stat-item>
      <edwyn-stat-item value="+35" label="références clients multisecteur"></edwyn-stat-item>
      <edwyn-stat-item
        value="+104k€"
        label="de marge excédentaire redistribuée en 2025"
      ></edwyn-stat-item>
    </div>
  `,
};
