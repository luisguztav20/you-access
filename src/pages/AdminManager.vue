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
                Mienbros del departamento
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
import { workpeople } from "../data/workpeople";
import CardEmployee from "../components/CardEmployee.vue";
import { departaments } from "src/data/departaments";
import CrontrolEmployeeBarVue from "src/components/CrontrolEmployeeBar.vue";
import searchEmployeeInput from "../components/SearchEmployeeInput.vue";
import { api } from "src/boot/axios";

const ruta = useRoute();
const departamentId = ref("");
const workpeoples = ref([]);
const nameSearch = ref("");
const departament = ref([]);
const nameDepartament = ref();
const keyDepartament = ref();

onMounted(() => {
  departamentId.value = ruta.params.id; // Recibe el id del departamento mediante la ruta
  // workpeoples.value = workpeople; // Almacenamos la data de los trabajadores en local
  // departament.value = departaments; // Almacena la data de los departamentos en local
  // nameDepartament.value = searchDepartament.value[0].title; //extrae el nombre del departamento
  // keyDepartament.value = searchDepartament.value[0].name; // extrae la key para identicar el depto

  api
    .get(`/api/department/${departamentId.value}`, {
      withCredentials: true,
    })
    .then((response) => {
      departament.value = response.data;
      workpeoples.value = response.data.employees;
      console.log(response.data);
      console.log(`Empleados en ${departament.value.name}:`, workpeoples.value);
    })
    .catch((error) => {
      console.log(error);
    });
});

// const iconsNames = ["how_to_reg", "exit_to_app", "info"]; //iconos para el card de empleados

const iconsNames = [{ name: "description", function: "report" }];

const workpeoplesFilter = computed(() => {
  // Filtra a los empleados de cada depto dependiento del parametro recibido en la ruta
  return workpeoples.value.filter(
    (employee) => employee.departament === keyDepartament.value
  );
});

// Control de asistencia de empleados

const presents = computed(() => {
  // Hace un conteo de los trabajadores presentes
  let count = 0;
  workpeoplesFilter.value.forEach((item) => {
    if (item.isPresent) {
      return count++;
    }
  });
  return count;
});

const absent = computed(() => totalWorkPeople.value - presents.value); // hace un conteo de los ausentes

const totalWorkPeople = computed(() => {
  // devuelve el total de empleados en un depto
  return workpeoplesFilter.value.length;
});

const searchEmployee = computed(() => {
  // Busca un empleado por su nombre completo (nombre y apellido)
  if (!nameSearch.value) return workpeoplesFilter.value;
  return workpeoplesFilter.value.filter((empleado) => {
    const fullName = `${empleado.name.toLowerCase()} ${empleado.lastName.toLowerCase()}`;
    return (
      empleado.name.toLowerCase().includes(nameSearch.value.toLowerCase()) ||
      empleado.lastName
        .toLowerCase()
        .includes(nameSearch.value.toLowerCase()) ||
      fullName.includes(nameSearch.value.toLowerCase())
    );
  });
});

const searchDepartament = computed(() => {
  // Devuelve el nombre del departamento segun el id que se paso en la ruta
  return departament.value.filter((departamento) =>
    departamento.name.includes(departamentId.value)
  );
});
</script>

<style scoped></style>
