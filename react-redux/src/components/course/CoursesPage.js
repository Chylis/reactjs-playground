import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from "./CourseList";
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push("/course");
  }

  render() {
    //Destructure out courses from props using pattern-matching
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired
};


//param state: contains the entire state contained within our redux store
//param ownProps: props that are being attached to the component, e.g. injected props from React Router
//returns an object containing a slice of the state, i.e. properties from state which will be accessible in our component's props object.
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses //the state property 'courses' comes from the root-reducer object
  };
}

const initialisedConnectFunction = connect(mapStateToProps);
const connectedComponent = initialisedConnectFunction(CoursesPage);
export default connectedComponent;
