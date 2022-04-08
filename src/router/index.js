import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../pages/HomePage.vue"),
    },
    {
        path: "/ShortestPath",
        component: () => import("../pages/ShortestPath.vue"),
    },
    {
        path: "/RotateSteps",
        component: () => import("../pages/RotateSteps.vue"),
    },
    {
        path: "/MaxCoins",
        component: () => import("../pages/MaxCoins.vue"),
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
