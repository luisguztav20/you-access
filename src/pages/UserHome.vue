<template>
  <div class="row justify-center">
    <div class="col-11 col-md-10 col-lg-8">
      <h4 class="text-primary text-bold mb-2">Mis asistencias</h4>

      <h7 class="text-center my-subtitle">Filtrar asistencias</h7>

      <div class="row items-center">
        <div class="row items-center col-12 col-md-12">
          <q-input
            v-model="date"
            outlined
            type="date"
            label="Fecha inicial"
            class="q-py-md col-12 col-md-5 q-mr-md"
            :error="errorDate"
            :error-message="errorMessageDate"
            @blur="validateDate"
          />
          <q-input
            v-model="dateEnd"
            outlined
            type="date"
            label="Fecha final"
            class="q-py-md col-12 col-md-5"
            @blur="validateDate"
          />
        </div>

        <q-btn
          color="primary"
          rounded
          icon="description"
          label="Consultar"
          class="q-my-md col-12 col-sm-4 col-md-3 q-mr-md"
          @click="showReports"
        />
        <q-btn
          v-if="stateReport"
          outline
          color="primary"
          rounded
          label="limpar datos"
          class="q-my-md col-12 col-sm-4 col-md-3"
          @click="clear"
        />
      </div>

      <div v-if="stateReport">
        <q-separator class="q-mt-md" />
        <q-card class="my-card col-12 q-my-md" flat bordered>
          <q-card-section>
            <q-table
              style="max-height: 400px"
              flat
              bordered
              :rows="rows"
              :columns="columns"
              row-key="index"
              virtual-scroll
              v-model:pagination="pagination"
              :rows-per-page-options="[0]"
            />
          </q-card-section>
          <q-separator />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref("");
const dateEnd = ref("");
const errorDate = ref(false);
const errorMessageDate = ref("Campo vacío");
const stateReport = ref(false);

// Funciones de validación
const validateDate = () => {
  errorDate.value = date.value === "";
};
// Llamada al hacer clic en el botón "Marcar asistencia"
const showReports = () => {
  validateDate();
  if (!errorDate.value) {
    //Funciones cuando no hay campos vacios

    stateReport.value = true;
  }
};

function clear() {
  stateReport.value = false;
  date.value = "";
  dateEnd.value = "";
}
const columns = [
  {
    name: "id",
    label: "ID",
    field: (row) => row.name,
    format: (val) => `${val}`,
    align: "left",
    sortable: true,
  },
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "fecha", label: "FECHA", align: "left", field: "fecha" },
  {
    name: "entrada",
    label: "HORA ENTRADA",
    align: "center",
    field: "entrada",
    sortable: true,
  },
  {
    name: "salida",
    label: "HORA SALIDA",
    align: "center",
    field: "salida",
    sortable: true,
  },
];

const rows = ref([
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "2/5/2024",
    entrada: "7:05",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
  {
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
  },
]);

const pagination = ref({
  rowsPerPage: 0, // Todas las filas visibles
});
</script>

<style scoped></style>
