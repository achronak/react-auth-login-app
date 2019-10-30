export const BASE_URL = 'http://mars.theblueground.net';
export const BACKEND_URL = `${BASE_URL}/api`;
export const PER_PAGE = 12;
export const AVAILABLE_BOOKING_YEARS = [
    2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088];

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
    UNIT_ID_SUCCESS:   'UNIT_ID_SUCCESS',
    UNIT_ID_FAILURE:   'UNIT_ID_FAILURE',
};
