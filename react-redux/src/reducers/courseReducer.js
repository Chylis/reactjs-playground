import * as actionsTypes from '../actions/actionTypes';

//Set empty array as initial state as default parameter
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case actionsTypes.LOAD_COURSES_SUCCESS:   return action.courses;
    default:                                  return state;
  }
}
