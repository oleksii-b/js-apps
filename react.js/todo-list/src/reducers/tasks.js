import {combineReducers} from 'redux';


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

export default function task(state = getInitialState(), action) {
    let newState = [...state];

    switch (action.type) {
        case 'add':
            let time = Date.now();

            if (newState.length) {
                action.task.id = newState[newState.length - 1].id < time ? time : newState[newState.length - 1].id + 1;
            } else {
                action.task.id = time;
            }

            newState.unshift(action.task);

            return newState;
        case 'remove':
            newState = newState.filter((task) => {
                return task.id !== action.id;
            });

            return newState;
        case 'update':
            newState = newState.map((task) => {
                return task.id === action.task.id ? {...task, ...action.task} : task;
            });

            return newState;
        default:
            return state;
    }
}
