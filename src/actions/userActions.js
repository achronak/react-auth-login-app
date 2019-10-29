import { userActionConstants } from '../constants/client';
import { userService } from '../services/userService';
//import { alertActions } from './';
import { history } from '../helpers/utils';

export const userActions = {
    authLogin,
    logout
};

function authLogin(email, password) {
    return dispatch => {
        dispatch({ 
            type: userActionConstants.LOGIN_REQUEST,
            email 
        });

        userService.authLogin(email, password)
            .then(
                user => { 
                    dispatch({
                        type: userActionConstants.LOGIN_SUCCESS,
                        user
                    });
                    history.push('/');
                },
                error => {
                    dispatch({
                        type: userActionConstants.LOGIN_FAILURE,
                        error 
                    });
                }
            );
    };

}

function logout() {
    userService.logout();
    return { type: userActionConstants.LOGOUT };
}


