// flow

import {combineReducers} from 'redux';


type RemoveAction = {
    +type: 'REMOVE_OFFICE',
    +payload: number
};

type Actions = {
    +type: 'ADD_OFFICE' | 'UPDATE_OFFICE',
    +payload: {
        id: number
    }
} | RemoveAction;

export default function OfficeReducer(state: [] = [], action: Actions):{}[] {
    let newState = [...state];

    switch (action.type) {
        case 'ADD_OFFICE':
            const id = Date.now();

            if (newState.length) {
                action.payload.id = newState[newState.length - 1].id < id ? id : newState[newState.length - 1].id + 1;
            } else {
                action.payload.id = id;
            }

            return [action.payload, ...newState];
        case 'REMOVE_OFFICE':
            newState = newState.filter((item) => {
                return item.id !== action.payload;
            });

            return newState;
        case 'UPDATE_OFFICE':
            newState = newState.map((item) => {
                return item.id === action.payload.id ? {...item, ...action.payload} : item;
            });

            return newState;
        default:
            return newState;
    }
}
