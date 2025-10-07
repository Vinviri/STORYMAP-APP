const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true, // Ini menggantikan CleanWebpackPlugin
  },
  module: {
    rules: [
      // ATURAN UNTUK JAVASCRIPT (BABEL) KITA PINDAHKAN KE SINI
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      // ATURAN UNTUK GAMBAR
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // ATURAN CSS DIHAPUS DARI SINI
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'docs/'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/sw.js'),
      swDest: 'sw.js',
    }),
  ],
};