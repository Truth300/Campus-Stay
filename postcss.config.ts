import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import type { Plugin } from 'postcss';

const config: { plugins: Plugin[] } = {
  plugins: [
    tailwindcss() as Plugin,  // Ensure tailwindcss is treated as a Plugin
    autoprefixer(),           // autoprefixer is already correctly typed
  ],
};

export default config;
