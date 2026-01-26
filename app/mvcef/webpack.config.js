// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
