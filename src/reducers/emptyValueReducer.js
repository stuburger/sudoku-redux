import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { copyEmpties } from '../common/utils';

export default function emptyValueReducer(state = initialState.emptyValues, action) {
    switch (action.type) {

        case types.GET_EMPTY_VALUES_SUCCESS:
            return action.emptyValues;

        // case types.TRY_VALUE: {
        //     let emptyValues = copyEmpties(state);
        //     let { move } = action;
        //     let index = emptyValues.findIndex(c => c.x == move.x && c.y == move.y);

        //     emptyValues[index] = move.value;

        //     return emptyValues;
        // }

        default:
            return state;
    }
}