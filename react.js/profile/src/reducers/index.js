// @flow

import {combineReducers} from 'redux';
import * as asyncInitialState from 'redux-async-initial-state';

import OfficeReducer from './offices';


const reducers: {} = asyncInitialState.outerReducer(combineReducers({
    offices: OfficeReducer,
    asyncInitialState: asyncInitialState.innerReducer
}));

export default reducers;
