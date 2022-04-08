<template>
    <div class="main">
        <div>
            <h2>
                密码：
                <span
                    v-for="(item, index) in  initInfo.pwdShow"
                    :key="index"
                    :style="item.isDone ? 'color:#2c3e50' : 'color:rgba(255, 255, 255,0.9)'"
                >{{ item.letter }}</span>
            </h2>
        </div>
        <div style="height:300px">
            <div class="circle">
                <img class="arrow" src="../assets/arrow.png" />
                <div
                    class="list"
                    v-for="(item, index) in initInfo.wheelNum"
                    :key="index"
                    :style="'transform:translate(-50%, -50%) rotateZ(' + 36 * item.location + 'deg )'"
                >{{ item.letter }}</div>
            </div>
        </div>
        <div class="selectArea">
            <div>
                <button @click="turn(-1)" :disabled="initInfo.overFlag">逆时针</button>
                <button @click="turn(1)" :disabled="initInfo.overFlag">顺时针</button>
            </div>
            <div>
                <button @click="commit" :disabled="initInfo.commitFlag">输入</button>
            </div>
            <div>
                <button @click="reset">重来</button>
                <button @click="newGame">换盘</button>
            </div>
        </div>
        <div class="result">
            <h2
                :style="initInfo.bestStep == initInfo.ans ? 'color:green' : 'color:#2c3e50'"
            >总步数：{{ initInfo.step }} {{ initInfo.bestStep != 9999 ? '最佳步数：' + initInfo.bestStep : '' }}</h2>
            <p style="fontSize:0.8rem">*绿色表明已达成最优解</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const initInfo = reactive({
    commitFlag: 0,
    step: 0,
    result: []
})

const findRotateSteps = function (ring, key) {
    const ringMap = {};

    for (let i = 0; i < ring.length; i++) {
        const v = ring[i];
        if (ringMap[v]) {
            ringMap[v].push(i);
        } else {
            ringMap[v] = [i];
        }
    }

    const doneMap = new Array(ring.length).fill(-1).map(_ => new Array(key.length).fill(-1));
    const loop = function (ringI, keyI) {
        let res = Infinity;
        if (keyI == key.length) {
            return 0;
        }
        if (doneMap[ringI][keyI] != -1) {
            return doneMap[ringI][keyI];
        }
        const target = key[keyI];
        for (const targetI of ringMap[target]) {
            const d1 = Math.abs(targetI - ringI);
            const d2 = ring.length - d1;
            const min = Math.min(d1, d2);
            res = Math.min(res, min + loop(targetI, keyI + 1));
        }
        doneMap[ringI][keyI] = res;
        return res;
    };

    return key.length + loop(0, 0);
};

const wheelInit = function () {
    initInfo.wheelNum = []
    initInfo.alphabet = []
    for (let i = 0; i < 10; i++) {
        const char = String.fromCharCode(Math.ceil(Math.random() * 25) + 65)
        initInfo.alphabet.push(char)

    }
    for (let i = 0; i < initInfo.alphabet.length; i++) {
        initInfo.wheelNum.push({ letter: initInfo.alphabet[i], location: i })

    }
    initInfo.currentNum = initInfo.alphabet[0]
    pwdInit()
}

const pwdInit = function () {
    initInfo.pwd = []
    for (let i = 0; i < 5; i++) {
        const no = (Math.ceil(Math.random() * 9))
        initInfo.pwd.push(initInfo.alphabet[no])

    }
    initInfo.ans = findRotateSteps(initInfo.alphabet, initInfo.pwd)
    console.log('最优解:' + initInfo.ans + '步');
    initInfo.pwdShow = []
    initInfo.pwd.forEach(function (item) {
        initInfo.pwdShow.push({ letter: item, isDone: 0 })
    })
}

wheelInit()

initInfo.commitFlag = computed(() => {
    if (initInfo.pwd[0] == initInfo.currentNum) {
        return 0
    } else {
        return 1
    }
})

initInfo.overFlag = computed(() => {
    for (let i = 0; i < initInfo.pwdShow.length; i++) {
        const element = initInfo.pwdShow[i];
        if (element.isDone == 0) {
            return 0
        }
    }
    initInfo.result.push(initInfo.step)
    return 1
})

initInfo.bestStep = computed(() =>
    initInfo.result.reduce((min, v) => Math.min(min, v), 9999)

)

const turn = function (direction) {
    for (let i = 0; i < initInfo.wheelNum.length; i++) {
        const element = initInfo.wheelNum[i];
        element.location += direction
        if (element.location % 10 == 0) {
            initInfo.currentNum = element.letter
        }
    }
    initInfo.step++
}

const commit = function () {
    for (let i = 0; i < initInfo.pwdShow.length; i++) {
        const element = initInfo.pwdShow[i];
        if (element.letter == initInfo.currentNum && element.isDone == 0) {
            element.isDone = 1
            break;
        }
    }
    initInfo.step++
    initInfo.pwd.shift()
}

const reset = function () {
    initInfo.step = 0
    initInfo.pwd = []
    initInfo.wheelNum = []
    for (let i = 0; i < initInfo.pwdShow.length; i++) {
        const element = initInfo.pwdShow[i];
        element.isDone = 0
        initInfo.pwd.push(element.letter)
    }
    for (let i = 0; i < initInfo.alphabet.length; i++) {
        initInfo.wheelNum.push({ letter: initInfo.alphabet[i], location: i })

    }
}

const newGame = function () {
    wheelInit()
    initInfo.step = 0
    initInfo.result = []
}




</script>

<style lang="less" scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.circle {
    margin-bottom: 3rem;
    position: relative;
    width: 250px;
    height: 250px;
    background-color: rgb(245, 200, 100);
    border-radius: 50%;
    padding: 0.5rem;

    .arrow {
        z-index: 9999;
        position: absolute;
        left: 50%;
        top: 35%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 80px;
    }

    .list {
        position: absolute;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transition: transform 0.5s ease;
        font-size: 2rem;
        font-weight: bold;
    }
}
.selectArea {
    div {
        margin: 1rem;
        button {
            margin-left: 1rem;
            width: 4rem;
            height: 2rem;
        }
    }
}
.result {
    h2 {
        margin: 0px;
        padding: 0px;
    }
}
</style>