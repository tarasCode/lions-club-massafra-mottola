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
        "lions-navy": "#00338D",
        "lions-dark-navy": "#002244",
        "lions-gold": "#EBB700",
        "lions-light-gold": "#FFF3CC",
        "lions-white": "#FFFFFF",
        "lions-light-gray": "#F5F5F5",
        "lions-dark-text": "#1a1a2e",
        "lions-gray": "#766A62",
        "lions-purple": "#622567",
        "lions-light-blue": "#407CCA",
        "lions-green": "#00AB68",
        "lions-orange": "#CA7700",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "lions-gradient": "linear-gradient(135deg, #00338D 0%, #EBB700 100%)",
        "lions-hero": "linear-gradient(135deg, #002244 0%, #00338D 50%, #002244 100%)",
      },
      boxShadow: {
        "lions": "0 10px 30px rgba(0, 51, 141, 0.15)",
        "lions-lg": "0 20px 40px rgba(0, 51, 141, 0.2)",
        "lions-glow": "0 0 24px rgba(235, 183, 0, 0.2)",
        "lions-float": "0 12px 32px rgba(235, 183, 0, 0.25)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in-up": "scaleInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scroll-arrow": "scrollArrow 2.5s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleInUp: {
          from: { opacity: "0", transform: "scale(0.95) translateY(12px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        scrollArrow: {
          "0%, 100%": { opacity: "0.6", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(8px)" },
        },
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
        "ease-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        "ease-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
