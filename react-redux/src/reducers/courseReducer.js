import * as actionsTypes from '../actions/actionTypes';

//Set empty array as initial state as default parameter
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case actionsTypes.CREATE_COURSE:
      return [...state,
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
