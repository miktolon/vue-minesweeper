import { DEFAULT_DIFFICULTY, type IGameData, type IGameState } from '@/common/types';
import { getGridSize, getMatrix, setContainerWidth } from '@/util/util';
import { computed, reactive } from 'vue';

const initialGameState = (): IGameState => (
    {
        ...getGridSize(),
        difficulty: DEFAULT_DIFFICULTY,
        gameOver: false,
        gameWin: false,
        showResults: false
    }
);

export const gameState: IGameState = reactive(
    initialGameState()
);

export const gameData: IGameData = reactive({
    matrix: getMatrix()
});

export const changeDifficulty = (difficulty: string) => {

    Object.assign(gameState,
        {
            ...getGridSize(difficulty),
            difficulty: difficulty,
            gameOver: false,
            gameWin: false,
            showResults: false
        }
    );

    Object.assign(gameData, {
        matrix: getMatrix()
    });

    setContainerWidth();
}

export const resetGame = () => {

    Object.assign(gameState,
        {
            ...getGridSize(gameState.difficulty),
            gameOver: false,
            gameWin: false,
            showResults: false
        }
    );

    Object.assign(gameData, {
        matrix: getMatrix()
    });
}

export const hideGameEnded = () => {
    Object.assign(gameState, {
        showResults: true
    });
}

export const gameEnded = computed(() => {
    return (
        gameState.gameOver || gameState.gameWin || gameState.showResults
    );
});