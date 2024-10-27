import { createRouter, createWebHistory } from "vue-router";
import home from "./home";

const baseRoutes = [...home];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes
});
