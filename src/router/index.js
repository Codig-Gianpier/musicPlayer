import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "buscador",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "buscador" */ "../views/Buscador.vue"),
  },
  {
    path: "/escuchar/:nombres",
    name: "escuchar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "escuchar" */ "../views/Reproductor.vue"),
  },
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
