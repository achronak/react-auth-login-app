import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { userAuth } from '../reducers/userReducer';
import { units } from '../reducers/unitReducer';

const rootReducer = combineReducers({
    userAuth,
    units
  });

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);