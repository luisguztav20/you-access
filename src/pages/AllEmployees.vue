<template>
  <q-page padding>
    <section>
      <div class="row justify-center">
        <div class="column col-11">
          <div class="row q-my-sm justify-between items-center">
            <div class="column col-md-4">
              <h2 class="text-primary text-h5 text-bold q-mb-none">
                {{ departament.name }}
              </h2>
              <h3 class="text-h6 text-weight-light q-mt-none">
                Todos los empleados
              </h3>
            </div>
            <searchEmployeeInput v-model="nameSearch" />
          </div>

          <CrontrolEmployeeBarVue
            :totalWorkPeople="totalWorkPeople"
            :absent="absent"
            :presents="presents"
          />
          <q-separator class="q-mt-lg" />
        </div>
      </div>

      <div class="row q-col-gutter-md q-py-md q-px-xl">
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
import { useRoute } from "vue-router";
import CardEmployee from "../components/CardEmployee.vue";
import CrontrolEmployeeBarVue from "src/components/CrontrolEmployeeBar.vue";
import searchEmployeeInput from "../components/SearchEmployeeInput.vue";
import { api } from "src/boot/axios";

const route = useRoute();
const departamentId = ref("");
const workpeoples = ref([]);
const nameSearch = ref("");
const departament = ref([]);
const nameDepartament = ref();
const keyDepartament = ref();

onMounted(() => {
  departamentId.value = route.params.id;
  api
    .get("/api/user", {
      withCredentials: true,
    })
    .then((response) => {
      workpeoples.value = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const iconsNames = [{ name: "description", function: "report" }];

const workpeoplesFilter = computed(() => {
  return workpeoples.value.filter(
    (employee) => employee.departament === keyDepartament.value
  );
});

const presents = computed(() => {
  let count = 0;
  workpeoplesFilter.value.forEach((item) => {
    if (item.isPresent) {
      return count++;
    }
  });
  return count;
});

const absent = computed(() => totalWorkPeople.value - presents.value);

const totalWorkPeople = computed(() => {
  return workpeoplesFilter.value.length;
});

const searchEmployee = computed(() => {
  if (!nameSearch.value) return workpeoplesFilter.value;
  return workpeoplesFilter.value.filter((empleado) => {
    const fullName = `${empleado.name.toLowerCase()} ${empleado.lastName.toLowerCase()}`;
    return fullName.includes(nameSearch.value.toLowerCase());
  });
});

const searchDepartament = computed(() => {
  return departament.value.filter((departamento) =>
    departamento.name.includes(departamentId.value)
  );
});
</script>

<style scoped></style>
