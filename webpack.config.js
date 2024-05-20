const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    publicPath: "http://localhost:3000/",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "remoteApp",
      library: { type: "var", name: "remoteApp" },
      filename: "remoteEntry.js",
      exposes: {
        "./remoteApp": "./App.js", // Expose your entry module
      },
      remotes: {
        // Define remote modules that the host application will consume
        remoteApp: "remoteApp@http://localhost:3000/remoteEntry.js",
      },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
