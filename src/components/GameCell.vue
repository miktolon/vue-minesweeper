<template>
    <div class="game-cell" :class="cellStateCls">
        <button
            :disabled="cell?.checked"
            @contextmenu.prevent="onContextMenu(cell)"
            @click="onClick(cell)"
        >
            <span :class="cellNumberCls">
                {{ cell?.minesNearby > 0 ? cell?.minesNearby : '' }}
            </span>
            <img v-if="gameEnded && !cell?.exploded && !cell?.locked && cell?.isMine" :src="cellMine" alt="cell-mine" />
            <img v-if="!gameEnded && cell?.locked" :src="cellLocked" alt="cell-locked" />
            <img v-if="gameEnded && cell?.locked && !cell?.isMine" :src="cellLockedInvalid" alt="cell-locked-invalid" />
            <img v-if="gameEnded && cell?.locked && cell?.isMine" :src="cellLocked" alt="cell-locked-invalid" />
            <img v-if="cell?.exploded" :src="cellExploded" alt="mine-exploded" />
        </button>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ICell } from '@/common/types';
import { gameEnded } from '@/store/store';
import { select, lock } from '@/game';
import cellLocked from "@/assets/svg/flag.svg";
import cellLockedInvalid from "@/assets/svg/flag-invalid.svg";
import cellMine from "@/assets/svg/mine.svg";
import cellExploded from "@/assets/svg/mine-exploded.svg";
</script>

<script lang="ts">
export default {
    name: 'Cell',
    props: {
        cell: {
            type: Object as PropType<ICell>,
            default: null
        }
    },
    computed: {
        cellStateCls() {
            
            if (this.cell?.exploded) {
                return 'game-cell-exploded';
            }

            if (gameEnded.value && this.cell?.locked) {
                if (!this.cell?.isMine) {
                    return 'game-cell-locked-invalid';
                }
            }

            if (this.cell?.locked) {
                return 'game-cell-locked';
            }

            return '';
        },
        cellNumberCls() {
            if (this.cell?.minesNearby > 0) {
                return `game-cell-nearby-${this.cell.minesNearby}`;
            }
            return '';
        }
    },
    methods:{
        onClick(cell: ICell) {
            select(cell);
        },
        onContextMenu(cell: ICell) {
            lock(cell);
        }
    }
}
</script>

<style scoped>
.game-cell img {
    width: 100%;
    height: 100%;
}
</style>