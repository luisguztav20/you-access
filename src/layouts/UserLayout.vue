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
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="engineering" />
            </q-item-section>

            <q-item-section class="text-weight-light">
              Ingeniero
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="mail" />
            </q-item-section>

            <q-item-section class="text-weight-light"
              >luizzmendozza1904@gmail.com</q-item-section
            >
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="call" />
            </q-item-section>

            <q-item-section class="text-weight-light">
              +503 7370 6247
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="primary" name="work" />
            </q-item-section>

            <q-item-section class="text-weight-light">
              Ingenieria
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
            @click="onClick"
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
          <div class="text-weight-bold">Nombre del usuario</div>
          <p>ID: id ususario</p>
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
import { workpeople } from "src/data/workpeople";

onMounted(() => {
  employee.value = workpeople;
});

const employee = ref(null);

const drawer = ref(false);
</script>
