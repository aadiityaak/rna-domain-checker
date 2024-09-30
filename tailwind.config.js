module.exports = {
  mode: "jit", // Aktifkan Just-In-Time mode
  purge: [
    "./**/*.php", // Scan semua file PHP
    "./assets/js/**/*.js", // Scan semua file JS
    "./assets/js/**/*.jsx", // Scan file JSX jika ada
    "./assets/css/tailwind.css", // Pastikan file CSS juga termasuk
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
