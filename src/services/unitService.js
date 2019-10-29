import { authHeader, handleResponse } from '../helpers/utils';
import { BACKEND_URL, PER_PAGE } from '../constants/client';

export const unitService = {
    getAllPaged,
    getById
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/units/${id}`, requestOptions).then(handleResponse);
}

function getAllPaged(page = 1) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${BACKEND_URL}/units?page=${page}&perPage=${PER_PAGE}`, requestOptions)
        .then(handleResponse);
}


