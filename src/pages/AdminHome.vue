<template>
  <q-page padding>
    <section>
      <div class="row justify-center">
        <div class="column col-11">
          <h2 class="text-primary text-h5 text-bold q-mb-none">
            Departamentos
          </h2>
          <h3 class="text-h6 text-weight-light q-mt-none">
            Grupos de asistencia
          </h3>
          <q-separator />
        </div>
      </div>
      <div class="row q-col-gutter-md q-my-md q-px-xl">
        <CardDepartaments
          v-for="(departamento, key) in departamentos"
          :key="departamento._id"
          :departamento="departamento"
          @redireccion="redireccion(departamento._id, key)"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { departaments } from "../data/departaments";
import CardDepartaments from "../components/CardDepartaments.vue";
import { api } from "src/boot/axios";

const departamentos = ref([]);
const router = useRouter();

onMounted(() => {
  api
    .get("/api/department", {
      withCredentials: true,
    })
    .then((response) => {
      departamentos.value = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  // departamentos.value = departaments;
});

function redireccion(nombre) {
  router.push(`/admin/manager/${nombre}`);
}
</script>
