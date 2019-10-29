import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { userAuth } from '../reducers/userReducer';

const rootReducer = combineReducers({
    userAuth,
  });

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);