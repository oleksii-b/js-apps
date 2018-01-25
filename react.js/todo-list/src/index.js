import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';


const getInitialState = () => {
    let tasks = localStorage.getItem('tasks');

    try {
        tasks = JSON.parse(tasks);
        tasks = tasks instanceof Array ? tasks : [];
    } catch (e) {
        tasks = [];
    }

    return tasks;
}

const store = createStore((state = getInitialState(), action) => {
    let newState = [...state];

    switch (action.type) {
        case 'add':
            let time = Date.now();

            if (newState.length) {
                action.task.id = newState[newState.length - 1].id < time ? time : newState[newState.length - 1].id + 1;
            } else {
                action.task.id = time;
            }

            return [...newState, action.task];
        case 'remove':
            return newState.filter((task) => {
                return task.id !== action.id;
            });
        case 'update':
            return newState.map((task) => {
                return task.id === action.task.id ? Object.assign(task, action.task) : task;
            });
        default:
            return state;
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => localStorage.setItem('tasks', JSON.stringify(store.getState())));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
