// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

const customColor = {
  "space-dark-blue": "#0D0814",
  "space-blue": "#0E0D2E",
  "space-blue-disabled": "#AABCD2",
  "mid-blue": "#0009BC",
  "light-blue": "#00FFE4",
  "off-white": "#E3DAD4",
  "light-purple": "#EBDDFF",
  orange: "#FF9000",
  "space-purple": "#AE00FF",
  black: "#000000",
  nickel: "#666666",
  snow: "#F4F4F4",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        ...customColor,
      },
    },
  },
  plugins: [],
};
