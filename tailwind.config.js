/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: '#FFF2F2',
        primary: '#FFEBC1',
        // secondary: '#F47C7C',
        secondary: '#A64B2A',
        third: '#BF9270',
        light: '#F3E9DD',
      },
      width: {
        100: '25rem',
        125: '31rem',
        150: '38rem',
        225: '56rem',
      },
      fontFamily: {
        bpm: ['BpmfGenSenRounded-R'],
      },
    },
  },
  plugins: [],
};
