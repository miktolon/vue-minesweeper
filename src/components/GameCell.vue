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
            
            <svg-icon v-if="gameEnded && !cell?.exploded && !cell?.locked && cell?.isMine" name="Mine" />
            <svg-icon v-if="!gameEnded && cell?.locked" name="Flag" />
            <svg-icon v-if="gameEnded && cell?.locked && !cell?.isMine" name="FlagInvalid" />
            <svg-icon v-if="gameEnded && cell?.locked && cell?.isMine" name="Flag" />
            <svg-icon v-if="cell?.exploded" name="MineExploded" />
        </button>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { ICell } from '@/common/types';
import { gameEnded } from '@/store/store';
import { select, lock } from '@/game';
import SvgIcon from "@/components/SvgIcon.vue";
</script>

<script lang="ts">
export default {
    name: 'Cell',
    components: {
        SvgIcon
    },
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