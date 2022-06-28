/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F8F0DF',
        secondary: '#A64B2A',
        third: '#BF9270',
        light: '#F3E9DD',
        text: '#845460',
        'text-light': '#766161',
        'text-dark': '#B67171',
      },
      width: {
        100: '25rem', //400
        125: '31rem', // 500
        150: '38rem', //600
        225: '56rem', //900
      },
      fontFamily: {
        bpm: ['BpmfGenSenRounded-R'],
      },
      screens: {
        xs: '360px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
