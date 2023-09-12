import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

const isDevelopment = process.env.NODE_ENV !== "production";

export default {
  mode: isDevelopment ? "development" : "production",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: isDevelopment
          ? ["style-loader", "css-loader"]
          : [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve("dist"),
    },
    compress: !isDevelopment,
    port: 9000,
    hot: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true,
    }),
    isDevelopment
      ? null
      : new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
        }),
  ],
  watchOptions: {
    poll: false,
    ignored: /node_modules/,
  },
  optimization: {
    concatenateModules: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: false,
    moduleIds: "deterministic",
    removeAvailableModules: true,
    usedExports: false,
  },
};
