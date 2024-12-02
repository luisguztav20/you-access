<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <div class="row q-ml-md">
          <img
            src="/src/assets/you-access-logo-01-white.svg"
            style="width: 125px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Drawer o menú lateral -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Administrar </q-item-label>

        <AdminManagerBar v-for="link in linksList" :key="link.title" :="link" />
      </q-list>
      <q-separator class="q-my-lg" />
      <div class="flex full-width justify-center q-my-lg">
        <q-btn
          color="primary"
          rounded
          icon="logout"
          label="Cerrar sesion"
          @click="logout"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import AdminManagerBar from "../components/AdminMangerBar.vue";

import { useRouter } from "vue-router";
import { Cookies } from "quasar";
import { Notify } from "quasar";

const router = useRouter();

const linksList = [
  {
    title: "Departamentos",
    icon: "home",
    name: "admin",
  },
  {
    title: "Todos los empleados",
    icon: "person",
    name: "admin/all-employees",
  },
  {
    title: "Ver asistencias",
    icon: "description",
    name: "admin/attendance-reports",
  },
  {
    title: "Agregar empleado a departamento",
    icon: "add",
    name: "admin/add-employee",
  },
  {
    title: "Ver tarjetas",
    icon: "credit_card",
    name: "admin/all-cards",
  },
  {
    title: "Asignar tarjeta",
    icon: "manage_accounts",
    name: "admin/edit-employee",
  },
];

const leftDrawerOpen = ref(false);

function logout() {
  Cookies.remove("x-token");
  Notify.create({
    message: "Sesion cerrada con exito",
    color: "primary",
    position: "top",
  });
  router.push("/");
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
