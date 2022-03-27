<template>
    <div class="main">
        <div class="selectArea">
            <button @click="start" :disabled="initInfo.startFlag">开始</button>
            <button @click="again" :disabled="initInfo.active">重来</button>
            <button @click="restart" :disabled="initInfo.active">换地图</button>
        </div>
        <div>
            <h1>剩余放置障碍次数：{{ initInfo.count }}</h1>
        </div>
        <div>
            <table>
                <tr v-for="r in tableInit.length">
                    <td
                        class="area"
                        v-for="c in tableInit[0].length"
                        @click="putBar(r, c)"
                    >{{ tableInit[r - 1][c - 1] }}</td>
                </tr>
            </table>
        </div>
        <div class="step">
            <h1>总步数：{{ initInfo.step }}</h1>
        </div>
    </div>
</template>

<script setup>import { reactive, ref, } from 'vue';
const row = 10
const column = 10
const tableInit = reactive(Array.from(Array(row), _ => Array(column).fill(null)))
const initInfo = reactive({
    startFlag: 0,
    active: 0,
    step: 0,
    count: 10
})

const barInit = function (row, column) {
    const barList = []
    const generateRandom = function (row, column) {

        const x = Math.floor((Math.random() * row));
        const y = Math.floor((Math.random() * column));
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
        if (barList.length < 20) {
            generateRandom(row, column);
        } else {
            break;
        }
    }
    return barList
}


const putBar = function (row, column) {
    if (initInfo.active == 0 && tableInit[9][9] != '🐎') {
        if (tableInit[row - 1][column - 1] == null && initInfo.count > 0) {
            tableInit[row - 1][column - 1] = '❌'
            initInfo.count--

        } else if (tableInit[row - 1][column - 1] == '❌' && initInfo.count >= 0) {
            tableInit[row - 1][column - 1] = null
            initInfo.count++
        }
    }

}


const next = function (row, column, tableInit) {
    const copyArr = tableInit.concat()
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
        alert('封死了,玩个几把')
        again()
        initInfo.active = 0
        return []
    }


}


const start = function () {
    initInfo.startFlag = 1
    initInfo.active = 1

    const shortestPath = getPath(next(row, column, tableInit), row, column)
    if (shortestPath.length > 0) {
        const start = setInterval(() => {
            if (shortestPath.length > 0) {

                const pre = shortestPath.shift()
                if (shortestPath.length != 0) {
                    initInfo.step++
                    tableInit[pre[0]][pre[1]] = ''
                    tableInit[shortestPath[0][0]][shortestPath[0][1]] = '🐎'
                }
            } else {
                clearInterval(start)
                initInfo.active = 0
            }
        }, 100)
    }
}


const again = function () {
    initInfo.startFlag = 0
    initInfo.step = 0
    initInfo.count = 10
    for (let i = 0; i < tableInit.length; i++) {
        for (let j = 0; j < tableInit[0].length; j++) {
            if (tableInit[i][j] != '⛰️') {
                tableInit[i][j] = null
            }

        }

    }
    tableInit[0][0] = '🐎'
}


const restart = function () {
    initInfo.startFlag = 0
    initInfo.step = 0
    initInfo.count = 10
    for (let i = 0; i < tableInit.length; i++) {
        for (let j = 0; j < tableInit[0].length; j++) {
            tableInit[i][j] = null
        }
    }
    tableInit[0][0] = '🐎'

    const barList = barInit(row, column)

    for (let i = 0; i < barList.length; i++) {
        const e = barList[i];
        tableInit[e[0]][e[1]] = '⛰️'
    }
}

restart()

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
</style>