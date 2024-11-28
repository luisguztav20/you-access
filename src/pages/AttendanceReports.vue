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
            class="col-xs-12 col-sm-6"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Ingrese una fecha inicial',
            ]"
            clearable
          />
          <q-input
            outlined
            label="Fecha final"
            type="date"
            v-model="endDate"
            :rules="[validateEndDate]"
            class="col-xs-12 col-sm-6"
            clearable
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
            v-if="stateReports"
            outline
            rounded
            label="generar reporte"
            icon="picture_as_pdf"
            color="primary"
            class="q-mt-md"
          />
          <q-btn
            v-if="stateReports"
            flat
            rounded
            type="reset"
            label="limpiar datos"
            icon="delete"
            color="primary"
            class="q-mt-md"
            @click="onReset"
          />
        </q-form>

        <!-- Tabla -->
        <q-separator class="q-my-lg" />
        <q-table
          v-if="stateReports"
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
const selectedDepartment = ref(null);
const departamentsOptions = ref([]);
const departament = ref([]);
const stateReports = ref(false);

// Datos de la tabla

const columns = ref([
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "email", label: "EMAIL", align: "left", field: "email" },
  { name: "entrada", label: "ENTRADA", align: "left", field: "entrada" },
  { name: "salida", label: "SALIDA", align: "left", field: "salida" },
]);

const rows = ref([]);

onMounted(() => {
  api
    .get("/api/department", {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        departament.value = response.data;
        departamentsOptions.value = departament.value.map((departamento) => ({
          label: departamento.name,
          value: departamento._id,
          key: departamento._id,
        }));
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.status === 404) {
        notify("No hay departamentos registrados", "negative");
      }
    });
});

const onSubmit = () => {
  // Si todos los campos están vacíos se buscaran todas las asistencias
  if (
    startDate.value === null &&
    endDate.value === null &&
    selectedDepartment.value === null
  ) {
    api
      .get(`/api/attendance/all`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("All data", response.data);
        const { attendances } = response.data;
        console.log(attendances);
        rows.value = attendances.map((item) => ({
          nombre: `${item.userId.name} ${item.userId.lastName}`,
          email: `${item.userId.email}`,
          entrada: formatDate(item.checkIn),
          salida: formatDate(item.checkOut),
        }));
      })
      .catch((error) => {
        if (error.status === 404) {
          notify("No hay registros de asistencia", "negative");
        }
        console.log(error);
      });
  }

  // Si se seleccionan fechas pero no departamento se buscaran las asistencias por el rango de fechas
  if (
    startDate.value != null &&
    endDate.value != null &&
    selectedDepartment.value === null
  ) {
    api
      .get("/api/attendance/date-range", {
        params: {
          startDate: startDate.value,
          endDate: endDate.value,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          notify(
            `Asistencias encontradas: ${response.data.length}`,
            "positive"
          );
          stateReports.value = true;
          rows.value = response.data.map((item) => ({
            nombre: `${item.userId.name} ${item.userId.lastName}`,
            email: `${item.userId.email}`,
            entrada: formatDate(item.checkIn),
            salida: formatDate(item.checkOut),
          }));
        }
        rows.value = response.data.map((item) => ({
          nombre: `${item.userId.name} ${item.userId.lastName}`,
          email: `${item.userId.email}`,
          entrada: formatDate(item.checkIn),
          salida: formatDate(item.checkOut),
        }));
      })
      .catch((error) => {
        if (error.status === 404) {
          notify("No hay registros de asistencia", "negative");
        }
        console.log(error);
      });
  }

  // Si se selecciona departamento pero no fechas se buscaran las asistencias por departamento
  if (
    startDate.value === null &&
    endDate.value === null &&
    selectedDepartment.value != null
  ) {
    api
      .get(`/api/attendance/department/${selectedDepartment.value.key}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const { attendances } = response.data;
          notify(`Asistencias encontradas: ${attendances.length}`, "positive");
          stateReports.value = true;
          rows.value = attendances.map((item) => ({
            nombre: `${item.userId.name} ${item.userId.lastName}`,
            email: `${item.userId.email}`,
            entrada: formatDate(item.checkIn),
            salida: formatDate(item.checkOut),
          }));
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          notify("No hay registros de asistencia", "negative");
        }
        console.log(error);
      });
  }
};

const validateEndDate = (val) => {
  const currentDate = new Date();
  const dateForValidation = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  console.log("Fecha actual", dateForValidation);
  if (startDate.value && (!val || val === "")) {
    return "Ingrese una fecha final";
  }
  if (val < startDate.value) {
    return "La fecha final no puede ser menor a la fecha inicial";
  }
  if (val > dateForValidation) {
    return `La fecha final no puede ser mayor a la fecha actual: ${currentDate}`;
  }
  return true;
};

const formatDate = (date) => {
  if (!date) return "Sin marcar";
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const onReset = () => {
  startDate.value = null;
  endDate.value = null;
  selectedDepartment.value = null;
  rows.value = [];
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
