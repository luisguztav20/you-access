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
        path: "all-employees",
        component: () => import("src/pages/AllEmployees.vue"),
      },
      {
        path: "all-cards",
        component: () => import("src/pages/AllCards.vue"),
      },
      {
        path: "edit-employee",
        component: () => import("src/pages/AdminEditEmployee.vue"),
      },
      {
        path: "reports",
        component: () => import("src/pages/AttendanceReports.vue"),
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
    meta: { public: true }, // Ruta pública
  },
  {
    path: "/login",
    component: () => import("src/pages/LoginPage.vue"),
    meta: { public: true }, // Ruta pública
  },
  {
    path: "/signup",
    component: () => import("src/pages/SignupPage.vue"),
    meta: { public: true }, // Ruta pública
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { public: true }, // Ruta pública
  },
];

export default routes;
