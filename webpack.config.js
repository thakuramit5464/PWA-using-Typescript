const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },

      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: ["/node_modules"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "manifest.json", to: "manifest.json" },
        { from: "sw-src.js", to: "sw.js" },
        { from: "./assets", to: "./assets" },
        { from: "./index.css", to: "./index.css" },
        // Add other files (like icons) if needed
      ],
    }),
  ],
};
