module.exports = {
  mode: "jit", // Aktifkan Just-in-Time compiler
  purge: [
    "./**/*.php", // File PHP di WordPress (termasuk template)
    "./assets/js/**/*.js", // File React/JavaScript di folder assets/js
    "./assets/css/**/*.css", // Jika ada file CSS tambahan
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
