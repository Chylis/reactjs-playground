import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {title: ""}
    };

    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChanged(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave(event) {
    //Fire a 'CREATE_COURSE' action containing this.state.course
    this.props.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChanged}
          value={this.state.course.title} />

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  createCourse: PropTypes.func.isRequired,
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

//param dispatch: redux dispatch function, passed in by the connect function
//returns an object containing action-dispatching functions that will be accessible in the props object
function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => {
      const action = courseActions.createCourse(course);
      dispatch(action);
    }
  };
}

const initialisedConnectFunction = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = initialisedConnectFunction(CoursesPage);
export default connectedComponent;
