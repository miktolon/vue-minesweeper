import { gameData, gameEnded, gameState } from "@/store/store";
import { DIRECTIONS, type ICell } from "@/common/types";

export const select = (cell: ICell) => {

    if (gameEnded.value) {
        return;
    }

    if (cell.locked === true) {
        return;
    }

    const x = cell.x;
    const y = cell.y;

    if (gameData.matrix[y][x].isMine === true) {

        Object.assign(
            gameData.matrix[y][x],
            {
                checked: true,
                exploded: true
            }
        );

        Object.assign(gameState, {
            gameOver: true
        });
        return;
    }

    const surrounding = getSurrounding(x, y);
    const mineAmount = getSurroundingMineAmount(surrounding);

    Object.assign(
        gameData.matrix[y][x],
        {
            checked: true,
            minesNearby: mineAmount
        }
    );

    if (mineAmount === 0) {
        surrounding.forEach((neighbor: ICell) => {
            if (neighbor.checked !== true) {
                select(neighbor);
            }
        });
    }

    checkGameProgress();
}

export const lock = (cell: ICell) => {

    if (gameEnded.value) {
        return;
    }

    Object.assign(
        gameData.matrix[cell.y][cell.x],
        {
            locked: !cell.locked
        }
    );
}

const checkGameProgress = () => {
    let unresolved = 0;
    gameData.matrix.forEach((row, index)=> {
        gameData.matrix[index].forEach((cell)=> {
            if (!cell.isMine) {
                if (!cell.checked) {
                    unresolved++;
                }
            }
        })
    });

    if (unresolved === 0) {
        Object.assign(gameState, {
            gameWin: true
        });
    }
}

const getSurrounding = (x: number, y: number): Array<ICell> => {
    const result: Array<ICell> = [];

    const limitY = gameData.matrix.length - 1;
    if (limitY < 1) {
        return result;
    }
    const limitX = gameData.matrix[0].length - 1;

    DIRECTIONS.forEach(direction => {
        let mx = x + direction.x;
        let my = y + direction.y;

        if (mx >=0 && mx <= limitX && my >=0 && my <= limitY) {
            result.push(gameData.matrix[my][mx]);
        }
    });

    return result;
}

const getSurroundingMineAmount = (neighbours: Array<ICell>): number => {
    let minesNearby = 0;
    neighbours.forEach((neighbor: ICell) => {
        if (neighbor.isMine === true) {
            minesNearby++;
        }
    });
    return minesNearby;
}