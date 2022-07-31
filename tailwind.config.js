/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-bg-primary)", //淺背景色
        secondary: "var(--color-primary)", //深文字色
        dark: "var(--color-secondary)", //內文文字
        light: "var(--color-bg-secondary)", // 其他淺背景色
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
