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
          black: '#000000',          // Primary Background
          white: '#FFFFFF',          // Primary Text
          gold: '#c9a670',           // New gold color for headings and accents
          grayMedium: '#888888',     // Secondary Text
          grayDark: '#555555',       // Lighter separators
          charcoal: '#303032',       // Borders and Lines
          accent: '#9FDED5',         // Subtle teal-gray accent for highlights
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
            color: theme('colors.brand.white'), // Updated for dark mode
            h1: {
              color: theme('colors.brand.gold'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.brand.gold'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.brand.gold'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.brand.gold'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.brand.gold'),
              '&:hover': {
                color: theme('colors.brand.white'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.brand.charcoal'),
              color: theme('colors.brand.grayMedium'),
            },
            hr: { borderColor: theme('colors.brand.charcoal') },
            ol: {
              li: {
                '&:before': { color: theme('colors.brand.gold') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.brand.gold') },
              },
            },
            code: { color: theme('colors.brand.gold') },
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
