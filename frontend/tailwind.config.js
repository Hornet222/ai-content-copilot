/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#D81B60', // Primary Accent
          pinkDark: '#C2185B', // Hover/active
          charcoal: '#1A1A1A', // Neutral Dark
          white: '#FFFFFF', // Neutral Light
          grayLight: '#F5F5F5', // Neutral Gray (light)
          grayMedium: '#6E6E6E', // Neutral Gray (medium)
          grayBorder: '#E0E0E0', // Subtle borders
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        md: '6px', // Slightly more rounded for cards, etc.
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.charcoal'),
            h1: {
              color: theme('colors.brand.charcoal'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.brand.charcoal'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.brand.charcoal'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.brand.charcoal'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.brand.pink'),
              '&:hover': {
                color: theme('colors.brand.pinkDark'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.brand.pink'),
              color: theme('colors.brand.grayMedium'),
            },
            hr: { borderColor: theme('colors.brand.grayBorder') },
            ol: {
              li: {
                '&:before': { color: theme('colors.brand.pink') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.brand.pink') },
              },
            },
            code: { color: theme('colors.brand.pink') },
            pre: {
              backgroundColor: theme('colors.brand.charcoal'),
              color: theme('colors.brand.white'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
