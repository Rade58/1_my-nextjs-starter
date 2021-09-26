const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        bledoliko: "crimson",
      },
      // OVERRIDING DEFAULT FONT FAMILY
      fontFamily: {
        sans: ['"InterVar"', ...defaultTheme.fontFamily.sans],
        serif: ['"Alegreya"', ...defaultTheme.fontFamily.serif],
        mono: ['"FiraMono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
