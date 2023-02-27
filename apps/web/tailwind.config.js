const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, 'src/components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'src/pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(
      __dirname,
      '**/*.{js,ts,jsx,tsx,html}'
    ),
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
