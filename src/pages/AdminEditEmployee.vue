<template>
  <q-page padding>
    <section>
      <div class="row justify-center">
        <div class="column col-11">
          <div class="row q-my-sm justify-between items-center">
            <div class="column col-md-4">
              <h2 class="text-primary text-h5 text-bold q-mb-none">
                Asignar tarjeta de asisitencia
              </h2>
              <h3 class="text-h6 text-weight-light q-mt-md">Trabajadores sin tarjeta asignada</h3>
            </div>
            <searchEmployeeInput v-model="nameSearch" />
          </div>
          <q-separator class="q-mt-lg" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-md q-px-xl">
        <CardEmployee
          v-for="(employee, id) in searchEmployee"
          :key="id"
          :empleado="employee"
          :iconsNames="iconsNames"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import SearchEmployeeInput from "src/components/SearchEmployeeInput.vue";
import CardEmployee from "src/components/CardEmployee.vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const workpeoples = ref([]);
const nameSearch = ref("");
const iconsNames = [{ name: "credit_card", function: "edit" }];

onMounted(() => {
  api
    .get("/api/user/withoutNfcCard")
    .then((response) => {
      workpeoples.value = response.data;
      if (workpeoples.value.length === 0) {
        Notify.create({
          message: "No hay trabajadores para asignar tarjeta",
          color: "negative",
          position: "center",
          timeout: 5000,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const searchEmployee = computed(() => {
  if (!nameSearch.value) return workpeoples.value;
  return workpeoples.value.filter((empleado) => {
    const fullName = `${empleado.name.toLowerCase()} ${empleado.lastName.toLowerCase()}`;
    return fullName.includes(nameSearch.value.toLowerCase());
  });
});
</script>

<style lang="scss" scoped></style>
