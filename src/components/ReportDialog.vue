<template>
  <q-dialog v-model="localDialog">
    <q-card class="full-screen" style="max-width: 1200px; border-radius: 15px">
      <q-card-section class="row items-center q-pb-none">
        <h2 class="text-h6">Reporte de asientencias</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator class="q-mx-lg" />
      <q-card-section
        class="column justify-between items-start q-pb-none q-px-lg"
      >
        <h3 class="text-h6 q-ma-none text-primary">ID: {{ employeeId }}</h3>
        <h4 class="text-h6 q-ma-none text-primary">
          {{ employeeName }}
        </h4>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section class="q-px-lg">
        <q-input
          v-model="date"
          outlined
          type="date"
          label="Fecha inicial"
          class="q-py-md full-width"
          :error="errorDate"
          :error-message="errorMessageDate"
          @blur="validateDate"
        />
        <q-input
          v-model="dateEnd"
          outlined
          type="date"
          label="Fecha final"
          class="q-py-md full-width"
          @blur="validateDate"
        />
        <q-btn
          color="primary"
          icon="description"
          label="Consultar asistencia"
          class="q-my-md"
          @click="onClick"
        />
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section>
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
          <q-btn
            color="primary"
            icon="picture_as_pdf"
            label="Generar reporte"
            class="q-my-md"
            @click="onClick"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Boolean,
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const localDialog = ref(props.modelValue);

const date = ref("");
const dateEnd = ref("");
const errorDate = ref(false);
const errorMessageDate = ref("Campo vacío");

// Funciones de validación
const validateDate = () => {
  errorDate.value = date.value === "";
};

// Llamada al hacer clic en el botón "Marcar asistencia"
const onClick = () => {
  validateDate();
  if (!errorDate.value) {
    //Funciones cuando no hay campos vacios
    date.value = "";
    localDialog.value = false;
  }
};

// Emitir el evento para actualizar el valor en el componente padre
watch(localDialog, (newValue) => {
  emit("update:modelValue", newValue);

  // Reinicia los valores de los inputs si el diálogo se cierra
  if (!newValue) {
    resetFields();
  }
});

// Sincronizar cambios cuando la prop `modelValue` cambie desde el padre
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Función para reiniciar los valores de los inputs
const resetFields = () => {
  date.value = "";
  errorDate.value = false;
};

const columns = [
  { name: "index", label: "#", field: "index" },
  {
    name: "id",
    label: "ID",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "nombre", label: "Nombre", field: "nombre" },
  { name: "fecha", label: "Fecha", field: "fecha" },
  { name: "entrada", label: "Hora entrada", field: "entrada", sortable: true },
  { name: "salida", label: "Hora salida", field: "salida", sortable: true },
  { name: "retraso", label: "Retraso (horas)", field: "retraso" },
  { name: "extra", label: "Tiempo extra (horas)", field: "extra" },
  { name: "observacion", label: "Observaciones", field: "observacion" },
];

const rows = ref([
  {
    index: 1,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 2,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "2/5/2024",
    entrada: "7:05",
    salida: "17:00",
    retraso: "0:05",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
  },
  {
    index: 3,
    name: "ING00124",
    nombre: "Luis Gustavo Alfaro Mendoza",
    fecha: "1/5/2024",
    entrada: "7:00",
    salida: "17:00",
    retraso: "0:00",
    extra: "0:00",
    observacion: "",
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
