import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

const port = 3000;

//Create an instance of express
const app = express();

//Pass webpack our config file and save the compiled config file in 'compiler'
const compiler = webpack(config);

//Pass our compiled Webpack configuration to express
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, //don't want information on command line as it runs
  publicPath: config.output.publicPath
}));

//Tell express that we want to use webpacks hot middleware
app.use(require('webpack-hot-middleware')(compiler));

//Any requests that express receives will return index.html
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

//Start server
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    //Open the browser using the 'open' package that we installed via npm
    open(`http://localhost:${port}`);
  }
});
