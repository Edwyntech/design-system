import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.stories.ts', '**/*.test.ts'],
  litelement: true,
  plugins: [
    customElementJetBrainsPlugin({
      outdir: '.',
      webTypesFileName: 'web-types.json',
      packageJson: false,
    }),
  ],
};
