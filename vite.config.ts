import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build' && !process.env.VITEST;

  return {
    optimizeDeps: {
      include: ['@storybook/web-components'],
    },
    plugins: [
      isBuild &&
        dts({
          include: ['src/**/*.ts'],
          exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts'],
        }),
    ].filter(Boolean),
    build: {
      lib: {
        entry: {
          index: resolve(import.meta.dirname, 'src/index.ts'),
          'tokens/index': resolve(import.meta.dirname, 'src/tokens/index.ts'),
        },
        formats: ['es'],
      },
      rollupOptions: {
        external: [/^lit/],
        output: {
          preserveModules: false,
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.names?.some((n) => n.endsWith('.css'))) return 'index.css';
            return '[name].[ext]';
          },
        },
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.ts'],
        exclude: ['src/**/*.stories.ts', 'src/**/*.d.ts', 'src/**/*.test.ts'],
      },
    },
  };
});
