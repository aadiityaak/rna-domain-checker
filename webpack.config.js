const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./assets/js/app.js", // Entry point untuk aplikasi React/JS
  output: {
    path: path.resolve(__dirname, "assets/js"), // Output JS bundlenya
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Aturan untuk file CSS
        use: [
          MiniCssExtractPlugin.loader, // Mengekstrak CSS ke file terpisah
          "css-loader", // Mengambil CSS sebagai string
          "postcss-loader", // Menjalankan PostCSS (untuk Tailwind dan Autoprefixer)
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/tailwind.css", // Nama file output CSS
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
