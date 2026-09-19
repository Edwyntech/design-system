import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './edwyn-icon';
import type { EdwynIconName } from './edwyn-icon';

const meta: Meta = {
  title: 'Components/Actions/Icon',
  component: 'edwyn-icon',
  parameters: {
    docs: {
      description: {
        component:
          'Icône vectorielle SVG optimisée pour l’écosystème Edwyn, configurable en taille et héritant dynamiquement de la couleur de texte courante (`currentColor`).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default',
  args: {
    name: 'rocket',
    size: 24,
  },
  render: (args) => html`
    <div style="color: var(--edwyn-color-primary, #f08200);">
      <edwyn-icon name="${args.name}" .size="${args.size}"></edwyn-icon>
    </div>
  `,
};

export const OfficialIconsGallery: Story = {
  name: 'Official Icons Gallery',
  render: () => {
    const icons: EdwynIconName[] = [
      'rocket',
      'users',
      'check',
      'arrow-right',
      'chevron-down',
      'menu',
      'close',
      'logo',
      'sparkles',
    ];

    return html`
      <div
        style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1.5rem; color: #fff;"
      >
        ${icons.map(
          (icon) => html`
            <div
              style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 1.5rem; background: var(--edwyn-color-card); border-radius: 12px; border: 1px solid var(--edwyn-color-border);"
            >
              <edwyn-icon
                name="${icon}"
                .size="${32}"
                style="color: var(--edwyn-color-primary);"
              ></edwyn-icon>
              <span
                style="font-family: var(--edwyn-font-mono), monospace; font-size: 0.75rem; color: var(--edwyn-color-text-muted);"
                >${icon}</span
              >
            </div>
          `
        )}
      </div>
    `;
  },
};
