const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  // ATURAN CSS KHUSUS UNTUK PRODUKSI ADA DI SINI
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    // CleanWebpackPlugin sudah tidak diperlukan karena ada 'output.clean: true'
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
});