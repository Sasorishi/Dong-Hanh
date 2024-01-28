/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/*.html.twig",
    "./templates/**/*.html.twig",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        darkblue_80: "var(--dark-blue-80-color)",
        cream: "var(--cream-color)",
        bordeau: "var(--bordeau-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
        forest: "var(--forest-color)",
      },
      textColor: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        darkblue_80: "var(--dark-blue-80-color)",
        cream: "var(--cream-color)",
        bordeau: "var(--bordeau-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
        forest: "var(--forest-color)",
      },
      colors: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        darkblue_80: "var(--dark-blue-80-color)",
        cream: "var(--cream-color)",
        bordeau: "var(--bordeau-color)",
        whitesmoke: "var(--white-smoke-color)",
        charcoal: "var(--charcoal-color)",
        forest: "var(--forest-color)",
      },
      borderColor: {
        cognac: "var(--cognac-border-color)",
        amber: "var(--amber-border-color)",
        darkblue: "var(--dark-blue-border-color)",
        darkblue_80: "var(--dark-blue-80-color)",
        cream: "var(--cream-border-color)",
        bordeau: "var(--rose-red-border-color)",
        whitesmoke: "var(--white-smoke-border-color)",
        charcoal: "var(--charcoal-border-color)",
        forest: "var(--forest-color)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  variants: {
    extend: {
      height: ["responsive"],
    },
  },
};
