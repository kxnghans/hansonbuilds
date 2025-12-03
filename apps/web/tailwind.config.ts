import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neumorph: {
          bg: "rgb(var(--bg-neumorph) / <alpha-value>)",
          text: "rgb(var(--text-main) / <alpha-value>)",
          accent: "rgb(var(--accent) / <alpha-value>)",
        },
      },
      boxShadow: {
        "neumorph-flat": 
          "9px 9px 16px rgb(var(--shadow-dark) / var(--opacity-dark)), -9px -9px 16px rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-pressed": 
          "inset 6px 6px 10px 0 rgb(var(--shadow-dark) / var(--opacity-dark)), inset -6px -6px 10px 0 rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-convex": 
          "6px 6px 10px 0 rgb(var(--shadow-dark) / var(--opacity-dark)), -6px -6px 10px 0 rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-concave": 
          "inset 5px 5px 10px rgb(var(--shadow-dark) / var(--opacity-dark)), inset -5px -5px 10px rgb(var(--shadow-light) / var(--opacity-light))",
      },
    },
  },
  plugins: [],
};
export default config;
