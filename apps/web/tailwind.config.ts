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
          "var(--neumorph-offset-base) var(--neumorph-offset-base) var(--neumorph-blur-base) rgb(var(--shadow-dark) / var(--opacity-dark)), calc(var(--neumorph-offset-base) * -1) calc(var(--neumorph-offset-base) * -1) var(--neumorph-blur-base) rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-pressed": 
          "inset var(--neumorph-offset-mid) var(--neumorph-offset-mid) var(--neumorph-blur-mid) 0 rgb(var(--shadow-dark) / var(--opacity-dark)), inset calc(var(--neumorph-offset-mid) * -1) calc(var(--neumorph-offset-mid) * -1) var(--neumorph-blur-mid) 0 rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-convex": 
          "var(--neumorph-offset-mid) var(--neumorph-offset-mid) var(--neumorph-blur-mid) 0 rgb(var(--shadow-dark) / var(--opacity-dark)), calc(var(--neumorph-offset-mid) * -1) calc(var(--neumorph-offset-mid) * -1) var(--neumorph-blur-mid) 0 rgb(var(--shadow-light) / var(--opacity-light))",
        "neumorph-concave": 
          "inset var(--neumorph-offset-sm) var(--neumorph-offset-sm) var(--neumorph-blur-mid) rgb(var(--shadow-dark) / var(--opacity-dark)), inset calc(var(--neumorph-offset-sm) * -1) calc(var(--neumorph-offset-sm) * -1) var(--neumorph-blur-mid) rgb(var(--shadow-light) / var(--opacity-light))",
      },
    },
  },
  plugins: [],
};
export default config;
