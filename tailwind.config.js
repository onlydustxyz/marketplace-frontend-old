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
  green: "#1FA67D",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: [
          "11px",
          {
            letterSpacing: "0.08em",
            lineHeight: "14px",
            uppercase: true,
          },
        ],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        ...customColor,
      },
      backgroundImage: {
        "button-primary": 'url("src/assets/img/button/primary.png")',
        "button-secondary": 'url("src/assets/img/button/secondary.png")',
        "profile-button": 'url("src/assets/img/profile-button.png")',
        "profile-menu": 'url("src/assets/img/profile-menu.png")',
      },
      boxShadow: {
        "button-primary": "0 0 30px 0 #dc2626",
        connected: "0px 0px 12px 3px rgba(0, 204, 155, 0.66)",
        "assigned-badge-1": "0px 1px 20px 5px rgba(53, 213, 150, 0.5)",
        "assigned-badge-2": "0px 1px 4px #04A575",
        "assigned-badge-3": "0px 1px 4px #008E53",
        "contribution-card-hover": "0px 20px 40px -10px #000000, 0px 20px 120px -40px rgba(174, 0, 255, 0.8)",
        "contribution-metadata": " 0px 14px 54px rgb(0, 0, 0)",
        "contribution-description": " 0px 25px 100px #00000",
        "dot-connected": "0px 0px 12px 3px #00FFE4",
        "dot-not-connected": "0px 0px 12px 3px #000CFF",
      },
      textShadow: {
        "button-primary": "0px 0px 2px #00FFE4, 0px 0px 3px #00FFE4",
      },
      opacity: {
        66: ".66",
        15: ".15",
        7: ".07",
        5: ".05",
        4: ".04",
      },
      fontFamily: {
        sans: [
          "GT Walsheim",
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
      gridTemplateAreas: {
        "header-desktop": ["menu menu logo menu-right profile"],
        "header-mobile": ["burger-button logo profile", "menu menu menu", "menu-right menu-right menu-right"],
      },
      gridTemplateColumns: {
        "header-desktop": "70px 1fr 60px 1fr 70px",
        "header-mobile": "1fr 40px 1fr",
      },
    },
  },
  variants: {
    textShadow: ["responsive", "hover", "focus", "disabled"],
    gridTemplateAreas: ["responsive"],
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-textshadow"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
};
