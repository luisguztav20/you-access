<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row justify-between">
        <div class="row col-11 justify-center">
          <img
            src="/src/assets/you-access-logo-01-white.svg"
            style="width: 125px"
          />
        </div>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item v-if="user && user.position">
            <q-item-section avatar>
              <q-icon color="primary" name="engineering" />
            </q-item-section>

            <q-item-section class="text-weight-light">
              {{ user.position }}
            </q-item-section>
          </q-item>
          <q-item v-if="user && user.email">
            <q-item-section avatar>
              <q-icon color="primary" name="mail" />
            </q-item-section>

            <q-item-section class="text-weight-light">{{
              user.email
            }}</q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="work" />
            </q-item-section>

            <q-item-section class="text-weight-light">
              {{ user.department?.name || "Sin departamento" }}
            </q-item-section>
          </q-item>
          <q-item
            :class="{ 'bg-green': user.isPresent, 'bg-red': !user.isPresent }"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>
            <q-item-section class="text-weight-light">
              {{ user.isPresent ? "Presente" : "Ausente" }}
            </q-item-section>
          </q-item>
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
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://img.freepik.com/vector-gratis/fondo-degradado-oscuro-espacio-copia_53876-99548.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.name }} {{ user.lastName }}
          </div>
          <p>ID: {{ user._id }}</p>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Cookies } from "quasar";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
import { jwtDecode } from "jwt-decode";

const router = useRouter();
const drawer = ref(false);
const user = ref({
  name: "",
  lastName: "",
  email: "",
  position: "",
  isPresent: false,
  department: {
    name: "",
  },
});
const userId = ref(null);

onMounted(() => {
  const token = Cookies.get("x-token");
  if (token) {
    const decoded = jwtDecode(token);
    userId.value = decoded.id;
  }

  api
    .get(`/api/user/${userId.value}`, {
      withCredentials: true,
    })
    .then((response) => {
      user.value = response.data;
    })
    .catch((error) => {
      Notify.create({
        message: "Error al obtener los datos del usuario",
        color: "negative",
        position: "top",
      });
      console.log(error);
    });
});

function logout() {
  Cookies.remove("x-token");
  Notify.create({
    message: "Sesion cerrada con exito",
    color: "primary",
    position: "top",
  });
  router.push("/");
}
</script>
