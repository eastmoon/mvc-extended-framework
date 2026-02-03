// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'mvcef', // The name of your library (e.g., window.webpackNumbers)
      type: 'umd', // Universal Module Definition for compatibility
    },
    globalObject: 'this', // Ensures UMD works in various environments (browser, Node.js)
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve .ts and .js extensions
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // Enable variable name mangling
          compress: {
            drop_console: true, // Remove console.log statements in production
          },
          output: {
            comments: false, // Remove all comments
          },
        },
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'package.json'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'out-tsc', "app", "src"),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
  ],
};
