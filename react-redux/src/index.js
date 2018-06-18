//use babel-polyfill for certain features in ES6 that vanilla babel cannot transpile (e.g. object.assign)
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import {loadCourses} from "./actions/courseActions";
import {loadAuthors} from "./actions/authorActions";

//Webpack allows importing CSS too - it will bundle it for us.
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Import Redux and React-Redux stuff
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';




//We're not passing a initialState param to the call to configureStore - meaning that all the reducers default state parameters will be used instead.
//However, it is possible to load previously stored state from e.g. the network/db and pass it as the initialState param.
const store = configureStore();

//Dispatch some actions
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  //Provider attaches our store to our container components, making it possible to access the store from them.
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
