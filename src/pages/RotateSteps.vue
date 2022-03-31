<template>
    <div class="main">
        <div>
            <h1>密码</h1>
        </div>
        <div>
            <div class="circle">
                <div class="arrow">⬆</div>
                <div
                    class="list"
                    v-for="( value, key ) in obj"
                    :key="key"
                    :style="'transform:translate(-50%, -50%) rotateZ(' + 36 * (value - 1) + 'deg )'"
                >{{ key }}</div>
            </div>
        </div>
        <div class="selectArea">
            <div>
                <button @click="turn(-1)">逆时针</button>
                <button @click="turn(1)">顺时针</button>
            </div>
            <div>
                <button @click="demo">输入</button>
            </div>
        </div>
        <div>
            <h2>总步数：</h2>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
const ring = 'eagtyhdcvn'.toUpperCase()
const arr = reactive([...ring])
const obj = reactive({ a: 1, b: 2, c: 3, d: 4 })

const turn = function (direction) {
    for (const key in obj) {
        obj[key] += direction
    }
}

const demo = function () {
    console.log(123);
}

</script>

<style lang="less" scoped>
.main {
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.circle {
    margin-bottom: 3rem;
    position: relative;
    width: 300px;
    height: 300px;
    background-color: rgb(245, 200, 100);
    border-radius: 50%;
    padding: 20px;

    .arrow {
        z-index: 9999;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 100px;
        border-radius: 50%;
    }

    .list {
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transition: transform 0.5s ease;
    }
}
</style>