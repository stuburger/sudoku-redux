export const parse = (str) => {
    let rows = str.split('\n');
    let grid = [];
    for (let x = 0; x < rows.length; x++) {
        grid[x] = [];
        for (let y = 0; y < rows[x].length; y++) {
            grid[x][y] = parseInt(rows[x][y]);
        }
    }
    return grid;
};

export const getEmptyCells = (grid) => {
    let empties = [],
        i = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (!grid[x][y]) {
                empties[i++] = {
                    x,
                    y,
                    p: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    index: 0
                };
            }
        }
    }
    return removeImpossibleValues(empties, grid);
};

export const getRowAsArray = (x, grid) => {
    return [...grid[x]];
};

export const getColumnAsArray = (y, grid) => {
    let col = [];
    for (let x = 0; x < grid.length; x++)
        col.push(grid[x][y]);
    return col;
};

export const getCubeAsArray = (x, y, grid) => {

    let arr = [];
    let cubeSize = grid.length / 3;
    let topCorner = Math.floor(x / cubeSize) * cubeSize;
    let leftCorner = Math.floor(y / cubeSize) * cubeSize;

    let cube = [];
    for (let x = topCorner; x < topCorner + cubeSize; x++)
        for (let y = leftCorner; y < leftCorner + cubeSize; y++)
            arr.push(grid[x][y]);
    return arr;
};

export const removeImpossibleValues = (empties, grid) => {

    let arr = [];

    for (let j = 0; j < empties.length; j++) {

        let usedValues = [];

        let row = getRowAsArray(empties[j].x, grid);
        let col = getColumnAsArray(empties[j].y, grid);
        let cube = getCubeAsArray(empties[j].x, empties[j].y, grid);

        for (let i = 0; i < grid.length; i++) {

            if (row[i] && empties[j].x != i)
                usedValues.push(row[i]);

            if (col[i] && empties[j].y != i)
                usedValues.push(col[i]);

            if (cube[i]) 
                usedValues.push(cube[i]);

        }

        arr[j] = {
            x: empties[j].x,
            y: empties[j].y,
            p: empties[j].p.filter(x => {
                return usedValues.indexOf(x) == -1;
            }),
            index: 0
        };
    }
    //arr = sortEmpties(removeSolvedEmpties(arr));
    //arr = sortEmpties(arr);
    return arr;
};

export const checkValue = (val, grid, x, y) => {

    let row = getRowAsArray(x, grid);
    let col = getColumnAsArray(y, grid);
    let cube = getCubeAsArray(x, y, grid);

    let valid = row.filter(x => x == val).length === 0 &&
        col.filter(x => x == val).length === 0 &&
        cube.filter(x => x == val).length === 0;

    return valid;
};

export const copyGrid = (grid) => {
    let newGrid = [];
    for (let x = 0; x < grid.length; x++)
        for (let y = 0; y < grid.length; y++) {
            if (!newGrid[x])
                newGrid[x] = [];

            newGrid[x][y] = grid[x][y];
        }

    return newGrid;
};

export const copyEmpties = (empties) => {
    let arr = [];
    for (let x = 0; x < empties.length; x++) {
        arr.push(Object.assign({}, empties[x], { p: [...empties[x].p] }));
    }
    return arr;
};

export const copyArr = (arr) => [...arr];

export const sortEmpties = (empties) => empties.sort((a, b) => {
    return a.p.length >= b.p.length ? 1 : -1;
});

export const solve = (g, e, dispatch) => {

    let grid = copyGrid(g),
        empties = e,
        tryCounter = 0,
        count = 0;


    let attempts = [];

    for (let x = 0; x < empties.length;) {
        let found = false;

        let i = empties[x].index;

        while (!found && i < empties[x].p.length) {

            count++;
            let value = empties[x].p[i];

            if (checkValue(value, grid, empties[x].x, empties[x].y)) {
                found = true;
                grid[empties[x].x][empties[x].y] = value;
                empties[x].index = i;
                dispatchTryValue(tryCounter++, { value, x: empties[x].x, y: empties[x].y }, dispatch);
                x++;
            } else
                i++;

        }

        if (!found) {
            grid[empties[x].x][empties[x].y] = 0;
            empties[x].index = 0;
            dispatchTryValue(tryCounter++, { value: 0, x: empties[x].x, y: empties[x].y }, dispatch);
            x--;
        }

    }

    return grid;
};

const dispatchTryValue = async (i, move, dispatch) => {
    setTimeout(() => {
        let action = { type: "TRY_VALUE", move };
        dispatch(action);
    }, 500 * i);
};