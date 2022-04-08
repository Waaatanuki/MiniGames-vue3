<template>
    <div class="theme-container">
        <div class="navbar">
            <img class="sidebar-button" src="../assets/sidebar_button.png" @click="changeShowSide" />
            <img src="../assets/logo.png" />
            <span class="site-name">MiniGames</span>
        </div>
        <aside class="sidebar" :class="showSide ? 'sidebar-open' : ''">
            <router-link class="sidebar-links" active-class="active" to="/">首页</router-link>
            <router-link class="sidebar-links" active-class="active" to="/ShortestPath">跑马</router-link>
            <router-link class="sidebar-links" active-class="active" to="/RotateSteps">转盘</router-link>
            <router-link class="sidebar-links" active-class="active" to="/MaxCoins">戳气球</router-link>
        </aside>
        <main class="page" @click="showSide = false">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';

let showSide = ref(false)


const changeShowSide = function () {
    showSide.value = !showSide.value
}

</script>

<style lang="less" scoped>
.navbar {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background-color: rgb(245, 200, 100);
    border-bottom: 1px solid #eaecef;
    display: flex;
    line-height: 3rem;
    .sidebar-button {
        cursor: pointer;
        height: 50%;
        padding-top: 0.8rem;
        padding-left: 0.8rem;
    }
    .site-name {
        font-size: 1.3rem;
        font-weight: 500;
        color: #1a2a3a;

        text-align: center;
    }
    img {
        height: 100%;
    }
}
.sidebar {
    font-size: 16px;
    background-color: rgb(245, 200, 100);
    width: 8rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
    .active {
        background-color: orange;
        border-radius: 10px;
    }
}
.page {
    padding-left: 8rem;
    padding-top: 3rem;
}

@media (max-width: 750px) {
    .page {
        padding-left: 0;
    }
    .sidebar {
        transform: translateX(-100%);
        transition: transform 0.5s ease;
    }
    .sidebar-button {
        display: block;
    }
}
@media (min-width: 750px) {
    .sidebar-button {
        display: none;
    }
}
aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sidebar-links {
        color: #1a2a3a;
        font-weight: bold;
        width: 100%;
        height: 1.7rem;
        line-height: 1.7rem;
        text-decoration: none;
    }
    .sidebar-links:hover {
        background-color: orange;
        border-radius: 10px;
    }
}
.sidebar-open {
    transform: translateX(0);
}
</style>