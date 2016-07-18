//
//
//

var path = require('path');
var webpack = require('webpack');

/* Shortcut target paths */
var srcPath = path.join(__dirname, 'script/library');
var outputPath = path.join(__dirname, '../Release/script/deploy');

/* Define environment variables see: https://github.com/petehunt/webpack-howto#6-feature-flags */
var featureFlagsPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  __RELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_RELEASE || 'false'))
});


/* Configure webpack export */
module.exports = {

  // entry: {
  //   bundle: path.join(srcPath, 'main.react.js'),
  // },

  entry: {
    bundle: path.join(srcPath, 'index.js'),
    common: ['react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-batched-actions', 'redux-thunk'],
  },


  output: {
    path: outputPath,
    publicPath: '/script/deploy/',
    chunkFilename: '[id].application.bundle.js',
    filename: '[name].js',
    sourceMapFilename: '[file].map'
  },


  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2', 'react'],
        }
      }
    ]
  },


  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'script/library'],
  },


  plugins: [
    featureFlagsPlugin,

    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'), //Smaller with 'production' than '"production"'
      }
    }),

    new webpack.optimize.CommonsChunkPlugin('common.js'),
    
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // Suppress the output from uglify during build
      },
      minimize: true
    }),
  ],


  // debug: true,
  //
  // devtool: If ommitted doesn't generate source maps
  // devtool: 'eval-cheap-module-source-map', // This embeds the source map file into the bundle (makes file massive!)
  // devtool: 'source-map', //This creates separate source map file
  //
  // TODO: See if we can turn off source-maps altogether so that no map files are generated in the output folder
  //
};


// Output filesize considerations:
// 'SET NODE_ENV=production' required for windows...doesn't look like it makes a difference!
//  "webpack:bundle": "SET NODE_ENV=production&&webpack -p"
//  "webpack:bundle": "webpack -p" //'-p' doesn't seem to make a difference!
// TODO:
// Check out 'https://github.com/petehunt/webpack-howto#user-content-6-feature-flags'
