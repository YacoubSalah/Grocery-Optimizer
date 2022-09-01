import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { Provider } from 'mobx-react'
import reportWebVitals from './reportWebVitals';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-solid-svg-icons';
import { Products } from './store/products';
import {Store} from './store/store'
import { Carts } from './store/carts';
const store = new Store()
const products = new Products()
const carts = new Carts()


const stores = {
    store,
    products,
    carts
}

window.React1 = require('react');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider {...stores}>
        <App />
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
