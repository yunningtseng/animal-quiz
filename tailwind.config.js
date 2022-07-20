/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F8F0DF', //淺背景色
        secondary: '#A64B2A', //深文字色
        dark: '#766161', //內文文字
        light: '#F0EBE3', // 其他淺背景色
      },
      width: {
        22: '5.5rem', //88
        24: '6rem', // 96
        36: '9rem', // 144
        100: '25rem', //400
        112: '28rem', //450
        125: '31rem', // 500
        150: '38rem', //600
        225: '56rem', //900
      },
      fontFamily: {
        bpm1: ['BpmfGenSekiGothic-R'],
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
