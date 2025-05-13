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
    },
  },
  plugins: [],
};
