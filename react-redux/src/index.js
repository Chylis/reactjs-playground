//use babel-polyfill for certain features in ES6 that vanilla babel cannot transpile (e.g. object.assign)
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

//Webpack allows importing CSS too - it will bundle it for us.
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("app")
);

