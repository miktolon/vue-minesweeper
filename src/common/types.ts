export interface IGameState {
    size_x: number;
    size_y: number;
    difficulty: string,
    gameOver: boolean;
    gameWin: boolean;
    showResults: boolean;
}

export interface ICell {
    x: number,
    y: number,
    isMine: boolean,
    locked: boolean,
    checked: boolean,
    exploded: boolean,
    minesNearby: number
}

export interface IGameData {
    matrix: Array<Array<ICell>>;
}

export const DEFAULT_DIFFICULTY = 'easy';
export const DIFFICULTIES: { [key: string]: any; } = {
    easy: {
        grid: {
            x: 9,
            y: 9
        },
        container: 600,
        mMultiplier: 6
    },
    normal: {
        grid: {
            x: 14,
            y: 10
        },
        container: 800,
        mMultiplier: 5
    },
    hard: {
        grid: {
            x: 20,
            y: 14
        },
        container: 1000,
        mMultiplier: 4
    }
};

export const DIRECTIONS = [
    {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1},
    {x:  0, y: -1}, {x:  0, y: 1},
    {x:  1, y: -1}, {x:  1, y: 0}, {x:  1, y: 1}
];