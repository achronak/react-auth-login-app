import { authHeader, handleResponse, logout } from '../helpers/utils';
import { BACKEND_URL } from '../constants/client';

export const userService = {
    authLogin,
    logout,
    getById
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/users/${id}`, requestOptions).then(handleResponse);
}

function authLogin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${BACKEND_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}


