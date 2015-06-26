'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'react-hot!babel', include: path.join(__dirname, 'src')},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'style!css!autoprefixer'}
    ]
  }
}
