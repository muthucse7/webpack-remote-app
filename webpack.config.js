const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: './index.js', // Assuming index.js is located in the root directory
  output: {
    publicPath: 'http://localhost:3000/', // The public URL of the output directory
    filename: '[name].js', // Output filename, [name] will be replaced by the entry name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  devServer: {
    port: 3000, // Port number
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Assuming index.html is located in the root directory
    }),
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './remoteApp': './index.js', // Expose your entry module
      },
    }),
  ],
};
