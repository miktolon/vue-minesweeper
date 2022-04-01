<template>
    <div class="popover-game-end">
        <h1 :class="titleStateCls">{{ message }}</h1>
        <button @click="resetGame" :class="'btn primary'">Play again</button>
        <button @click="hideGameEnded" :class="'btn text-only'">Show board</button>
    </div>
</template>

<script setup lang="ts">
import { gameState, resetGame, hideGameEnded } from '@/store/store';
</script>

<script lang="ts">
export default {
    name: 'GameEnded',
    data() {
        return {
            message: gameState.gameWin === true
                ? 'Game win!'
                : gameState.gameOver === true
                    ? 'Game over'
                    : ''
        }
    },
    computed: {
        titleStateCls() {
            if (gameState.gameWin) {
                return 'popover-title-win';
            }

            if (gameState.gameOver) {
                return 'popover-title-gameover';
            }

            return '';
        }
    }
}
</script>

<style scoped>
.popover-game-end {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 5em;
}

button.btn.primary {
    border-radius: 15px;
    padding: 1em 1.5em;
    margin-bottom: 1em;
}

.popover-title-win {
    color: #12e518;
}

.popover-title-gameover {
    color: #ff2020;
}
</style>