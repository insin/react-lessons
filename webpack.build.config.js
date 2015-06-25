'use strict'

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index',
    vendor: [
      'babel-core/browser',
      'base-64',
      'boxxy',
      'classnames',
      'codemirror',
      'codemirror/mode/javascript/javascript',
      'codemirror/mode/markdown/markdown',
      'marked',
      'react',
      'react-router',
      'react-codemirror',
      'redux'
    ]
  },
  node: {
    buffer: false,
    global: false,
    process: false
  },
  output: {
    path: 'public',
    filename: 'app.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'deps.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')}
    ]
  }
}
