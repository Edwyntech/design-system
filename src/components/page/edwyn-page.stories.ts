import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../navbar/edwyn-navbar';
import '../hero/edwyn-hero';
import '../stat-item/edwyn-stat-item';
import '../card/edwyn-card';
import '../button/edwyn-button';
import '../badge/edwyn-badge';
import '../icon/edwyn-icon';
import '../input/edwyn-input';
import '../footer/edwyn-footer';
import '../simulator/edwyn-simulator';

const meta: Meta = {
  title: 'Patterns & Experiences/Official Showcase Site',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reproduction fidèle de la page d’accueil du site officiel edwyn.tech, assemblée à partir de l’ensemble des composants du Design System (Navbar, Hero, StatItems, Cards glassmorphism et Footer).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const OfficialShowcaseSite: Story = {
  name: 'Official Showcase Site',
  render: () => html`
    <div
      style="background-color: var(--edwyn-color-bg, #292e30); min-height: 100vh; color: var(--edwyn-color-text, #ffffff); font-family: var(--edwyn-font-body), 'Inter', sans-serif; overflow-x: hidden;"
    >
      <!-- Barre de navigation supérieure -->
      <edwyn-navbar activeHref="/"></edwyn-navbar>

      <main style="position: relative;">
        <!-- Section Hero avec photo vivante et logo bicolore -->
        <edwyn-hero ?attenuated="${true}"></edwyn-hero>

        <!-- Bandeau de métriques clés -->
        <section
          style="border-top: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05)); border-bottom: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05)); background: rgba(255, 255, 255, 0.02); position: relative; z-index: 10; font-family: var(--edwyn-font-body);"
        >
          <div
            style="max-width: 896px; margin: 0 auto; padding: 0 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));"
          >
            <div
              style="border-right: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));"
            >
              <edwyn-stat-item value="2021" label="Fondée en"></edwyn-stat-item>
            </div>
            <div
              style="border-right: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));"
            >
              <edwyn-stat-item value="3,2M€" label="de chiffre d'affaires"></edwyn-stat-item>
            </div>
            <div
              style="border-right: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));"
            >
              <edwyn-stat-item value="+30" label="missions en cours"></edwyn-stat-item>
            </div>
            <div
              style="border-right: 1px solid var(--edwyn-color-border-subtle, rgba(255, 255, 255, 0.05));"
            >
              <edwyn-stat-item
                value="+35"
                label="références clients multisecteur"
              ></edwyn-stat-item>
            </div>
            <div>
              <edwyn-stat-item
                value="+104k€"
                label="de marge excédentaire redistribuée en 2025"
              ></edwyn-stat-item>
            </div>
          </div>
        </section>

        <!-- Section des 3 Piliers -->
        <section
          style="max-width: 1280px; margin: 0 auto; padding: 6rem 1.5rem; position: relative; z-index: 10;"
        >
          <div style="text-align: center; max-width: 56rem; margin: 0 auto 4rem auto;">
            <h2
              style="font-family: var(--edwyn-font-heading), 'Syne', sans-serif; font-size: clamp(2.25rem, 5vw, 3rem); font-weight: 700; margin: 0 0 1.5rem 0; letter-spacing: -0.025em; line-height: 1.1;"
            >
              Découvrez <span style="color: var(--edwyn-color-primary, #f08200);">Edwyn</span>
            </h2>
            <p
              style="font-family: var(--edwyn-font-body), 'Inter', sans-serif; font-size: 1.25rem; font-weight: 300; color: var(--edwyn-color-text-muted, #a3a8aa); line-height: 1.625; margin: 0;"
            >
              Explorez l'écosystème Edwyn à travers nos 3 grands piliers fondamentaux.
            </p>
          </div>

          <div
            style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; align-items: stretch;"
          >
            <!-- Pilier 1 : Vision -->
            <edwyn-card interactive>
              <edwyn-icon slot="icon" name="rocket" .size=${28}></edwyn-icon>
              <h3 slot="title">Notre Vision</h3>
              <p slot="description">
                Découvrez pourquoi nous avons créé Edwyn. Notre ambition de redéfinir les standards
                de l'ESN avec une approche fondamentalement plus juste et transparente.
              </p>
              <div slot="footer">
                <edwyn-button variant="outline" full-width href="/notre-vision" .rounded=${true}>
                  Découvrir la Vision
                  <edwyn-icon slot="suffix" name="arrow-right" .size=${16}></edwyn-icon>
                </edwyn-button>
              </div>
            </edwyn-card>

            <!-- Pilier 2 : Modèle (Mis en avant) -->
            <edwyn-card interactive highlighted>
              <edwyn-icon slot="icon" name="users" .size=${28}></edwyn-icon>
              <h3 slot="title">Notre Modèle</h3>
              <p slot="description">
                Un système économique unique où la transparence est la norme. Salaire fixe, variable
                ultra-motivant (100% de la marge excédentaire), et avantages repensés.
              </p>
              <div slot="footer">
                <edwyn-button variant="primary" full-width href="/notre-modele" .rounded=${true}>
                  Voir le Modèle
                  <edwyn-icon slot="suffix" name="arrow-right" .size=${16}></edwyn-icon>
                </edwyn-button>
              </div>
            </edwyn-card>

            <!-- Pilier 3 : Expertises -->
            <edwyn-card interactive>
              <edwyn-icon slot="icon" name="check" .size=${28}></edwyn-icon>
              <h3 slot="title">Nos Expertises</h3>
              <p slot="description">
                L'excellence technique ancrée dans notre ADN grâce au Software Craftsmanship.
                Développement Web, Architecture, et Cloud &amp; DevOps.
              </p>
              <div slot="footer">
                <edwyn-button variant="outline" full-width href="/nos-expertises" .rounded=${true}>
                  Parcourir nos Expertises
                  <edwyn-icon slot="suffix" name="arrow-right" .size=${16}></edwyn-icon>
                </edwyn-button>
              </div>
            </edwyn-card>
          </div>
        </section>
      </main>

      <!-- Pied de page -->
      <edwyn-footer .year=${2026}></edwyn-footer>
    </div>
  `,
};
