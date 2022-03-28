<template>
    <div class="main">
        <div>
            <h1>地图编号</h1>
            <h2>{{ initInfo.map_seed }}</h2>
        </div>
        <div class="selectArea">
            <button @click="start" :disabled="initInfo.startFlag">开始</button>
            <button @click="again" :disabled="initInfo.active">重来</button>
            <button @click="randomMap" :disabled="initInfo.active">随机地图</button>
            <button @click="selectMap" :disabled="initInfo.active">选择地图</button>
            <button @click="freeMap" :disabled="initInfo.active">自由模式</button>
        </div>
        <div>
            <h1>剩余放置障碍次数：{{ initInfo.count }}/{{ initInfo.maxCount }}</h1>
        </div>
        <div>
            <table>
                <tr v-for="r in initInfo.table.length">
                    <td
                        class="area"
                        v-for="c in initInfo.table[0].length"
                        @click="putBar(r, c, initInfo.table)"
                    >{{ initInfo.table[r - 1][c - 1] }}</td>
                </tr>
            </table>
        </div>
        <div>
            <h1>总步数：{{ initInfo.step }}</h1>
        </div>
        <div class="bestStep">
            <h1 v-show="bestResult != 0">历史最佳:{{ bestResult }}步</h1>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
const ROW = 10
const COLUMN = 10
const BAR = 20
const initInfo = reactive({
    startFlag: 0,
    active: 0,
    step: 0,
    count: 10,
    maxCount: 10,
    result: [],
    map_seed: ''
})

function LCG(s) {
    return function () {
        s = Math.imul(48271, s) | 0 % 2147483647;
        return (s & 2147483647) / 2147483648;
    }
}

const bestResult = computed(() =>
    initInfo.result.reduce((max, cur) => Math.max(max, cur), 0)
)


const barInit = function (row, column, num, seed) {
    const barList = []
    const rand = LCG(seed);
    const generateRandom = function (row, column) {
        const x = Math.floor((rand() * row));
        const y = Math.floor((rand() * column));
        if (!(x == 0 && y == 0 || (x == row - 1 && y == column - 1))) {
            for (let i = 0; i < barList.length; i++) {
                if (barList[i].toString() == [x, y].toString()) {
                    return false;
                }
            }
            barList.push([x, y])
        }
    }

    while (1) {
        if (barList.length < num) {
            generateRandom(row, column);
        } else {
            for (let i = 0; i < barList.length; i++) {
                const e = barList[i];
                initInfo.table[e[0]][e[1]] = '⛰️'
            }
            if (!next(ROW, COLUMN, initInfo.table)) {
                barList.length = 0
                initInfo.table = new Array(ROW).fill(null).map(_ => new Array(COLUMN).fill(null))
                initInfo.table[0][0] = '🐎'
            } else {
                break;
            }

        }
    }


}

const tableInit = function (row, column, num) {
    initInfo.table = new Array(ROW).fill(null).map(_ => new Array(COLUMN).fill(null))
    initInfo.table[0][0] = '🐎'

    let seed = parseInt(initInfo.map_seed);
    if (!seed) {
        seed = Math.floor(Math.random() * 1000000);
        initInfo.map_seed = seed.toString();
    }

    barInit(row, column, num, seed)

}

const next = function (row, column, table) {
    const copyArr = table.map(arr => arr.slice());
    const p = [[0, 0]]
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]]

    const prev = Array.from(Array(row), _ => Array(column).fill(null))
    copyArr[0][0] = ''
    while (p.length != 0) {
        for (let i = 0; i < p.length; i++) {
            const curNode = p.shift()
            const curX = curNode[0]
            const curY = curNode[1]
            for (let i = 0; i < directions.length; i++) {
                const direction = directions[i];
                const nextX = curX + direction[0]
                const nextY = curY + direction[1]

                if (nextX >= 0 && nextX < row && nextY >= 0 && nextY < column) {
                    if (copyArr[nextX][nextY] != ('⛰️' || '❌')) {
                        if (nextX == row - 1 && nextY == column - 1) {
                            copyArr[nextX][nextY] = ''
                            prev[nextX][nextY] = curNode
                            return prev
                        }
                        if (copyArr[nextX][nextY] == null) {
                            p.push([nextX, nextY])
                            copyArr[nextX][nextY] = ''
                            prev[nextX][nextY] = curNode
                        }
                    }
                }

            }
        }
    }
}

