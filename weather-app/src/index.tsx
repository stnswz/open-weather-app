import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './css/index.css';
import {LangProvider} from './lang/LangProvider';
import App from './App';

LangProvider.setStore(store);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
