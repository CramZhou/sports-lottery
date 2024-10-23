import { createRouter, createWebHistory } from "vue-router";
import home from "./home";
import login from "./login";

const baseRoutes = [...home, ...login];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
});
