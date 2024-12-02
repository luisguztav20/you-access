<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h5 text-center q-mb-md text-primary q-mb-xl">
        Reporte de asistencia
      </div>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="email"
        class="q-mt-md"
        flat
        bordered
        v-model:pagination="pagination"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { getIDFromToken } from "src/utils/token_id";

const columns = ref([
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

onMounted(() => {
  const id = getIDFromToken();

  api
    .get(`/api/attendance/user/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log("Respuesta de asistencias:", response);
        const data = response.data;
        if (data.length === 0) {
          notify("No se encontraron asistencias", "negative");
        } else {
          rows.value = data.map((item) => ({
            nombre: item.userId.name + " " + item.userId.lastName,
            email: item.userId.email,
            entrada: formatDate(item.checkIn),
            salida: formatDate(item.checkOut),
          }));
        }
      }
    })
    .catch((error) => {
      console.error("Error al obtener asistencias:", error);
      if (error.response.status === 404) {
        notify("No se encontraron asistencias", "negative");
      }
      notify("Error al obtener asistencias", "negative");
    });
});

const notify = (message, color) => {
  Notify.create({
    message: message,
    color: color,
    position: "top",
    timeout: 2000,
  });
};

const formatDate = (date) => {
  if (!date) return "Sin marcar";
  const newDate = new Date(date);
  return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
};

const pagination = ref({
  sortBy: "entrada",
  descending: true,
  page: 1,
  rowsPerPage: 15,
});
</script>

<style scoped></style>
