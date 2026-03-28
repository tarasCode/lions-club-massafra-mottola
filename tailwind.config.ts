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
        "lions-navy": "#003366",
        "lions-gold": "#C8A951",
        "lions-light-gold": "#F5E6B8",
        "lions-white": "#FFFFFF",
        "lions-light-gray": "#F8F9FA",
        "lions-dark-text": "#1a1a2e",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "lions-gradient": "linear-gradient(135deg, #003366 0%, #C8A951 100%)",
      },
      boxShadow: {
        "lions": "0 10px 30px rgba(0, 51, 102, 0.15)",
        "lions-lg": "0 20px 40px rgba(0, 51, 102, 0.2)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
