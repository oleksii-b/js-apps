import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import reducers from './reducers';
import App from './components/App';
import NotFound from './components/NotFound';


const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => localStorage.setItem('tasks', JSON.stringify(store.getState().tasks)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/tasks/:id?' component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
