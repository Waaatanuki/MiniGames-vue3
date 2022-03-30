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
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
