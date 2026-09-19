import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-hero';
import '../badge/edwyn-badge';
import '../button/edwyn-button';

const meta: Meta = {
  title: 'Patterns & Experiences/Hero Banner',
  component: 'edwyn-hero',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Bannière Hero immersive pleine hauteur (`100vh`), avec fond photo de l’équipe Edwyn atténué, logo central duotone en animation douce, et indicateur de défilement vers le bas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const OfficialPublicSite: Story = {
  name: 'Official Public Site',
  args: {
    title: "L'ESN",
    highlight: 'Alternative',
    subtitle:
      "Une approche centrée sur l'humain, la transparence, l'expertise technique et la redistribution.",
    attenuated: true,
    showScrollIndicator: true,
  },
  render: (args) => html`
    <edwyn-hero
      .title=${args.title}
      .highlight=${args.highlight}
      .subtitle=${args.subtitle}
      ?attenuated=${args.attenuated}
      ?show-scroll-indicator=${args.showScrollIndicator}
    ></edwyn-hero>
  `,
};

export const WithBadgeAndActions: Story = {
  name: 'With Badge and Actions',
  args: {
    title: 'Propulsez votre carrière chez',
    highlight: 'Edwyn',
    subtitle:
      'Rejoignez un collectif d’artisans du code où la transparence est la norme et la valeur partagée à 100%.',
    attenuated: true,
    showScrollIndicator: true,
  },
  render: (args) => html`
    <edwyn-hero
      .title=${args.title}
      .highlight=${args.highlight}
      .subtitle=${args.subtitle}
      ?attenuated=${args.attenuated}
      ?show-scroll-indicator=${args.showScrollIndicator}
    >
      <div slot="badge" style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
        <edwyn-badge variant="subtle" dot>Recrutement Continu 2026</edwyn-badge>
      </div>

      <div slot="actions">
        <edwyn-button variant="simulator" size="lg" href="/simulateur">
          Simuler mon salaire 🚀
        </edwyn-button>
        <edwyn-button variant="outline" size="lg" href="#vision">
          Découvrir la vision
        </edwyn-button>
      </div>
    </edwyn-hero>
  `,
};

export const TransparentBackgroundNoImage: Story = {
  name: 'Without Background Image',
  args: {
    title: 'Excellence Technique &',
    highlight: 'Transparence',
    subtitle: 'Architecture logicielle, cloud native et accompagnement stratégique sur mesure.',
    backgroundImage: '',
    attenuated: false,
    showScrollIndicator: false,
  },
  render: (args) => html`
    <edwyn-hero
      .title=${args.title}
      .highlight=${args.highlight}
      .subtitle=${args.subtitle}
      .backgroundImage=${args.backgroundImage}
      ?attenuated=${args.attenuated}
      ?show-scroll-indicator=${args.showScrollIndicator}
    ></edwyn-hero>
  `,
};
