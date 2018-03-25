import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import * as asyncInitialState from 'redux-async-initial-state';
import 'promise-polyfill/src/polyfill';
import 'bootstrap/dist/css/bootstrap.css';

import reducers from './reducers';
import App from './components/App';
import config from './firebase.config';
import './index.less';


firebase.initializeApp(config);

const loadStore = () => {
    return new Promise(resolve => {
        firebase.database().ref().once('value')
            .then((data) => data.val())
            .then(resolve);
    });
};

const store = createStore(
    reducers,
    compose(applyMiddleware(asyncInitialState.middleware(loadStore)))
);

store.subscribe(() => firebase.database().ref().set(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} /> />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
