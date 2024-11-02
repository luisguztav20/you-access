<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="column col-11">
        <h2 class="text-primary text-h5 text-bold q-mb-none">Departamentos</h2>
        <h3 class="text-h6 text-weight-light q-mt-none">
          Grupos de asistencia
        </h3>
      </div>
    </div>
    <div class="row justify-center">
      <div class="row col-11 justify-center">
        <q-card
          v-for="(departamento, key) in departamentos"
          :key="key"
          class="my-card card-mod cursor-pointer q-mt-lg q-mr-lg"
          @click="redireccion(departamento.name)"
        >
          <img class="card-img" src="/src/assets/card-image.webp" />

          <q-card-section>
            <h3 class="text-subtitle1 q-ma-none q-pb-md text-weight-regular">
              {{ departamento.name }}
            </h3>
            <q-btn
              color="primary"
              label="Gestionar"
              @click="onClick"
              rounded
              to="/admin/manager"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const departamentos = ref([
  { name: "Depto. Ingenieria" },
  { name: "Depto. Contablidad" },
  { name: "Depto. Recursos humanos" },
  { name: "Depto. IT" },
  { name: "Depto. Produccion" },
  { name: "Depto. Mantnimiento" },
  { name: "Depto. Gestion y administracion dcnljndclmd;mc;smd;cos" },
]);

const router = useRouter();

function redireccion(nombre) {
  // router.push("/admin/manager");
  router.push(`/admin/manager/${nombre}`);
}
</script>

<style scoped>
.card-mod {
  border-radius: 15px;
  max-width: 300px;
}

.card-img {
  width: 300px;
  height: 200px;
}
</style>
