import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { BASE_URL } from '../constants/client';

export const history = createBrowserHistory();

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': user.token.tokenType + ' ' + user.token.accessToken,
                'Content-Type': 'application/json' };
    } else {
        return {};
    }
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function logout() {
    localStorage.removeItem('user');
}

export function resolveImg(url, forceRes = null) {
    const imgUrls = {
        'sm': 'w200',
        'md': 'w400',
        'lg': 'w800',
    }
    let selector = imgUrls['lg']
    
    if (getScreenResolution()[0] <= 580){
        selector = imgUrls['sm']
    } else if (getScreenResolution()[0] <= 768){
        selector = imgUrls['md']
    } else if (forceRes) { // apply forced resolution(if any) only on big screens
        selector = imgUrls[forceRes]
    }
    url = url.replace( new RegExp("\\w[0-9][0-9][0-9]","g"), selector)
    
    return `${BASE_URL}${url}`;
}

export function getScreenResolution() {
   return ([
       window.screen.width,
       window.screen.height
    ]);
}