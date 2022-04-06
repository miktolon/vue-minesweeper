import { gameState } from "@/store/store";
import { DEFAULT_DIFFICULTY, DIFFICULTIES, type ICell } from "@/common/types";

export const getMatrix = (): Array<Array<ICell>> => {
    let minesLeft = getMinesAmount();
    let matrix = Array(gameState.size_y)
        .fill(undefined)
        .map((_, i) => Array(gameState.size_x)
            .fill(undefined)
            .map((_, j) => {
                return {
                    y: i,
                    x: j,
                    isMine: false,
                    locked: false,
                    checked: false,
                    exploded: false,
                    minesNearby: 0
                }
            })
        );

    let row;
    let col;
    while( minesLeft > 0 ) {
        row = Math.floor(Math.random() * gameState.size_y);
        col = Math.floor(Math.random() * gameState.size_x);
        if (matrix[row][col].isMine === false) {
            matrix[row][col].isMine = true;
            minesLeft--;
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

const getMinesAmount = (): number => {
    const maxAmount = Math.floor((gameState.size_x * gameState.size_y) * 0.9);
    const amount = DIFFICULTIES[gameState.difficulty].mineAmount;

    return amount <= maxAmount ? amount : maxAmount;
}