import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { copyGrid } from '../common/utils';

export default function puzzleReducer(state = initialState.puzzle, action) {
    switch (action.type) {

        case types.PARSE_PUZZLE_SUCCESS:
            return action.puzzle;

        case types.TRY_VALUE: {
            let { move } = action;
            let puzzle = copyGrid(state);
            puzzle[move.x][move.y] = move.value;
            return puzzle;
        }

        default:
            return state;
    }
}