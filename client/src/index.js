import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import reportWebVitals from './reportWebVitals';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-solid-svg-icons';

import {Store} from './Store/Store'
import { Products } from './Store/Products';

const store = new Store()
const products = new Products()

console.log(products)

const stores = {
    store,
    products
}

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
