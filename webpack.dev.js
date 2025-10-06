const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: false, // Set 'warnings' ke false agar tidak terganggu warning Workbox
      },
    },
    watchFiles: ['src/**/*'], // Otomatis reload jika ada perubahan di folder src
  },
  // ATURAN CSS KHUSUS UNTUK DEVELOPMENT ADA DI SINI
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
});