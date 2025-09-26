import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
    },
  },

  plugins: [typography],
};

export default config;
