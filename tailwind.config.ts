import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        lateBlink: "lateBlink 1s infinite",
      },
      keyframes: {
        lateBlink: {
          "0%, 100%": { backgroundColor: "red" }, // red-600
          "50%": { backgroundColor: "#C53030" }, // red-700
        },
      },
      colors: {
        hurryGreen: "#70BF29",
        Sky: "#C3EBFA",
        SkyLight: "#EDF9FD",
        Purple: "#CFCEFF",
        PurpleLight: "#F1F0FF",
        Yellow: "#FAE27C",
        YellowLight: "#FEFCEB",
      },
    },
  },
  plugins: [],
};
export default config;
