const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        slightG: {
          50: '#F9FBFA',
          100: '#F6F9F8',
          200: '#EDF3F1',
          300: '#E4ECEA',
          400: '#DBE6E3',
          500: '#D0DFDB',
          600: '#9EBDB5',
          700: '#6A9A8D',
          800: '#46675E',
          900: '#23342F',
        },
        green: {
          50: '#DEF8F1',
          100: '#C0F1E4',
          200: '#7EE2C7',
          300: '#3FD5AD',
          400: '#239F7E',
          500: '#155F4B',
          600: '#114B3C',
          700: '#0D3A2E',
          800: '#08261E',
          900: '#051511',
        },
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        dark: '#222222',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
