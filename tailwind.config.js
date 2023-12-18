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
      },
      textColor: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        cream: "var(--cream-color)",
        rosered: "var(--rose-red-color)",
      },
      colors: {
        cognac: "var(--cognac-color)",
        amber: "var(--amber-color)",
        darkblue: "var(--dark-blue-color)",
        cream: "var(--cream-color)",
        rosered: "var(--rose-red-color)",
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
