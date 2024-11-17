const routes = [
  {
    path: "/user",
    component: () => import("src/layouts/UserLayout.vue"),
    children: [
      { path: "home", component: () => import("src/pages/UserHome.vue") },
      { path: "logout", component: () => import("src/pages/UserPerfil.vue") },
    ],
  },
  {
    path: "/admin",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/AdminHome.vue") },
      {
        path: "manager/:departamento",
        component: () => import("src/pages/AdminManager.vue"),
      },
      {
        path: "logout",
        component: () => import("src/pages/AdminLogOut.vue"),
      },
      {
        path: "edit-employee",
        component: () => import("src/pages/AdminEditEmployee.vue"),
      },
      {
        path: "reports",
        component: () => import("src/pages/AdminReports.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("src/pages/WelcomPage.vue"),
  },
  {
    path: "/login",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/signup",
    component: () => import("src/pages/SignupPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
