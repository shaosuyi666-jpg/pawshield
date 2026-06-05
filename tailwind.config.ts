import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#203135",
        spruce: "#1f6f5b",
        mint: "#dff5ec",
        skywash: "#e7f2f7",
        peach: "#ffe2d1",
        butter: "#fff1bf"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(32, 49, 53, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
