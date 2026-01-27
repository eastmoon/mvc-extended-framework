// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
    new HtmlWebpackPlugin({
        template: './src/index.html',
    })
  ],
  devServer: {
    watchFiles: ['src/**/*.js', 'src/**/*.html'],
    compress: true, // Enable gzip compression
    port: 3000, // Use port 3000
    open: true, // Open the browser automatically when the server starts
    hot: true, // Enable Hot Module Replacement
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
  },
};
