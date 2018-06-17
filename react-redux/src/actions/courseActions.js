import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';


/* ACTION CREATORS */

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}
export function loadCoursesError(error) {
  return { type: types.LOAD_COURSES_ERROR, error: error };
}


/* ASYNC ACTIONS */

//returns: A thunk that accepts a dispatch object and returns a function that attempts to fetch the courses and generates an action event.
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then((courses) => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(loadCoursesError(error));
    });
  };
}
