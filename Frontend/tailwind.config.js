/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flexBasis: {
        "19/40": "47.5%",
        "1/20" : "5%",
      },
    },
  },
  plugins: [],
};
