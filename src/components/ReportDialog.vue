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
          <!-- <q-input
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
          /> -->

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
              @click="onGenerateReport"
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
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  { index: "index", label: "#", align: "left", field: "index", sortable: true },
  { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
  { name: "email", label: "EMAIL", align: "left", field: "email" },
  {
    name: "entrada",
    label: "ENTRADA",
    align: "left",
    field: "entrada",
    sortable: true,
  },
  { name: "salida", label: "SALIDA", align: "left", field: "salida" },
]);

const rows = ref([]);

const pagination = ref({
  sortBy: "entrada",
  descending: true,
  rowsPerPage: 10,
});

const stateReport = ref(false);

const notify = (message, color) => {
  Notify.create({
    message,
    color,
    position: "top",
    timeout: 2000,
  });
};

const onSubmit = () => {
  api
    .get(`/api/attendance/user/${props.employee._id}`)
    .then((response) => {
      if (response.status === 200) {
        rows.value = response.data.map((item, index) => ({
          index: index + 1,
          nombre: `${item.userId.name} ${item.userId.lastName}`,
          email: `${item.userId.email}`,
          entrada: formatDate(item.checkIn),
          salida: formatDate(item.checkOut),
        }));
        stateReport.value = true;
      }
    })
    .catch((error) => {
      if (error.status === 404) {
        notify("No se encontraron registros", "negative");
      }
      console.error(error);
    });
};

const onGenerateReport = () => {
  const date = new Date();
  const doc = new jsPDF();

  doc.addImage(
    "https://res.cloudinary.com/dxn123hvx/image/upload/v1731063325/you-access_ecs6eq.png",
    "PNG",
    14,
    10,
    15,
    15
  );

  doc.setFontSize(18);
  doc.setTextColor(22, 50, 91);
  doc.text("Reporte de Asistencias - YouAccess", 35, 20);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `Asistencias del empleado ${props.employee.name} ${props.employee.lastName} - ${props.employee.email}`,
    14,
    35
  );

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generado el: ${date.toLocaleDateString()}`, 160, 8);

  doc.autoTable({
    startY: 45,
    head: [["#", "Nombre", "Email", "Entrada", "Salida"]],
    body: rows.value.map((row) => [
      row.index,
      row.nombre,
      row.email,
      row.entrada,
      row.salida,
    ]),
    headStyles: {
      fillColor: [22, 50, 91],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: [0, 0, 0],
    },
  });

  // Guardar el PDF con la fecha y hora actual en el nombre
  doc.save(
    `reporte_asistencias_${date.toISOString().slice(0, 10)}_${
      props.employee.name
    }-${props.employee.lastName}.pdf`
  );
};

const formatDate = (date) => {
  if (!date) return "Sin marcar";
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const onReset = () => {
  stateReport.value = false;
};
</script>

<style lang="scss" scoped>
.full-screen {
  width: 90%;
}
</style>
