import { createApp } from "vue";
import routers from "./router";
import App from "./App.vue";

createApp(App).use(routers).mount("#app");
