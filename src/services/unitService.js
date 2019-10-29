import { authHeader, handleResponse } from '../helpers/utils';
import { BACKEND_URL } from '../constants/client';

export const unitService = {
    getAll,
    getById
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/units/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/units`, requestOptions)
        .then(handleResponse);
}


