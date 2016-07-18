//
//
//
// Please see webpack.config.output.js for output / deployment configuration
//
//
//

var path = require('path');
var webpack = require('webpack');

/* Shortcut target paths */
var srcPath = path.join(__dirname, 'script/library');
var outputPath = path.join(__dirname, 'script/deploy');

/* Define environment variables see: https://github.com/petehunt/webpack-howto#6-feature-flags */
var featureFlagsPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  __RELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_RELEASE || 'false'))
});


/* Configure webpack export */
module.exports = {
  entry: {
    bundle: path.join(srcPath, 'index.js'),
    common: ['react', 'react-dom', 'react-redux', 'redux', 'redux-batched-actions', 'redux-thunk'],
  },

  output: {
    path: outputPath,
    publicPath: '/script/deploy/',
    chunkFilename: '[id].application.bundle.js',
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, /* /(node_modules|bower_components)/ */
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2', 'react'],
        },
      },
    ],
  },

  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'script/library'],
  },

  plugins: [
    featureFlagsPlugin,
    new webpack.optimize.CommonsChunkPlugin('common.js'),
  ],

  devtool: 'eval-cheap-module-source-map',
};


// Output filesize considerations:
// 'SET NODE_ENV=production' required for windows...doesn't look like it makes a difference!
//  "webpack:bundle": "SET NODE_ENV=production&&webpack -p"
//  "webpack:bundle": "webpack -p" //'-p' doesn't seem to make a difference!
