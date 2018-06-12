//WebPack: bundles the app for the web

//Import webpack and path from npm packages
import webpack from 'webpack';
import path from 'path';

//Define an object literal
export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false, //false == Webpack will display a list of all the files that it is bundling
  entry: [ //entrypoint for application - inject some middleware
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index') //our own apps entrypoint
  ],
  target: 'web', //how to bundle the application (we're targeting the web)

  output: { //where webpack should create our bundle - it doesn't create actual files but holds them in memory
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: { //where our code is
    contentBase: path.resolve(__dirname, 'src')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), //allows us to replace modules without doing a full browser refresh
    new webpack.NoErrorsPlugin()              //keeps errors from breaking our hot-reloading experience
  ],


  module: { //tells webpack the types of files that we want it to handle
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},

      //These last 4 lines are recommended when using Boostrap
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
