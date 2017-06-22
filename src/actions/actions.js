import * as types from './actionTypes';
import * as utils from '../common/utils';

export const parsePuzzle = (strPuzzle) => ({
    type: types.PARSE_PUZZLE_SUCCESS,
    puzzle: utils.parse(strPuzzle)
});

export const solve = (puzzle) => async (dispatch, getState) => {
    let { puzzle } = getState();
    let empties = utils.getEmptyCells(puzzle);
    await utils.solve(puzzle, empties, dispatch);
};