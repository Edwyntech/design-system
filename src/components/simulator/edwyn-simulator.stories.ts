import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-simulator';
import '../navbar/edwyn-navbar';
import '../footer/edwyn-footer';

const meta: Meta = {
  title: 'Patterns & Experiences/Salary Simulator',
  component: 'edwyn-simulator',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Simulateur officiel de package et de salaire de l’ESN Edwyn, conforme à l’outil disponible sur https://www.edwyn.tech/simulateur. Implémente l’algorithme de calcul transparent avec redistribution de 100% de la marge excédentaire.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default5Years: Story = {
  name: 'Default (5 years)',
  args: {
    experience: 5,
    tjm: 580,
    daysBilled: 218,
    contactHref: '/contact',
    hideHeader: false,
  },
  render: (args) => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); padding: 2rem 1rem; border-radius: 1rem;"
    >
      <edwyn-simulator
        .experience=${args.experience}
        .tjm=${args.tjm}
        .daysBilled=${args.daysBilled}
        .contactHref=${args.contactHref}
        ?hide-header=${args.hideHeader}
      ></edwyn-simulator>
    </div>
  `,
};

export const JuniorProfile: Story = {
  name: 'Junior Profile (3 years)',
  args: {
    experience: 3,
    tjm: 540,
    daysBilled: 218,
    contactHref: '/contact',
    hideHeader: false,
  },
  render: (args) => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); padding: 2rem 1rem; border-radius: 1rem;"
    >
      <edwyn-simulator
        .experience=${args.experience}
        .tjm=${args.tjm}
        .daysBilled=${args.daysBilled}
        .contactHref=${args.contactHref}
        ?hide-header=${args.hideHeader}
      ></edwyn-simulator>
    </div>
  `,
};

export const SeniorProfile: Story = {
  name: 'Senior Profile (8 years)',
  args: {
    experience: 8,
    tjm: 640,
    daysBilled: 218,
    contactHref: '/contact',
    hideHeader: false,
  },
  render: (args) => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); padding: 2rem 1rem; border-radius: 1rem;"
    >
      <edwyn-simulator
        .experience=${args.experience}
        .tjm=${args.tjm}
        .daysBilled=${args.daysBilled}
        .contactHref=${args.contactHref}
        ?hide-header=${args.hideHeader}
      ></edwyn-simulator>
    </div>
  `,
};

export const LeadCraftsman: Story = {
  name: 'Lead Craftsman (11+ years)',
  args: {
    experience: 11,
    tjm: 670,
    daysBilled: 218,
    contactHref: '/contact',
    hideHeader: false,
  },
  render: (args) => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); padding: 2rem 1rem; border-radius: 1rem;"
    >
      <edwyn-simulator
        .experience=${args.experience}
        .tjm=${args.tjm}
        .daysBilled=${args.daysBilled}
        .contactHref=${args.contactHref}
        ?hide-header=${args.hideHeader}
      ></edwyn-simulator>
    </div>
  `,
};

export const EmbeddableWidget: Story = {
  name: 'Embeddable Widget (No Header)',
  args: {
    experience: 5,
    tjm: 580,
    daysBilled: 218,
    contactHref: '/contact',
    hideHeader: true,
  },
  render: (args) => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); padding: 2rem 1rem; border-radius: 1rem;"
    >
      <edwyn-simulator
        .experience=${args.experience}
        .tjm=${args.tjm}
        .daysBilled=${args.daysBilled}
        .contactHref=${args.contactHref}
        ?hide-header=${args.hideHeader}
      ></edwyn-simulator>
    </div>
  `,
};

export const FullPublicPage: Story = {
  name: 'Full Public Page',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); min-height: 100vh; color: var(--edwyn-color-text, #ffffff); font-family: var(--edwyn-font-body), 'Inter', sans-serif; display: flex; flex-direction: column;"
    >
      <edwyn-navbar activeHref="/simulateur"></edwyn-navbar>

      <main style="flex: 1; padding: 7rem 1.5rem 4rem 1.5rem;">
        <edwyn-simulator></edwyn-simulator>
      </main>

      <edwyn-footer .year=${2026}></edwyn-footer>
    </div>
  `,
};
