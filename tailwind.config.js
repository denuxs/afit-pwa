/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
import PrimeUI from "tailwindcss-primeui";

module.exports = {
  content: ["./src/**/*.{html,ts, scss}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
