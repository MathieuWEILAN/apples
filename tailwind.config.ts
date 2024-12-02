import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        luckiest: ['"Luckiest Guy"', "cursive"], // Luckiest Guy
      },
      dropShadow: {
        white: "0 0 4px rgba(255, 255, 255, 1)", // Shadow blanc intense
      },
    },
  },
  plugins: [],
} satisfies Config;
