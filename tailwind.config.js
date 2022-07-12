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
  gold: "#E3CD8F",
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
      backgroundImage: {
        "button-primary": 'url("src/assets/img/button/primary.png")',
        "button-primary-hover": 'url("src/assets/img/button/primary-hover.png")',
        "button-secondary-hover": 'url("src/assets/img/button/secondary-hover.png")',
      },
      boxShadow: {
        "button-primary": "0 0 30px 0 #dc2626",
        connected: "0px 0px 12px 3px rgba(0, 204, 155, 0.66)",
        "assigned-badge-1": "0px 1px 20px 5px rgba(0, 71, 255, 0.5)",
        "assigned-badge-2": "0px 1px 4px #00089C",
        "assigned-badge-3": "0px 1px 4px #0033B6",
        "contribution-card-hover": "0px 20px 40px -10px #000000, 0px 20px 120px -40px rgba(174, 0, 255, 0.8)",
      },
      textShadow: {
        "button-primary": "0px 0px 2px #00FFE4, 0px 0px 3px #00FFE4",
      },
      fontFamily: {
        sans: [
          "GT Walsheim Pro",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        alfreda: ["Alfreda"],
      },
      zIndex: {
        m1: "-1",
        m2: "-2",
      },
    },
  },
  variants: {
    textShadow: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [require("tailwindcss-textshadow")],
};
