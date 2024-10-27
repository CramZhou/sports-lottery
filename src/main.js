import { Lazyload } from "vant";
import App from "@/App.vue";
import routers from "@/routers";
import * as GlobalComponents from "@/components";

import "normalize.css";
import "@/assets/styles/main.scss";

import "@/utils/fastClick";
import "@/utils/forcedLandscape";
// import "@/service/permission";

// vant 函数组件样式
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "vant/es/notify/style";
import "vant/es/image-preview/style";

("@/utils/forcedLandscape");

const app = createApp(App);
const store = createPinia();

// 注册全局组件
// eslint-disable-next-line no-restricted-syntax
for (const [key, com] of Object.entries(GlobalComponents)) {
  app.component(key, com);
}

app.use(store);
app.use(routers);
app.use(Lazyload, { lazyComponent: true });

app.mount("#app");
