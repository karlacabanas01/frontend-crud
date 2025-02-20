/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#5DBB63", // Verde medio
        // secondary: "#A4D65E", // Verde claro
        // background: "#F7F9FC", // Gris muy claro
        // surface: "#EAEFF1", // Gris claro
        // textPrimary: "#333333", // Gris oscuro
        // textSecondary: "#7A7A7A", // Gris medio
        // error: "#FF4B5C",
        primary: "#E195AB", // Rosa claro
        secondary: "#FFCCE1", // Rosa más oscuro
        background: "#F2F9FF", // Azul muy claro
        surface: "#FFF5D7", // Color crema
        textPrimary: "#FFFFFF", // Gris oscuro
        textSecondary: "#7A7A7A", // Gris medio
        error: "#FF4B5C",
      },
    },
  },
  plugins: [],
};
