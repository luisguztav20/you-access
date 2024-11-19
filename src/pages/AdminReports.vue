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
            :options="departamentOptions"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Seleccione un departamento',
            ]"
            class="col-xs-12 col-sm-6"
          />
          <q-btn
            rounded
            type="submint"
            label="Buscar"
            color="primary"
            icon="search"
            class="q-mt-md"
            @click="validateAndSearch"
          />
          <q-btn
            outline
            rounded
            label="generar reporte"
            icon="picture_as_pdf"
            color="primary"
            class="q-mt-md"
            v-if="stateReports"
          />
          <q-btn
            flat
            rounded
            type="reset"
            label="limpiar datos"
            icon="delete"
            color="primary"
            class="q-mt-md"
            @click="clean"
            v-if="stateReports"
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
          v-if="stateReports"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { departaments } from "src/data/departaments";

// Variables reactivas
const startDate = ref(null);
const endDate = ref(null);
const selectedDepartment = ref(null); //v-model
const departamentOptions = ref([]); // lista de departamentos
const stateReports = ref(false);

onMounted(() => {
  departamentOptions.value = departaments.map((departamento) => ({
    label: departamento.title,
    value: departamento.title,
    key: departamento.name,
  }));
});

const onSubmit = () => {
  stateReports.value = true;
};

const onReset = () => {
  startDate.value = "";
  endDate.value = "";
  selectedDepartment.value = "";
  stateReports.value = false;
};

// Datos de la tabla
const rows = ref([
  {
    id: 1,
    nombre: "Juan Pérez",
    fecha: "22/05/2024",
    entrada: "07:00",
    salida: "17:00",
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    fecha: "22/05/2024",
    entrada: "07:00",
    salida: "17:00",
  },
]);

const columns = ref([
  { name: "id", label: "ID", align: "left", field: "id" },
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "fecha", label: "FECHA", align: "center", field: "fecha" },
  { name: "entrada", label: "HORA ENTRADA", align: "center", field: "entrada" },
  { name: "salida", label: "HORA SALIDA", align: "center", field: "salida" },
]);
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
