import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-navbar';
import '../button/edwyn-button';

const meta: Meta = {
  title: 'Components/Navigation & Structure/Navbar',
  component: 'edwyn-navbar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Barre de navigation principale responsive supportant le positionnement fixe ou relatif, un flou d’arrière-plan glassmorphism, un menu déroulant mobile accessible (ARIA) et des boutons d’appel à l’action configurables.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    activeHref: '/',
    position: 'relative',
  },
  render: (args) => html`
    <div style="min-height: 200px; background: var(--edwyn-color-bg, #292e30); padding: 0;">
      <edwyn-navbar
        .activeHref="${args.activeHref}"
        .position="${args.position || 'relative'}"
      ></edwyn-navbar>
    </div>
  `,
};

export const ActivePage: Story = {
  name: 'Active Page',
  args: {
    activeHref: '/notre-vision',
    position: 'relative',
  },
  render: (args) => html`
    <div style="min-height: 200px; background: var(--edwyn-color-bg, #292e30); padding: 0;">
      <edwyn-navbar
        .activeHref="${args.activeHref}"
        .position="${args.position || 'relative'}"
      ></edwyn-navbar>
    </div>
  `,
};

export const CustomAppNavigation: Story = {
  name: 'Custom App Navigation',
  args: {
    position: 'relative',
  },
  render: (args) => {
    const customItems = [
      { label: 'Calculateur TJM', href: '/tjm' },
      { label: 'Grille Salariale', href: '/grille' },
      { label: 'Frais & Avantages', href: '/avantages' },
      { label: 'Documentation', href: '/docs' },
    ];

    return html`
      <div style="min-height: 200px; background: var(--edwyn-color-bg, #292e30); padding: 0;">
        <edwyn-navbar
          brandName="EDWYN SIMULATOR"
          .items=${customItems}
          activeHref="/tjm"
          .position="${args.position || 'relative'}"
          simulatorLabel="Lancer le calcul 🚀"
          simulatorHref="/calcul"
          contactLabel="Support"
          contactHref="/support"
        ></edwyn-navbar>
      </div>
    `;
  },
};

export const CustomActionsSlot: Story = {
  name: 'Custom Actions Slot',
  args: {
    position: 'relative',
  },
  render: (args) => html`
    <div style="min-height: 200px; background: var(--edwyn-color-bg, #292e30); padding: 0;">
      <edwyn-navbar
        brandName="EDWYN PORTAIL"
        activeHref="/"
        .position="${args.position || 'relative'}"
      >
        <div
          slot="actions"
          style="display: flex; gap: 0.5rem; align-items: center; margin-left: 1rem;"
        >
          <edwyn-button variant="outline" size="sm">Espace Consultant</edwyn-button>
          <edwyn-button variant="primary" size="sm">Déconnexion</edwyn-button>
        </div>
      </edwyn-navbar>
    </div>
  `,
};

export const FixedWithRealScroll: Story = {
  name: 'Fixed with Real Scroll',
  args: {
    activeHref: '/',
    position: 'fixed',
  },
  render: (args) => html`
    <div
      style="background: var(--edwyn-color-bg, #292e30); min-height: 120vh; color: #ffffff; font-family: var(--edwyn-font-body), 'Inter', sans-serif; position: relative;"
    >
      <edwyn-navbar
        .activeHref="${args.activeHref}"
        .position="${args.position || 'fixed'}"
      ></edwyn-navbar>

      <main
        style="padding-top: 100px; max-width: 1280px; margin: 0 auto; padding-left: 1.5rem; padding-right: 1.5rem;"
      >
        <div
          style="padding: 2rem; border-radius: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 2rem;"
        >
          <h2
            style="font-family: var(--edwyn-font-heading), 'Syne', sans-serif; font-size: 2rem; margin: 0 0 1rem 0;"
          >
            Effet Glassmorphism & Fusion du Logo
          </h2>
          <p
            style="color: var(--edwyn-color-text-muted, #a3a8aa); line-height: 1.6; max-width: 700px;"
          >
            Le bandeau utilise un flou d'arrière-plan avec
            <code style="color: var(--edwyn-color-primary, #f08200);"
              >backdrop-filter: blur(12px)</code
            >
            et une couleur de fond
            <code style="color: var(--edwyn-color-primary, #f08200);"
              >color-mix(in srgb, var(--edwyn-color-bg) 80%, transparent)</code
            >. Le logo Edwyn GIF se fond parfaitement dans le bandeau grâce à l'alignement strict de
            la couleur de fond (<code style="color: var(--edwyn-color-primary, #f08200);"
              >#292e30</code
            >).
          </p>
        </div>

        <div
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;"
        >
          <div
            style="padding: 1.5rem; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);"
          >
            <h3 style="margin-top: 0;">Transparence Totale</h3>
            <p style="color: var(--edwyn-color-text-muted, #a3a8aa);">
              Modèle sans marge cachée, redistribution équitable.
            </p>
          </div>
          <div
            style="padding: 1.5rem; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05);"
          >
            <h3 style="margin-top: 0;">Excellence Technique</h3>
            <p style="color: var(--edwyn-color-text-muted, #a3a8aa);">
              Expertise de pointe sur le Modern Web et le Cloud.
            </p>
          </div>
        </div>
      </main>
    </div>
  `,
};
