import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "var(--gold)",
        ink: "var(--ink)",
      },
      fontFamily: {
        sans: "var(--font-inter), 'Inter', system-ui, sans-serif",
        serif: "var(--font-playfair), 'Playfair Display', serif",
      },
      boxShadow: {
        glow: "0 0 60px rgba(189, 159, 87, 0.25)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(circle at center, rgba(189, 159, 87, 0.35), transparent 70%)",
      },
    },
  },
}

export default config
