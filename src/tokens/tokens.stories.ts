import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../components/button/edwyn-button';
import '../components/badge/edwyn-badge';
import '../components/card/edwyn-card';
import '../components/input/edwyn-input';
import '../components/slider/edwyn-slider';
import '../components/icon/edwyn-icon';

const meta: Meta = {
  title: 'Foundations/Interactive Playground',
  parameters: {
    docs: {
      description: {
        component:
          'Tokens de design fondamentaux de l’écosystème Edwyn Tech, alignés exactement sur le site public de production https://www.edwyn.tech. Définis en CSS Custom Properties (variables CSS) pour une interopérabilité totale sans dépendance de framework.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ColorPalette: Story = {
  name: 'Color Palette',
  render: () => html`
    <div
      style="font-family: var(--edwyn-font-body), sans-serif; color: var(--edwyn-color-text); padding: 1.5rem; max-width: 960px;"
    >
      <h2
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 2rem; margin-bottom: 0.5rem; color: var(--edwyn-color-primary);"
      >
        Palette de Couleurs Edwyn
      </h2>
      <p style="color: var(--edwyn-color-text-muted); margin-bottom: 2rem;">
        Couleur orange de marque, surfaces Dark Slate du site public, cartes glassmorphism et
        nuances alpha.
      </p>

      <h3
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.25rem; margin: 1.5rem 0 1rem;"
      >
        Couleur de Marque Primaire
      </h3>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;"
      >
        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 60px; background: var(--edwyn-color-primary); box-shadow: var(--edwyn-glow-orange-sm);"
          ></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">Orange Primaire</div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #f08200
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-primary
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-primary-hover);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Orange Survol (Hover)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #ff8f1a
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-primary-hover
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-primary-active);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Orange Actif (Pressed)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #d97400
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-primary-active
            </div>
          </div>
        </div>
      </div>

      <h3
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.25rem; margin: 2rem 0 1rem;"
      >
        Surfaces & Arrière-plans du Site Public
      </h3>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;"
      >
        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 60px; background: var(--edwyn-color-bg); border-bottom: 1px solid var(--edwyn-color-border);"
          ></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Fond Principal (Background)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #292e30 (Dark) / #f8fafc (Light)
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-bg
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 60px; background: var(--edwyn-color-muted); border-bottom: 1px solid var(--edwyn-color-border);"
          ></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Surface Atténuée (Muted)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #404648 (Dark) / #e2e8f0 (Light)
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-muted
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-hero-overlay);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Voile Hero (Overlay)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              rgba(0, 0, 0, 0.65)
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-hero-overlay
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 60px; background: var(--edwyn-color-card); backdrop-filter: blur(12px); border-bottom: 1px solid var(--edwyn-color-border);"
          ></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Surface Carte (Card)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              Card Glassmorphism
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-card
            </div>
          </div>
        </div>
      </div>

      <h3
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.25rem; margin: 2rem 0 1rem;"
      >
        Couleurs Sémantiques (Thème Tailwind Production)
      </h3>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem;"
      >
        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-success);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">Succès (Green 500)</div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #00c758
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-success
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-error);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">Erreur (Red 500)</div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #fb2c36
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-error
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-info);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">Info (Blue 500)</div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #3080ff
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-info
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div style="height: 60px; background: var(--edwyn-color-purple);"></div>
          <div style="padding: 1rem;">
            <div style="font-weight: 700; color: var(--edwyn-color-text);">
              Accent Violet (Purple 500)
            </div>
            <div
              style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.875rem; color: var(--edwyn-color-text-muted);"
            >
              #ac4bff
            </div>
            <div
              style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--edwyn-color-text-muted);"
            >
              --edwyn-color-purple
            </div>
          </div>
        </div>
      </div>

      <h3
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.25rem; margin: 2rem 0 1rem;"
      >
        Dégradés et Nuances Alpha Orange
      </h3>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem;"
      >
        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 48px; background: var(--edwyn-color-primary-alpha-10); border-bottom: 1px solid var(--edwyn-color-border-primary);"
          ></div>
          <div style="padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.875rem; color: var(--edwyn-color-text); font-weight: 600;">
              10% Alpha
            </div>
            <div
              style="font-size: 0.75rem; color: var(--edwyn-color-text-muted); font-family: var(--edwyn-font-mono), monospace;"
            >
              alpha-10
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 48px; background: var(--edwyn-color-primary-alpha-20); border-bottom: 1px solid var(--edwyn-color-border-primary);"
          ></div>
          <div style="padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.875rem; color: var(--edwyn-color-text); font-weight: 600;">
              20% Alpha
            </div>
            <div
              style="font-size: 0.75rem; color: var(--edwyn-color-text-muted); font-family: var(--edwyn-font-mono), monospace;"
            >
              alpha-20
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 48px; background: var(--edwyn-color-primary-alpha-30); border-bottom: 1px solid var(--edwyn-color-border-primary);"
          ></div>
          <div style="padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.875rem; color: var(--edwyn-color-text); font-weight: 600;">
              30% Alpha
            </div>
            <div
              style="font-size: 0.75rem; color: var(--edwyn-color-text-muted); font-family: var(--edwyn-font-mono), monospace;"
            >
              alpha-30
            </div>
          </div>
        </div>

        <div
          style="background: var(--edwyn-color-card); border: 1px solid var(--edwyn-color-border); border-radius: 8px; overflow: hidden;"
        >
          <div
            style="height: 48px; background: var(--edwyn-color-primary-alpha-50); border-bottom: 1px solid var(--edwyn-color-border-primary);"
          ></div>
          <div style="padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.875rem; color: var(--edwyn-color-text); font-weight: 600;">
              50% Alpha
            </div>
            <div
              style="font-size: 0.75rem; color: var(--edwyn-color-text-muted); font-family: var(--edwyn-font-mono), monospace;"
            >
              alpha-50
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const TypographySystem: Story = {
  name: 'Typography System',
  render: () => html`
    <div
      style="font-family: var(--edwyn-font-body), sans-serif; color: var(--edwyn-color-text); padding: 1.5rem; max-width: 960px;"
    >
      <h2
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 2rem; margin-bottom: 0.5rem; color: var(--edwyn-color-primary);"
      >
        Système Typographique
      </h2>
      <p style="color: var(--edwyn-color-text-muted); margin-bottom: 2rem;">
        Police <strong>Syne</strong> pour les titres forts et distinctifs,
        <strong>Inter</strong> pour une lisibilité optimale des textes, et
        <strong>Monospace</strong> pour le code et les chiffres.
      </p>

      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="border-bottom: 1px solid var(--edwyn-color-border); padding-bottom: 1.5rem;">
          <div
            style="font-size: 0.875rem; color: var(--edwyn-color-primary); margin-bottom: 0.25rem;"
          >
            Titre 7XL (4.5rem / 72px) - Syne Gras
          </div>
          <div
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: var(--edwyn-font-size-7xl); font-weight: 700; line-height: 1.1; letter-spacing: -0.025em;"
          >
            L'ESN <span style="color: var(--edwyn-color-primary);">Alternative</span>
          </div>
        </div>

        <div style="border-bottom: 1px solid var(--edwyn-color-border); padding-bottom: 1.5rem;">
          <div
            style="font-size: 0.875rem; color: var(--edwyn-color-primary); margin-bottom: 0.25rem;"
          >
            Titre 5XL (3rem / 48px) - Syne
          </div>
          <div
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: var(--edwyn-font-size-5xl); font-weight: 700;"
          >
            Découvrez <span style="color: var(--edwyn-color-primary);">Edwyn</span>
          </div>
        </div>

        <div style="border-bottom: 1px solid var(--edwyn-color-border); padding-bottom: 1.5rem;">
          <div
            style="font-size: 0.875rem; color: var(--edwyn-color-primary); margin-bottom: 0.25rem;"
          >
            Titre 3XL (1.875rem / 30px) - Syne
          </div>
          <div
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: var(--edwyn-font-size-3xl); font-weight: 700;"
          >
            Software Craftsmanship & Transparence
          </div>
        </div>

        <div style="border-bottom: 1px solid var(--edwyn-color-border); padding-bottom: 1.5rem;">
          <div
            style="font-size: 0.875rem; color: var(--edwyn-color-primary); margin-bottom: 0.25rem;"
          >
            Sous-titre / Texte Courant Large (1.5rem) - Inter Regular
          </div>
          <div
            style="font-family: var(--edwyn-font-body), sans-serif; font-size: var(--edwyn-font-size-2xl); color: var(--edwyn-color-text-muted); line-height: 1.5;"
          >
            Une approche centrée sur l'humain, la transparence, l'expertise technique et la
            redistribution.
          </div>
        </div>

        <div>
          <div
            style="font-size: 0.875rem; color: var(--edwyn-color-primary); margin-bottom: 0.25rem;"
          >
            Code / Monospace
          </div>
          <code
            style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.95rem; background: var(--edwyn-color-card); padding: 0.5rem 1rem; border-radius: 6px; display: inline-block;"
          >
            import { EdwynHero } from '@edwyn/visual-branding';
          </code>
        </div>
      </div>
    </div>
  `,
};

export const ShadowsAndGlows: Story = {
  name: 'Shadows & Glows',
  render: () => html`
    <div
      style="font-family: var(--edwyn-font-body), sans-serif; color: var(--edwyn-color-text); padding: 1.5rem; max-width: 960px;"
    >
      <h2
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 2rem; margin-bottom: 0.5rem; color: var(--edwyn-color-primary);"
      >
        Ombres & Lueurs Orange Signatures
      </h2>
      <p style="color: var(--edwyn-color-text-muted); margin-bottom: 2rem;">
        Utilisées pour les états de survol interactifs et les éléments focaux des applications
        Edwyn.
      </p>

      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem;"
      >
        <div
          style="background: var(--edwyn-color-muted); padding: 2rem; border-radius: 12px; border: 1px solid var(--edwyn-color-border-primary); box-shadow: var(--edwyn-glow-orange-sm); text-align: center;"
        >
          <h3
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.125rem; margin-bottom: 0.5rem;"
          >
            Lueur Orange Légère (SM)
          </h3>
          <span
            style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.8rem; color: var(--edwyn-color-text-muted);"
            >0 0 15px rgba(240, 130, 0, 0.3)</span
          >
        </div>

        <div
          style="background: var(--edwyn-color-muted); padding: 2rem; border-radius: 12px; border: 1px solid var(--edwyn-color-border-primary); box-shadow: var(--edwyn-glow-orange-md); text-align: center;"
        >
          <h3
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.125rem; margin-bottom: 0.5rem;"
          >
            Lueur Orange Moyenne (MD)
          </h3>
          <span
            style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.8rem; color: var(--edwyn-color-text-muted);"
            >0 0 30px rgba(240, 130, 0, 0.2)</span
          >
        </div>

        <div
          style="background: var(--edwyn-color-muted); padding: 2rem; border-radius: 12px; border: 1px solid var(--edwyn-color-border-primary); box-shadow: var(--edwyn-glow-orange-lg); text-align: center;"
        >
          <h3
            style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 1.125rem; margin-bottom: 0.5rem;"
          >
            Lueur Orange Étendue (LG)
          </h3>
          <span
            style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.8rem; color: var(--edwyn-color-text-muted);"
            >0 0 40px rgba(240, 130, 0, 0.1)</span
          >
        </div>
      </div>
    </div>
  `,
};

export const DualThemeShowcase: Story = {
  name: 'Dual Theme Showcase (Dark & Light)',
  render: () => html`
    <div
      style="font-family: var(--edwyn-font-body), sans-serif; padding: 1.5rem; max-width: 1080px;"
    >
      <h2
        style="font-family: var(--edwyn-font-heading), sans-serif; font-size: 2rem; margin-bottom: 0.5rem; color: var(--edwyn-color-primary);"
      >
        Architecture Dual Theme : Dark Slate & Light Mode
      </h2>
      <p style="color: var(--edwyn-color-text-muted); margin-bottom: 2rem;">
        Comparaison côte-à-côte des composants Edwyn sous les thèmes officiel Dark Slate (#292e30)
        et Light Mode (#f8fafc).
      </p>

      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 2rem;"
      >
        <!-- Colonne Dark Slate -->
        <div
          class="theme-dark"
          style="background: #292e30; color: #ffffff; padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);"
        >
          <div
            style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.75rem;"
          >
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🌑</span>
              <strong style="font-family: var(--edwyn-font-heading);"
                >Dark Slate (Production)</strong
              >
            </div>
            <span
              style="font-size: 0.75rem; background: rgba(255, 255, 255, 0.12); color: #ffffff; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; font-family: var(--edwyn-font-mono), monospace;"
              >#292e30</span
            >
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div
              style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(240, 130, 0, 0.2); border-radius: 12px; padding: 1.25rem;"
            >
              <h3
                style="font-family: var(--edwyn-font-heading); font-size: 1.125rem; margin: 0 0 0.5rem 0; color: #ffffff;"
              >
                Notre Modèle Transparent
              </h3>
              <p
                style="margin: 0 0 1rem 0; font-size: 0.875rem; color: rgba(255, 255, 255, 0.7); line-height: 1.5;"
              >
                Redistribution équitable et visibilité totale sur les indicateurs de performance.
              </p>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <edwyn-badge variant="primary" pill>Actif</edwyn-badge>
                <edwyn-badge variant="subtle" pill>100% Craft</edwyn-badge>
                <edwyn-badge variant="glass" pill>Lit 3.3</edwyn-badge>
              </div>
            </div>

            <edwyn-input
              label="Simulation TJM"
              placeholder="Ex: 650"
              value="580"
              helper-text="Tarif Journalier Moyen en euros"
            ></edwyn-input>

            <edwyn-slider label="Expérience" value="5" min="0" max="15" unit="ans"></edwyn-slider>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <edwyn-button variant="primary" size="sm">Action Principale</edwyn-button>
              <edwyn-button variant="secondary" size="sm">Secondaire</edwyn-button>
              <edwyn-button variant="outline" size="sm">Contour</edwyn-button>
            </div>
          </div>
        </div>

        <!-- Colonne Light Mode -->
        <div
          class="theme-light"
          style="background: #f8fafc; color: #0f172a; padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);"
        >
          <div
            style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0, 0, 0, 0.08); padding-bottom: 0.75rem;"
          >
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>☀️</span>
              <strong style="font-family: var(--edwyn-font-heading);">Light Mode (Nouveau)</strong>
            </div>
            <span
              style="font-size: 0.75rem; background: rgba(15, 23, 42, 0.08); color: #0f172a; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; font-family: var(--edwyn-font-mono), monospace;"
              >#f8fafc</span
            >
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div
              style="background: #ffffff; border: 1px solid rgba(240, 130, 0, 0.25); border-radius: 12px; padding: 1.25rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);"
            >
              <h3
                style="font-family: var(--edwyn-font-heading); font-size: 1.125rem; margin: 0 0 0.5rem 0; color: #0f172a;"
              >
                Notre Modèle Transparent
              </h3>
              <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #64748b; line-height: 1.5;">
                Redistribution équitable et visibilité totale sur les indicateurs de performance.
              </p>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <edwyn-badge variant="primary" pill>Actif</edwyn-badge>
                <edwyn-badge variant="subtle" pill>100% Craft</edwyn-badge>
                <edwyn-badge variant="glass" pill>Lit 3.3</edwyn-badge>
              </div>
            </div>

            <edwyn-input
              label="Simulation TJM"
              placeholder="Ex: 650"
              value="580"
              helper-text="Tarif Journalier Moyen en euros"
            ></edwyn-input>

            <edwyn-slider label="Expérience" value="5" min="0" max="15" unit="ans"></edwyn-slider>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <edwyn-button variant="primary" size="sm">Action Principale</edwyn-button>
              <edwyn-button variant="secondary" size="sm">Secondaire</edwyn-button>
              <edwyn-button variant="outline" size="sm">Contour</edwyn-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
