const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./assets/js/app.js", // Path ke file entry point JS
  output: {
    path: path.resolve(__dirname, "assets/js"), // Path output JS
    filename: "bundle.js", // Output file untuk JS
  },
  mode: "development", // Set ke development mode untuk debugging
  watch: true, // Aktifkan watch mode
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Menangani file JS dan JSX
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Menangani file CSS
        use: [
          MiniCssExtractPlugin.loader, // Ekstrak CSS ke file terpisah
          "css-loader", // Ambil CSS sebagai string
          "postcss-loader", // Jalankan PostCSS untuk Tailwind
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/bundle.css", // Output CSS ke bundle.css
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // Resolusi untuk ekstensi JS dan JSX
  },
};
