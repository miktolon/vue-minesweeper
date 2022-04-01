<template>
    <div class="container">
        <main>
            <div class="toolbar">
                <h1>Minesweeper</h1>
            </div>
            <div class="game-grid">
                <div
                    v-for="(row, index) in gameData.matrix" :key="index"
                    class="game-grid-row"
                >
                    <game-cell v-for="(cell, jndex) in row" :key="jndex" :cell="cell" />
                </div>
                <game-ended v-if="(gameState.gameOver || gameState.gameWin) && !gameState.showResults" />
                <div v-if="gameState.showResults" class="game-ended-notification">
                    <p>Game ended, press Reset to play again</p>
                </div>
            </div>
            <div class="toolbar">
                <button @click="resetGame" :class="'btn primary btn-reset'">Reset</button>
                <button v-for="(difficulty, index) in Object.keys(DIFFICULTIES)" :key="index"
                    @click="changeDifficulty(difficulty)"
                    :class="`btn primary ${gameState.difficulty === difficulty ? 'toggled' : ''}`"
                >
                    {{ difficulty }}
                </button>
            </div>
        </main>
        <footer>
            <span class="vue-link">
                <span>Made with </span>
                <a href="https://vuejs.org/" target="_blank">Vue 3</a>
            </span>
            <span class="github-link">
                <a href="https://github.com/miktolon/vue-minesweeper" target="_blank">
                    <img src="@/assets/images/GitHub-Mark-Light-32px.png">
                </a>
            </span>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { gameState, gameData, resetGame, changeDifficulty } from '@/store/store';
</script>

<script lang="ts">
import GameCell from '@/components/GameCell.vue';
import GameEnded from '@/components/GameEnded.vue';
import { debounce, setContainerWidth } from './util/util';
import { DIFFICULTIES } from './common/types';

export default {
    name: 'App',
    components: {
        GameCell,
        GameEnded
    },
    data() {
        return {
            onResize: debounce(() => setContainerWidth())
        }
    },
    mounted() {
        setContainerWidth();
        window.addEventListener('resize', this.onResize);
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize);
    },
    computed: {
        btnGroupCls() {

        }
    }
}
</script>

<style>
@import '@/assets/base.css';
@import '@/assets/game.css';
@import '@/assets/site.css';

.game-ended-notification {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 4px 8px;
    border-radius: 5px;
    color: white;
}

.btn-reset {
    margin-right: 1em;
}
</style>