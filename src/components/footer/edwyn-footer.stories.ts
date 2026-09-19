import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-footer';

const meta: Meta = {
  title: 'Components/Navigation & Structure/Footer',
  component: 'edwyn-footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pied de page responsive à 4 colonnes (Marque, Navigation, Légal, Contact) et bandeau inférieur de copyright avec slots personnalisables.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    year: 2026,
    brandTitle: 'EDWYN',
    tagline: "L'ESN Alternative qui mise sur la transparence et l'humain.",
  },
  render: (args) => html`
    <edwyn-footer
      .year=${args.year}
      .brandTitle=${args.brandTitle}
      .tagline=${args.tagline}
    ></edwyn-footer>
  `,
};

export const CustomFooterContent: Story = {
  name: 'Custom Footer Content',
  args: {
    year: 2026,
    brandTitle: 'EDWYN TECH',
    tagline: 'Artisans du code, transparence radicale et redistribution de la valeur.',
    contactLocation: 'Paris • Lyon • Nantes • Full Remote',
  },
  render: (args) => {
    const customNav = [
      { label: 'Calculateur Salarial', href: '/simulateur' },
      { label: 'Manifeste Craftsmanship', href: '/craft' },
      { label: 'Offres Ouvertes', href: '/carrieres' },
    ];

    return html`
      <edwyn-footer
        .year=${args.year}
        .brandTitle=${args.brandTitle}
        .tagline=${args.tagline}
        .contactLocation=${args.contactLocation}
        .navLinks=${customNav}
      ></edwyn-footer>
    `;
  },
};
