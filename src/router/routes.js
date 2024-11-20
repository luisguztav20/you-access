const routes = [
  {
    path: "/user",
    component: () => import("src/layouts/UserLayout.vue"),
    meta: { requiresRole: "user" }, // Solo accesible para 'user'
    children: [{ path: "", component: () => import("src/pages/UserHome.vue") }],
  },
  {
    path: "/admin",
    component: () => import("src/layouts/AdminLayout.vue"),
    meta: { requiresRole: "admin" }, // Solo accesible para 'admin'
    children: [
      { path: "", component: () => import("src/pages/AdminHome.vue") },
      {
        path: "manager/:id",
        component: () => import("src/pages/AdminManager.vue"),
      },

      {
        path: "edit-employee",
        component: () => import("src/pages/AdminEditEmployee.vue"),
      },
      {
        path: "reports",
        component: () => import("src/pages/AdminReports.vue"),
      },
      {
        path: "add-employee",
        component: () => import("src/pages/AdminAddEmployee.vue"),
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
