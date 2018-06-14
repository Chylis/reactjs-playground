import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron"> {/* Jumbotron is a bootstrap CSS style that will make this div prominent*/}
        <h1>Mag Administration</h1>
        <p>React, Redux and React Router in ES6.</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

//Export the HomePage-component as default
//i.e. when someone else imports this file, they will say import HomePage from HomePage, and they
//will get a reference to the HomePage class
export default HomePage;
