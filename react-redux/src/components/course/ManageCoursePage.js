import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseForm from './CourseForm';
import {saveCourse} from '../../actions/courseActions';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.initialCourse),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //Called when props has changed or when react believes that props may have changed, i.e. may run when props actually hasn't changed.
  componentWillReceiveProps(nextProps) {
    if (this.props.initialCourse.id != nextProps.initialCourse.id) {
      //Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.initialCourse)});
    }
  }

  updateCourseState(event) {
    let course = Object.assign({}, this.state.course);
    const field = event.target.name; //Each form-field has a name
    course[field] = event.target.value; //Update the course property with the corresponding form-field name
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/courses');
  }


  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  initialCourse: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


//Pull in the React Router context so router is available on 'this.context.router'
//Context is a global variable that library-authors use.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};



function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path '/course/:id' (see routes.js)
  let course = { id: "",  title: "", watchHref: "", authorId: "", length: "", category: ""};
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropDown = state.authors.map(author => ({value: author.id, text: `${author.firstName} ${author.lastName}`}));

  return {
    authors: authorsFormattedForDropDown,
    initialCourse: course
  };
}

function getCourseById(courses, courseId) {
  const course = courses.filter( course => course.id == courseId);
  if (course.length > 0) {
    return course[0];
  }
  return null;
}

function mapStateToDispatch(dispatch) {
  return {
    actions: {
      saveCourse: course => { dispatch(saveCourse(course));}
    }
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(ManageCoursePage);
