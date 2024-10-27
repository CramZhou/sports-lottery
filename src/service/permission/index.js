import routers from "@/routers";
import { getToken } from "./auth";

const whiteList = ["/login"];

// routers.beforeEach((to, from, next) => {
//   if (getToken()) {
//     // 1、有权限
//     next();
//   } else if (whiteList.includes(to.path)) {
//     // 3、无权限、重定向到白名单，可以进入，防止死循环
//     next();
//   } else {
//     // 2、无权限的时候跳转login
//     next("/login");
//   }
// });
