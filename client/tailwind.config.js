/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // main color yello
        "my-yellow": "#bdfd00",
        // the gray color for the text
        'txt': "#7d8085",
        "bg": {
          '100': "#191919",
          '200': "#212123",
          '300': "#28282a",
        },
      },
    },
  },
  plugins: [],
};
