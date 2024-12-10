/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        first: '#E75C01',
        second: '#F1861C',
        third: '#FCBE8D',
        fourth: '#DEBC8E',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 1s ease-out forwards',
      },
    },
    plugins: [],
  },
};
