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
          :department-name="departament.name"
          :card-id="employee.cardId"
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
import { io } from "socket.io-client";
import { Notify } from "quasar";

const socket = io("https://youaccess-backend-0388e95e5b0d.herokuapp.com");

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("unassignedCard", (data) => {
  console.log(data);
  const { card } = data;
  const { cardId } = card;
  notify(
    `Alguien esta intentando usar la tarjeta con codigo: ${cardId}, que no esta asignada`,
    "negative"
  );
});

socket.on("assistance", (data) => {
  const employee = workpeoples.value.find((emp) => emp._id === data.user._id);
  const { user } = data;
  const { card } = data;
  if (employee) {
    employee.isPresent = data.user.isPresent;
    notify(
      `El empledo ${user.name} ${user.lastName} con tarjeta ${card.cardId} ${
        data.user.isPresent ? "entro a la empresa" : "salio de la empresa"
      }`,
      "secondary"
    );
  } else {
    console.log("Empleado no encontrado");
  }
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

const route = useRoute();
const departamentId = ref("");
const workpeoples = ref([]);
const nameSearch = ref("");
const departament = ref([]);

onMounted(() => {
  // Obtiene el id del departamento que se paso en la ruta
  departamentId.value = route.params.id;

  api
    .get(`/api/department/${departamentId.value}`, {
      withCredentials: true,
    })
    .then((response) => {
      departament.value = response.data;
      workpeoples.value = response.data.employees;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const iconsNames = [{ name: "description", function: "report" }];

const presents = computed(() => {
  let count = 0;
  workpeoples.value.forEach((item) => {
    if (item.isPresent) {
      return count++;
    }
  });
  return count;
});

const absent = computed(() => totalWorkPeople.value - presents.value);

const totalWorkPeople = computed(() => {
  // devuelve el total de empleados en un depto
  return workpeoples.value.length;
});

const searchEmployee = computed(() => {
  // Busca un empleado por su nombre completo (nombre y apellido)
  if (!nameSearch.value) return workpeoples.value;
  return workpeoples.value.filter((empleado) => {
    const fullName = `${empleado.name.toLowerCase()} ${empleado.lastName.toLowerCase()}`;
    return fullName.includes(nameSearch.value.toLowerCase());
  });
});

const notify = (message, color) => {
  Notify.create({
    message,
    color,
    position: "top-right",
    timeout: 5000,
  });
};
</script>

<style scoped></style>
