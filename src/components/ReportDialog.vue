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
import { api } from "src/boot/axios";

const props = defineProps({
  modelValue: Boolean,
  employee: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const localDialog = ref(props.modelValue);

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

const columns = ref([
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "email", label: "EMAIL", align: "left", field: "email" },
  { name: "entrada", label: "ENTRADA", align: "left", field: "entrada" },
  { name: "salida", label: "SALIDA", align: "left", field: "salida" },
]);

const rows = ref([
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
  {
    nombre: "Nombre",
    email: "Email",
    entrada: "Entrada",
    salida: "Salida",
  },
]);

const pagination = ref({
  sortBy: "nombre",
  descending: false,
  rowsPerPage: 5,
});

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
</script>

<style lang="scss" scoped>
.full-screen {
  width: 90%;
}
</style>
