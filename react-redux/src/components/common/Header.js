import React, {Proptypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      {/* activeClassName == when this link is active (based on the current route): apply the active CSS style */}
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"  |  "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {"  |  "}
      <Link to="/about" activeClassName="active">About</Link>
    </nav>
  );
};

export default Header;
