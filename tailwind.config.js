/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ultramarine: {
          50: '#EEF4FF',
          100: '#E0EBFF',
          200: '#C7D9FE',
          300: '#A4BFFD',
          400: '#6086FA',
          500: '#3B66F5',
          600: '#1D44E8',
          700: '#0038A8', // Vivid Ultramarine Blue
          800: '#002B7F',
          900: '#00205B', // Deep Classic Ultramarine Blue
          950: '#04112B', // Darkest Ultramarine Base
        },
        yellow: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626', // Pentecost Red
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        }
      },
    },
  },
  plugins: [],
};
