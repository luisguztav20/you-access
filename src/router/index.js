import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { getRoleFromToken } from "../utils/tokenUtils";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    history: createWebHistory(),
    routes, // Aquí `routes` debe ser un array
  });

  // Middleware global para proteger rutas
  Router.beforeEach((to, from, next) => {
    const role = getRoleFromToken();
    const requiredRole = to.meta.requiresRole;

    if (requiredRole && role !== requiredRole) {
      if (!role) {
        return next("/login");
      } else {
        return next("/");
      }
    }

    next();
  });

  return Router;
});
