import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import HeroRoster from "../views/HeroRoster.vue";
import CreateHero from "../views/CreateHero.vue";
import UpdateHero from "../views/UpdateHero.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/heroes",
      name: "heroes",
      component: HeroRoster,
    },
    {
      path: "/create",
      name: "create",
      component: CreateHero,
    },
    {
      path: "/update/:name",
      name: "update",
      component: UpdateHero,
    },
  ],
});

export default router;
