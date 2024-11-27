<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card class="q-pa-lg" style="border-radius: 15px">
        <!-- Encabezado -->
        <div class="text-h5 text-center q-mb-md text-primary q-mb-xl">
          Reporte de asistencia
        </div>

        <!-- Filtros de búsqueda -->
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            outlined
            label="Fecha inicial"
            type="date"
            v-model="startDate"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Ingrese una fecha inicial',
            ]"
            class="col-xs-12 col-sm-6"
          />
          <q-input
            outlined
            label="Fecha final"
            type="date"
            v-model="endDate"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Ingrese una fecha final',
            ]"
            class="col-xs-12 col-sm-6"
          />
          <q-select
            outlined
            label="Departamento"
            v-model="selectedDepartment"
            :options="departamentsOptions"
            class="col-xs-12 col-sm-6"
          />
          <q-btn
            rounded
            type="submint"
            label="Buscar"
            color="primary"
            icon="search"
            class="q-mt-md"
          />
          <q-btn
            outline
            rounded
            label="generar reporte"
            icon="picture_as_pdf"
            color="primary"
            class="q-mt-md"
          />
          <q-btn
            flat
            rounded
            type="reset"
            label="limpiar datos"
            icon="delete"
            color="primary"
            class="q-mt-md"
          />
        </q-form>

        <!-- Tabla -->
        <q-separator class="q-my-lg" />
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          class="q-mt-md"
          flat
          bordered
        />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const notify = (message, color) => {
  Notify.create({
    message,
    color,
    position: "top-right",
    timeout: 5000,
  });
};

// Variables reactivas
const startDate = ref(null);
const endDate = ref(null);
const departamentsOptions = ref([]);
const selectedDepartment = ref(null);
const departament = ref([]);
const stateReports = ref(true);

// Datos de la tabla
const rows = ref([]);

const columns = ref([
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "entrada", label: "ENTRADA", align: "center", field: "entrada" },
  { name: "salida", label: "SALIDA", align: "center", field: "salida" },
]);

onMounted(() => {
  api
    .get("/api/department", {
      withCredentials: true,
    })
    .then((response) => {
      departament.value = response.data;
      departamentsOptions.value = departament.value.map((departamento) => ({
        label: departamento.name,
        value: departamento._id,
        key: departamento._id,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
});

const onSubmit = () => {
  console.log(`Start date: ${startDate.value} - End date: ${endDate.value}`);
  api
    .get("/api/attendance/date-range", {
      params: {
        startDate: startDate.value,
        endDate: endDate.value,
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      rows.value = response.data.map((item) => ({
        nombre: `${item.userId.name} ${item.userId.lastName}`,
        entrada: formatDate(item.checkIn),
        salida: formatDate(item.checkOut),
      }));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        notify("No hay registros de asistencia", "negative");
      }
      console.log(error);
    });
};

const formatDate = (date) => {
  if (!date) return "Sin marcar";
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const onReset = () => {
  startDate.value = "";
  endDate.value = "";
  selectedDepartment.value = "";
  stateReports.value = false;
};
</script>

<style scoped>
.q-card {
  max-width: 1000px;
  margin: 0 auto;
}
.text-h5 {
  font-weight: bold;
}
</style>
