import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx,js,jsx}"],

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },

  plugins: [typography],
};

export default config;
