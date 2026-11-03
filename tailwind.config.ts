import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4F1EA',
        ink: '#1C1A16',
        deep: '#080F18',
        navy: '#0A1828',
        signal: '#88C4B9',
        stone: '#5A5448',
        field: '#E3E9E2',
      },
      fontFamily: {
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
