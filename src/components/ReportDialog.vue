<template>
  <q-dialog v-model="localDialog">
    <q-card class="full-screen" style="max-width: 800px; border-radius: 15px">
      <q-card-section class="row items-center q-pb-none">
        <h2 class="text-h6">Asientencias</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator class="q-mx-lg" />
      <q-card-section
        class="column justify-between items-start q-pb-none q-px-lg"
      >
        <h3 class="text-h6 q-ma-none text-primary">ID: {{ employee._id }}</h3>
        <h3 class="text-h6 q-ma-none text-primary">
          {{ employee.name }} {{ employee.lastName }}
        </h3>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section class="q-px-lg">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="date"
            outlined
            type="date"
            label="Fecha inicial"
            class="q-py-md full-width"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Ingrese una fecha inicial',
            ]"
          />
          <q-input
            v-model="dateEnd"
            outlined
            type="date"
            label="Fecha final"
            class="q-py-md full-width"
          />

          <div class="row items-center q-gutter-x-lg">
            <q-btn
              color="primary"
              rounded
              icon="description"
              label="Consultar"
              class="q-my-sm col-11 col-md-3"
              type="submit"
            />
            <q-btn
              outline
              rounded
              v-if="stateReport"
              color="primary"
              icon="picture_as_pdf"
              label="Generar reporte"
              class="col-11 col-md-3"
            />
            <q-btn
              flat
              rounded
              v-if="stateReport"
              color="primary"
              icon="delete"
              label="Limpiar datos"
              type="reset"
              class="col-11 col-md-3"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section v-if="stateReport">
        <div class="q-pa-md">
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
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar"; // Importar Notify de Quasar

import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  employee: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const localDialog = ref(props.modelValue);

const date = ref("");
const dateEnd = ref("");
const stateReport = ref(false);

const notifyPosivite = (message) => {
  Notify.create({
    message: message,
    type: "positive",
    position: "bottom",
    timeout: 2000,
  });
};

const onSubmit = () => {
  notifyPosivite("Datos enviados");
  stateReport.value = true;
};

const onReset = () => {
  date.value = null;
  dateEnd.value = null;
  stateReport.value = false;
};

// Emitir el evento para actualizar el valor en el componente padre
watch(localDialog, (newValue) => {
  emit("update:modelValue", newValue);
});

// Sincronizar cambios cuando la prop `modelValue` cambie desde el padre
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

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

<style lang="scss" scoped>
.full-screen {
  width: 90%;
}
</style>
