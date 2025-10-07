const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',

  // --- TAMBAHAN PENTING UNTUK DEPLOYMENT ---
  // Menentukan base path untuk semua aset saat di-build untuk produksi.
  output: {
    publicPath: '/STORYMAP-APP/', // <-- ❗ GANTI DENGAN NAMA REPO ANDA
  },
  
  // Aturan CSS khusus untuk produksi (membuat file CSS terpisah)
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
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
});