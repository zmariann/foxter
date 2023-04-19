/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "mainFont": ["Nunito", "sans-serif"],
      },
      colors: {
        greenFox: "#3CB878",
        darkFox: "#395444",
        darkGrey: "#395444",
        lightGray: "#B3B3B3",
        whiteFox: "#FCFCFC",
        white:"ffffff",
        registerLogoutBG: "#D9D9D9",
        borderGrey: "#f9fafb",
      },
    },
  },
  plugins: [],
};
