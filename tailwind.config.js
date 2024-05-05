/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'Gilroy' : 'Gilroy, Helvetica, sans-serif',
      'Corben' : 'Corben, Helvetica, sans-serif'
    },
    extend: {
      colors: {
        lightBlue: '#BFE5FF',
        darkBlue: '#0954B0',
        customYellow: "#FFD22F"
      },
    },
  },
  plugins: [],
};
