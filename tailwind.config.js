/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F8F0DF', //navbar and footer bg
        secondary: '#A64B2A', //navbar and footer text
        light: '#F0EBE3',
        dark: '#808080',
        text: '#845460', //detail 大標題文字顏色
        'text-light': '#766161', //detail 小項目內文顏色
        'text-dark': '#B67171', //detail 小項目標題文字顏色
      },
      width: {
        100: '25rem', //400
        112: '28rem', //450
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
