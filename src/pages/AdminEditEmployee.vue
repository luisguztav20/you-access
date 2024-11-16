<template>
  <q-page padding>
    <section>
      <div class="row justify-center">
        <div class="column col-11">
          <div class="row q-my-sm justify-between items-center">
            <div class="column col-md-4">
              <h2 class="text-primary text-h5 text-bold q-mb-none">
                Empleados
              </h2>
              <h3 class="text-h6 text-weight-light q-mt-none">
                Mienbros del deparatamento
              </h3>
            </div>
            <searchEmployeeInput v-model="nameSearch" />
          </div>
          <q-separator class="q-mt-lg" />
        </div>
      </div>

      <div class="row justify-center q-my-lg">
        <div class="row col-11 justify-center">
          <CardEmployee
            v-for="(employee, id) in searchEmployee"
            :key="id"
            :empleado="employee"
            :iconsNames="iconsNames"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { workpeople } from "src/data/workpeople";
import SearchEmployeeInput from "src/components/SearchEmployeeInput.vue";
import CardEmployee from "src/components/CardEmployee.vue";

const workpeoples = ref([]);
const nameSearch = ref("");
const ediDialog = ref(false);
const deleteDialog = ref(false);
const iconsNames = [
  { name: "edit", function: "edit", open: () => !ediDialog.value },
  { name: "delete", function: "delete", open: () => !deleteDialog.value },
];

onMounted(() => {
  workpeoples.value = workpeople;
});

const searchEmployee = computed(() => {
  //Busca un empleado por su id
  if (!nameSearch.value) return workpeoples.value;
  return workpeoples.value.filter((empleado) =>
    empleado.id.toLowerCase().includes(nameSearch.value.toLowerCase())
  );
});
</script>

<style lang="scss" scoped></style>
