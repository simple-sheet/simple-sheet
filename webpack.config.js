const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "development",
  entry: ["./example/src/index.js"],
  output: {
    path: path.resolve(__dirname, "example/dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    publicPath: process.env.NODE_ENV ? "/" : "https://www.nihaoshijie.com.cn/mypro/simple-sheet/",
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, "examples/src"),
    host: "0.0.0.0",
    port: 8001,
    historyApiFallback: true,
    
  },
  module: {
    rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /dist/,
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
      ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: ['*', '.js', '.tsx','.ts'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "example/src/index.html"),
    }),
  ],
};