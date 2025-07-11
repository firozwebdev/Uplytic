import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../pages/DashboardFull.vue";
import PublicDashboard from "../pages/PublicDashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/public/:uuid",
    name: "PublicDashboard",
    component: PublicDashboard,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
