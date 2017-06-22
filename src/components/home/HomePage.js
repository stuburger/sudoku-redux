import { Link } from 'react-router';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/actions';

import style from './styles';

const propTypes = {
    puzzle: PropTypes.array.isRequired,
    puzzleSize: PropTypes.number.isRequired,
    currentMove: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    valueIsChanging = (x, y) => {
        const { currentMove } = this.props;
        return currentMove.x == x && currentMove.y == y;
    }

    getClassForCell = (x, y) => this.valueIsChanging(x, y) ? "cell active" : "cell";

    renderPuzzle = () => {

        const {
            puzzle,
            puzzleSize } = this.props;

        let rows = [];

        for (let x = 0; x < puzzleSize; x++) {
            let cells = [];
            for (let y = 0; y < puzzleSize; y++) {
                let cell = (
                    <td
                        key={`col-${y}`}
                        className={this.getClassForCell(x, y)}
                    >{puzzle[x][y] == 0 ? "" : puzzle[x][y]}</td>
                );

                cells.push(cell);
            }

            rows.push(<tr key={`row-${x}`}>{cells}</tr>);
        }

        return (
            <table style={style.root}>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="jumbotron">
                <h1>Sudoku Redux</h1>
                <p>Sudoku solved using react and redux</p>
                {this.renderPuzzle()}
                <input
                    type="button"
                    className="btn btn-primary"
                    value="Solve"
                    onClick={this.props.actions.solve}
                />
            </div>
        );
    }
}

HomePage.propTypes = propTypes;

const mapStateToProps = (state, ownProps) => ({
    puzzle: state.puzzle,
    puzzleSize: state.puzzle.length,
    currentMove: state.currentMove
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);