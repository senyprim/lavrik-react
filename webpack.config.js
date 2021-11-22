const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // devServer: { contentBase: path.join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.module\.(css|scss)$/,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options:{

            }
          },
          {
            loader:"css-loader",
            options:{
              modules:{
                localIdentName: "[local]_[hash:base64:5]"
              },
              sourceMap:true
            },
          },
          
          "sass-loader",
        ],
      },
      {
        test: /(?<!\.module)\.(css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader:  MiniCssExtractPlugin.loader,
            options:{

            }
          },
          {
            loader:"css-loader",
            options:{
              modules:{
                localIdentName: "[local]_[hash:base64:5]"
              },
              sourceMap:true
            },
          },
          
        ],
      },

      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};
