export const BASE_URL = 'http://mars.theblueground.net';
export const BACKEND_URL = `${BASE_URL}/api`;
export const PER_PAGE = 9;

export const userActionConstants = {

    LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
    
    LOGOUT: 'USER_LOGOUT',
};

export const unitActionConstants = {

    UNITS_ALL_REQUEST: 'UNITS_ALL_REQUEST',
    UNITS_ALL_SUCCESS: 'UNITS_ALL_SUCCESS',
    UNITS_ALL_FAILURE: 'UNITS_ALL_FAILURE',

    UNIT_ID_REQUEST:   'UNIT_ID_REQUEST',
};
