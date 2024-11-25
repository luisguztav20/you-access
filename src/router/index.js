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
    const role = getRoleFromToken(); // Obtén el rol del usuario desde el token
    const publicRoutes = to.meta.public || false; // Rutas públicas no requieren autenticación
    const requiredRole = to.meta.requiresRole; // Rol requerido por la ruta

    if (role) {
      // Si el usuario está autenticado y accede a una ruta pública, redirígelo según su rol
      if (publicRoutes) {
        if (role === "user") return next("/user");
        if (role === "admin") return next("/admin");
      }

      // Si la ruta tiene un rol requerido y el usuario no tiene el rol adecuado
      if (requiredRole && role !== requiredRole) {
        return next("/"); // Redirige a una página genérica o una de acceso denegado
      }
    } else {
      // Si no está autenticado y la ruta no es pública, redirige a login
      if (!publicRoutes) return next("/");
    }

    next(); // Permitir acceso si ninguna condición anterior bloquea
  });


  return Router;
});
