/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/*.html.twig",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      backgroundColor: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        cream: "var(--cream-color)",
        rosered: "var(--rose-red-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
      },
      textColor: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        cream: "var(--cream-color)",
        rosered: "var(--rose-red-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
      },
      colors: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        cream: "var(--cream-color)",
        rosered: "var(--rose-red-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
      },
      borderColor: {
        cognac: "var(--cognac-border-color)",
        amber: "var(--amber-border-color)",
        darkblue: "var(--dark-blue-border-color)",
        cream: "var(--cream-border-color)",
        rosered: "var(--rose-red-border-color)",
        whitesmoke: "var(--white-smoke-border-color)",
        charcoal: "var(--charcoal-border-color)",
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      height: ["responsive"],
    },
  },
};
