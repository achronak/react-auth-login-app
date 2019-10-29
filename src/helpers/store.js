import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { userActionConstants } from '../constants/client';
import { userAuth } from '../reducers/userReducer';
import { units } from '../reducers/unitReducer';

const appReducer = combineReducers({
    userAuth,
    units
  });

const rootReducer = (state, action) => {
    if (action.type === userActionConstants.LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);