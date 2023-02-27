/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.cyan,
        secondary: colors.gray,
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
