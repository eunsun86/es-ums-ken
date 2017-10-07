const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html'
});

const config = {
  entry: [
    './src/js/userCollectionModel.js',
    './src/js/View.js',
    './src/js/ListView.js',
    './src/js/CurrentUserListView.js',
    './src/js/UserFormView.js',
    './src/js/UpdateUserFormView.js',
    './src/js/index.js',
    './src/style.less'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
};

module.exports = config;
