import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function moveReducer(state = initialState.currentMove, action) {
    switch (action.type) {

        case types.TRY_VALUE: {
            let { move } = action;
            return move;
        }

        default:
            return state;
    }
}