import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';

//Always load the 'App component' on every request.
//Nest the other components within the App component, and pass them (using dependency injection) into App.props.children, based on our routing.
//IndexPath describes what to use when there is just a root path - i.e. if someone just goes to "/", then load the HomePage
//Else if e.g. the path is "/about", then go to about page.
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CoursesPage}/>
    <Route path="about" component={AboutPage}/>
  </Route>
);
