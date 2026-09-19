import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Edwyn Hero Organism Component (`<edwyn-hero>`)
 *
 * Replicates the hero banner from the official Edwyn Tech website (https://www.edwyn.tech).
 * Features:
 * - Full viewport height (`min-h-screen`) responsive flex layout
 * - Team life photo background with official attenuation matching https://www.edwyn.tech (rgba(0, 0, 0, 0.65) veil)
 * - Large central duotone logo with entrance animation
 * - Typographic heading with customizable highlight in signature orange
 * - Smooth scroll-down bouncing chevron indicator
 * - Support for slotting badges and action buttons
 * - Dual-theme support (Dark Slate / Light Mode)
 *
 * @summary Edwyn Hero banner organism component
 * @tag edwyn-hero
 * @csspart hero-section - Main section container
 * @csspart hero-bg - Background media wrapper
 * @csspart hero-bg-image - Team background image
 * @csspart hero-bg-overlay - Dark atmospheric veil overlay
 * @csspart hero-bg-gradient - Radial gradient overlay
 * @csspart hero-center - Center logo container
 * @csspart center-logo - Center duotone logo image
 * @csspart hero-bottom - Bottom content container
 * @csspart headline - Main heading title
 * @csspart highlight - Orange highlight span
 * @csspart subtitle - Introductory paragraph
 * @csspart scroll-indicator - Bouncing chevron scroll guide
 */
@customElement('edwyn-hero')
export class EdwynHero extends LitElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      box-sizing: border-box;
    }

    /* Background media & atmospheric layers matching https://www.edwyn.tech */
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }

    .hero-bg-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: var(--edwyn-hero-image-filter, none);
    }

    /* Atmospheric dark veil matching public site style="background-color:rgba(0,0,0,0.65)" */
    .hero-bg-overlay {
      position: absolute;
      inset: 0;
      background-color: var(--edwyn-color-hero-overlay, rgba(0, 0, 0, 0.65));
      backdrop-filter: var(--edwyn-hero-overlay-backdrop-filter, none);
      -webkit-backdrop-filter: var(--edwyn-hero-overlay-backdrop-filter, none);
    }

    /* Gradient overlay: aligned with public site where radial gradient is not active */
    .hero-bg-gradient {
      position: absolute;
      inset: 0;
      background-image: var(--edwyn-hero-gradient, none);
      opacity: var(--edwyn-hero-gradient-opacity, 0.8);
      pointer-events: none;
    }

    /* Bottom fade transition into subsequent sections (when attenuated is false) */
    .hero-bottom-fade {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 160px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        color-mix(in srgb, var(--edwyn-color-bg, #292e30) 40%, transparent) 50%,
        var(--edwyn-color-bg, #292e30) 100%
      );
      pointer-events: none;
    }

    /* Center Duotone Logo Area */
    .hero-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
      padding: var(--edwyn-space-8, 2rem) var(--edwyn-space-4, 1rem) 0 var(--edwyn-space-4, 1rem);
      box-sizing: border-box;
    }

    .center-logo {
      width: 100%;
      max-width: 896px; /* max-w-4xl */
      height: auto;
      animation: fadeInZoom 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
      filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5));
    }

    @keyframes fadeInZoom {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Bottom Text Area */
    .hero-bottom {
      position: relative;
      z-index: 10;
      text-align: center;
      padding-left: var(--edwyn-space-4, 1rem);
      padding-right: var(--edwyn-space-4, 1rem);
      padding-bottom: 11rem; /* pb-44 mobile */
      box-sizing: border-box;
      animation: fadeInSlideUp 700ms cubic-bezier(0.16, 1, 0.3, 1) 150ms forwards;
      opacity: 0;
    }

    @media (min-width: 768px) {
      .hero-bottom {
        padding-bottom: 8rem; /* md:pb-32 */
      }
    }

    @keyframes fadeInSlideUp {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .headline {
      font-family: var(--edwyn-font-heading, 'Syne', sans-serif);
      font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem); /* text-5xl md:text-7xl */
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.025em; /* tracking-tight */
      color: var(--edwyn-color-text, #ffffff);
      margin: 0 0 var(--edwyn-space-4, 1rem) 0;
    }

    .highlight {
      color: var(--edwyn-color-primary, #f08200);
      display: inline;
    }

    .subtitle {
      font-family: var(--edwyn-font-body), 'Inter', sans-serif;
      font-size: clamp(1.125rem, 2vw, 1.5rem); /* text-xl md:text-2xl */
      line-height: 1.5;
      color: var(--edwyn-color-text-muted, rgba(255, 255, 255, 0.7));
      max-width: 42rem; /* max-w-2xl */
      margin: 0 auto var(--edwyn-space-6, 1.5rem) auto;
    }

    .hero-actions {
      display: flex;
      justify-content: center;
      gap: var(--edwyn-space-4, 1rem);
      margin-bottom: var(--edwyn-space-6, 1.5rem);
      flex-wrap: wrap;
    }

    /* Bouncing Scroll Indicator */
    .scroll-indicator {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.6;
      animation: bounce 1.5s infinite ease-in-out;
      cursor: pointer;
      color: var(--edwyn-color-text, #ffffff);
      text-decoration: none;
      margin-top: var(--edwyn-space-4, 1rem);
    }

    .scroll-indicator:hover {
      opacity: 1;
    }

    .scroll-chevron {
      width: 28px;
      height: 28px;
    }

    @keyframes bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(8px);
      }
    }
  `;

  /**
   * Main title text before or without highlight.
   */
  @property({ type: String })
  title = "L'ESN";

  /**
   * Highlighted keyword rendered in signature orange.
   */
  @property({ type: String })
  highlight = 'Alternative';

  /**
   * Subtitle description text.
   */
  @property({ type: String })
  subtitle =
    "Une approche centrée sur l'humain, la transparence, l'expertise technique et la redistribution.";

  /**
   * Background image url.
   */
  @property({ type: String, attribute: 'background-image' })
  backgroundImage = '/images/hero-team.webp';

  /**
   * Center duotone logo url.
   */
  @property({ type: String, attribute: 'logo-src' })
  logoSrc = '/images/logo-duotone.webp';

  /**
   * Whether to attenuate the background image with dark overlay.
   * Defaults to true, matching the public production site https://www.edwyn.tech (rgba(0, 0, 0, 0.65)).
   */
  @property({ type: Boolean, reflect: true })
  attenuated = true;

  /**
   * Whether to display the bouncing scroll indicator chevron.
   */
  @property({ type: Boolean, attribute: 'show-scroll-indicator' })
  showScrollIndicator = true;

  override render() {
    return html`
      <section class="hero-section" part="hero-section">
        <!-- Background Imagery & Shaders -->
        <div class="hero-bg" part="hero-bg">
          ${
            this.backgroundImage
              ? html`<img
                  class="hero-bg-image"
                  part="hero-bg-image"
                  src="${this.backgroundImage}"
                  alt="Equipe Edwyn"
                  loading="eager"
                />`
              : ''
          }
          ${
            this.attenuated
              ? html`
                  <div class="hero-bg-overlay" part="hero-bg-overlay"></div>
                  <div class="hero-bg-gradient" part="hero-bg-gradient"></div>
                `
              : html`<div class="hero-bottom-fade" part="hero-bottom-fade"></div>`
          }
        </div>

        <!-- Center Duotone Logo Visual -->
        <div class="hero-center" part="hero-center">
          ${
            this.logoSrc
              ? html`<img
                  class="center-logo"
                  part="center-logo"
                  src="${this.logoSrc}"
                  alt="Edwyn - Cabinet de Conseil Tech"
                />`
              : ''
          }
        </div>

        <!-- Bottom Typographic Content & Controls -->
        <div class="hero-bottom" part="hero-bottom">
          <slot name="badge"></slot>

          <h1 class="headline" part="headline">
            ${this.title}
            ${
              this.highlight
                ? html`<span class="highlight" part="highlight">${this.highlight}</span>`
                : ''
            }
          </h1>

          <p class="subtitle" part="subtitle">${this.subtitle}</p>

          <div class="hero-actions" part="hero-actions">
            <slot name="actions"></slot>
          </div>

          ${
            this.showScrollIndicator
              ? html`
                  <div
                    class="scroll-indicator"
                    part="scroll-indicator"
                    role="button"
                    aria-label="Faire défiler vers le bas"
                    @click="${this.#scrollToContent}"
                  >
                    <svg
                      class="scroll-chevron"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                `
              : ''
          }
        </div>
      </section>
    `;
  }

  #scrollToContent() {
    window.scrollBy({
      top: window.innerHeight - 80,
      behavior: 'smooth',
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edwyn-hero': EdwynHero;
  }
}
