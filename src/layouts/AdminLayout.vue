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
          icon="logout"
          label="Cerrar sesion"
          @click="onClick"
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

const linksList = [
  {
    title: "Departamentos",
    icon: "home",
    name: "admin",
  },
  {
    title: "Generar reportes",
    icon: "description",
    name: "reports",
  },
  {
    title: "Agregar empleado",
    icon: "add",
    name: "add",
  },
  {
    title: "Editar empleado",
    icon: "delete",
    name: "admin/edit-employee",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
