import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';


/* ACTION CREATORS */

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors};
}
export function loadAuthorsError(error) {
  return { type: types.LOAD_AUTHORS_ERROR, error: error };
}


/* THUNK ACTION CREATORS */

export function loadAuthors() {
  return function(dispatch, getState) {
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      dispatch(loadAuthorsError(error));
    });
  };
}