tableInit(ROW, COLUMN, BAR)


const putBar = function (row, column, table) {

    if (initInfo.active == 0 && table[9][9] != '🐎' && !(row == 10 && column == 10)) {
        if (table[row - 1][column - 1] == null && initInfo.count > 0) {
            table[row - 1][column - 1] = '❌'
            initInfo.count--
        } else if (table[row - 1][column - 1] == '❌' && initInfo.count >= 0) {
            table[row - 1][column - 1] = null
            initInfo.count++
        }
    }
}



const getPath = function (data, row, column) {
    const res = [[row - 1, column - 1]]
    let at = [row - 1, column - 1];
    if (data) {
        while (data[at[0]][at[1]] != null) {
            res.push(data[at[0]][at[1]])
            at = data[at[0]][at[1]]
        }
        res.reverse()
        if (res[0].toString() == [0, 0].toString()) {
            return res
        }
        return []
    } else {
        return []
    }
}


const start = function () {
    initInfo.startFlag = 1
    initInfo.active = 1

    const shortestPath = getPath(next(ROW, COLUMN, initInfo.table), ROW, COLUMN)
    if (shortestPath.length > 0) {
        const start = setInterval(() => {
            if (shortestPath.length > 0) {

                const pre = shortestPath.shift()
                if (shortestPath.length != 0) {
                    initInfo.step++
                    initInfo.table[pre[0]][pre[1]] = ''
                    initInfo.table[shortestPath[0][0]][shortestPath[0][1]] = '🐎'
                }
            } else {
                clearInterval(start)
                initInfo.active = 0
                initInfo.result.push(initInfo.step)
            }
        }, 100)
    } else {
        alert('不可以把路封死!')
        initInfo.startFlag = 0
        initInfo.active = 0
    }
}


const again = function () {
    initInfo.startFlag = 0
    initInfo.step = 0

    for (let i = 0; i < initInfo.table.length; i++) {
        for (let j = 0; j < initInfo.table[0].length; j++) {
            if (initInfo.table[i][j] == '⛰️') {
                initInfo.table[i][j] = '⛰️'
            } else if (initInfo.table[i][j] == '❌') {
                initInfo.table[i][j] = '❌'
            } else {
                initInfo.table[i][j] = null
            }

        }
    }
    initInfo.table[0][0] = '🐎'
}


const randomMap = function () {
    initInfo.startFlag = 0
    initInfo.step = 0
    initInfo.count = 10
    initInfo.maxCount = 10
    initInfo.result.length = 0
    initInfo.map_seed = ''

    tableInit(ROW, COLUMN, BAR)

}

const selectMap = function () {
    initInfo.map_seed = prompt('输入地图编号:')
    initInfo.startFlag = 0
    initInfo.step = 0
    initInfo.count = 10
    initInfo.maxCount = 10
    initInfo.result.length = 0
    tableInit(ROW, COLUMN, BAR)
}

const freeMap = function () {
    initInfo.startFlag = 0
    initInfo.step = 0
    const count = prompt('设置障碍数量:') || 98
    initInfo.maxCount = count > 98 ? 98 : count
    initInfo.count = count > 98 ? 98 : count
    initInfo.result.length = 0
    initInfo.map_seed = '--------'


    initInfo.table = new Array(ROW).fill(null).map(_ => new Array(COLUMN).fill(null))
    initInfo.table[0][0] = '🐎'

}

</script>

<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}
.selectArea {
    margin-bottom: 20px;
    button {
        margin-left: 10px;
    }
}
table {
    border-collapse: collapse;
}
.area {
    width: 30px;
    height: 30px;
    border: 1px solid black;
}
.stepList {
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        margin: 10px;
    }
}
.bestStep {
    height: 0px;
}
</style>