import { combineReducers } from 'redux';
import puzzle from './puzzleReducer';
import emptyValues from './emptyValueReducer';
import currentMove from './moveReducer';

const rootReducer = combineReducers({
    puzzle,
    emptyValues,
    currentMove
});

export default rootReducer;