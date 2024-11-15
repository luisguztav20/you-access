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
      <div class="row justify-center q-my-md">
        <div class="row col-11 justify-center">
          <CardDepartaments
            v-for="(departamento, key) in departamentos"
            :key="key"
            :departamento="departamento"
            @redireccion="redireccion(departamento.name)"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { departaments } from "../data/departaments";
import CardDepartaments from "../components/CardDepartaments.vue";

const departamentos = ref([]);
const router = useRouter();

onMounted(() => {
  departamentos.value = departaments;
});

function redireccion(nombre) {
  router.push(`/admin/manager/${nombre}`);
}
</script>
