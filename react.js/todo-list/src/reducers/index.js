import {combineReducers} from 'redux';

import TaskReducer from './tasks';


const reducers = combineReducers({
    tasks: TaskReducer
});

export default reducers;
