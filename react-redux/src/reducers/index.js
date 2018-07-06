import {combineReducers} from 'redux';
import courseReducer from './courseReducer';
import authorReducer from './authorReducer';


/*
- The root reducer calls every child reducer, and gathers their results into a single state object.
- The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers()

- Example:
  rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
*/
const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer
});

export default rootReducer;


