import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.sass';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
