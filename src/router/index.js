import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { ClothesStore } from "@/stores/wordRobe";

// const userStore = ClothesStore();

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },

  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: () => import("../views/401Error.vue"),
  },
  {
    path: "/wardrobe",
    name: "wardrobe",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   console.log("Checking auth for route:", to.name);
    //   const isLoggedIn = userStore.isLoggeInd;

    //   if (!isLoggedIn) {
    //     next({ name: "NotAuthorized" });
    //   } else {
    //     next();
    //   }
    // },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const clothesStore = ClothesStore();
  const isLoggedIn = clothesStore.isLoggeInd;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "NotAuthorized" });
  } else {
    next();
  }
});

export default router;
