import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';


/* ACTION CREATORS */

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}
export function loadCoursesError(error) {
  return { type: types.LOAD_COURSES_ERROR, error: error };
}

export function createCourseSuccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, course: courses };
}

export function updateCourseSuccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: courses };
}



/* THUNK ACTION CREATORS */

//returns: A thunk that accepts a dispatch object and a 'getState' object, letting the thunk read the current state of the store.
//The thunk attempts to fetch the courses and generates an action event.
export function loadCourses() {
  return function(dispatch, getState) {
    return courseApi.getAllCourses().then((courses) => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(loadCoursesError(error));
    });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    return courseApi.saveCourse(course).then((savedCourse) => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      throw error;
    });
  };
}
