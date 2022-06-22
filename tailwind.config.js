/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFF2F2',
        secondary: '#F47C7C',
      },
      width: {
        100: '25rem',
        150: '38rem',
        225: '56rem',
      },
    },
  },
  plugins: [],
};
