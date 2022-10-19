const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ account, autoupload }) => ({
  entry: './js/main.js',
  output: {
    filename: './js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false } },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HubSpotAutoUploadPlugin({
      autoupload,
      account,
      src: 'dist',
      dest: 'my-project',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'images', to: 'images' },
        { from: 'templates', to: 'templates' },
        { from: 'css', to: 'css' },
      ]
    }),
  ],
});