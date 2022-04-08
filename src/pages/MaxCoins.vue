<template>
    <div class="main">
        <div>
            <h2>得分：{{ initInfo.sum }}</h2>
            <p>每次得分为消去方块乘以其前后方块数值</p>
        </div>
        <div class="selectArea">
            <button v-for="(p, i) in initInfo.pointList" @click="tap(p, i)" :key="i">{{ p }}</button>
            <p
                v-show="initInfo.pointList.length == 0"
            >{{ initInfo.sum == initInfo.ans ? '厉害啊!' : '就这?' }}</p>
        </div>

        <div class="control">
            <div>
                <button @click="reset">重来</button>
                <button @click="newGame">新局</button>
            </div>
        </div>
        <div class="result">
            <h2
                :style="initInfo.maxSum == initInfo.ans ? 'color:green' : 'color:#2c3e50'"
            >{{ initInfo.maxSum != -1 ? '最高分数：' + initInfo.maxSum : '' }}</h2>
            <p style="fontSize:0.8rem">{{ initInfo.maxSum != -1 ? '*绿色表明已达成最优解' : '' }}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const initInfo = reactive({ pointList: [], sum: 0, maxSum: -1, map_seed: '' });

function LCG(s) {
    return function () {
        s = Math.imul(48271, s) | 0 % 2147483647;
        return (s & 2147483647) / 2147483648;
    }
}

const gameInit = function () {
    initInfo.pointList.length = ''
    initInfo.sum = 0
    let seed = parseInt(initInfo.map_seed);
    if (!seed) {
        seed = Math.floor(Math.random() * 1000000);
        initInfo.map_seed = seed.toString();
    }
    console.log('seed:', seed);
    const rand = LCG(seed);

    for (let i = 0; i < 6; i++) {
        const point = Math.floor((rand() * 9) + 1);
        initInfo.pointList.push(point);
    }
    initInfo.ans = getAns(initInfo.pointList)
    console.log('最优解：', initInfo.ans);
}
const getAns = function (arr) {
    const nums = arr.slice()
    nums.push(1);
    nums.unshift(1);
    const len = nums.length;
    const res = new Array(nums.length).fill(0).map(_ => new Array(nums.length).fill(0));

    for (let i = len - 1; i >= 0; i--) {
        for (let j = i + 1; j <= len - 1; j++) {
            for (let k = i + 1; k < j; k++) {
                res[i][j] = Math.max(res[i][j], res[i][k] + res[k][j] + nums[i] * nums[k] * nums[j]);
            }
        }
    }
    return res[0][len - 1];
}

const tap = function (p, i) {
    initInfo.pointList.push(1)
    initInfo.pointList.unshift(1)
    initInfo.sum += initInfo.pointList[i] * p * initInfo.pointList[i + 2];
    initInfo.pointList.splice(i + 1, 1)
    initInfo.pointList.pop()
    initInfo.pointList.shift()
    if (initInfo.pointList.length == 0) {
        initInfo.maxSum = Math.max(initInfo.maxSum, initInfo.sum)
    }
}

const reset = function () {
    gameInit()
}
const newGame = function () {
    initInfo.map_seed = ''
    initInfo.maxSum = -1
    gameInit()
}

gameInit()

</script>

<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    div {
        margin-top: 1rem;
    }
}
.selectArea {
    height: 4rem;
    button {
        width: 3rem;
        height: 3rem;
        margin: 0.3rem;
        border-radius: 1rem;
        font-size: 1.5rem;
    }
}
.control {
    button {
        width: 4rem;
        height: 3rem;
        margin: 0.3rem;
        border-radius: 0.5rem;
        font-size: 1rem;
    }
}
.result {
    h2 {
        margin: 0px;
        padding: 0px;
    }
}
</style>