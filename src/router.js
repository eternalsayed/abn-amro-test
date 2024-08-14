import { createRouter, createWebHistory } from "@ionic/vue-router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard/:genre?",
    name: "Dashboard",
    component: () => import("./pages/TvDashboard.vue"),
  },
  {
    path: "/shows/detail/:id",
    name: "ShowDetail",
    component: () => import("./pages/ShowDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
