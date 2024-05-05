const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file name
    clean: true // Clean the output directory before each build
  },
  module: {
    rules: [
      // JavaScript/JSX files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' // Use Babel for JavaScript/JSX files
      },
      // CSS files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // SASS/SCSS files
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      // Image files
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML template file
      filename: 'index.html' // Output HTML file name
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Output CSS file name
      chunkFilename: '[id].[contenthash].css'
    })
  ],
  devServer: {
    contentBase: './dist', // Serve files from the 'dist' directory
    port: 3000 // Port number for development server
  },
  resolve: {
    fallback: {
      "os": false,
      "path": false,
      "crypto": false
    }
  },
};
