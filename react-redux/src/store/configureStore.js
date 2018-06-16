import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';

//Utility library that checks that you don't mutate state in your reducers - only use in DEV mode
import reduxImmutableStoreInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStoreInvariant())
  );
}

