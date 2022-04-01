import { gameState } from "@/store/store";
import { DEFAULT_DIFFICULTY, DIFFICULTIES, type ICell } from "@/common/types";

export const getMatrix = (): Array<Array<ICell>> => {
    let matrix: Array<Array<ICell>> = new Array(gameState.size_y);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(gameState.size_x);
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = {
                y: i,
                x: j,
                isMine: Math.floor(Math.random() * DIFFICULTIES[gameState.difficulty].mMultiplier) == 1,
                locked: false,
                checked: false,
                exploded: false,
                minesNearby: 0
            }
        }
    }
    return matrix;
}

export const debounce = (func: Function, timeout = 300) => {
    let timer: number;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const setContainerWidth = () => {
    const options = DIFFICULTIES[gameState.difficulty];
    const value = window.innerWidth < options.container ? window.innerWidth : options.container;

    document.documentElement.style.setProperty('--layout-container-width', `${value}px`);
}

export const getGridSize = (difficulty = DEFAULT_DIFFICULTY) => {

    const options = DIFFICULTIES[difficulty];
    const x_amount = window.innerWidth < 480 ? 7 : options.grid.x;
    const y_amount = Math.floor((options.grid.x * options.grid.y) / x_amount);
    
    document.documentElement.style.setProperty('--game-cell-amount-x', `${x_amount}`);
    document.documentElement.style.setProperty('--game-cell-amount-y', `${y_amount}`);

    return {
        size_x: x_amount,
        size_y: y_amount
    }
}