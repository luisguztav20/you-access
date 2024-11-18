<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-card class="q-pa-lg">
        <!-- Encabezado -->
        <div class="text-h5 text-center q-mb-md">GENERAR REPORTE</div>

        <!-- Filtros de búsqueda -->
        <div class="q-gutter-md q-mb-md">
          <q-input
            filled
            label="Fecha inicial"
            type="date"
            v-model="startDate"
            :error="startDateError"
            error-message="La fecha inicial es obligatoria"
            class="col-xs-12 col-sm-6"
          />
          <q-input
            filled
            label="Fecha final"
            type="date"
            v-model="endDate"
            :error="endDateError"
            error-message="La fecha final es obligatoria"
            class="col-xs-12 col-sm-6"
          />
          <q-select
            filled
            label="Departamento"
            v-model="selectedDepartment"
            :options="departments"
            :error="selectedDepartmentError"
            error-message="El departamento es obligatorio"
            class="col-xs-12 col-sm-6"
          />
          <q-btn
            label="Buscar"
            color="primary"
            class="col-xs-12 col-sm-6 q-mt-md"
            @click="validateAndSearch"
          />
        </div>

        <!-- Tabla -->
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="id"
          class="q-mt-md"
          flat
          bordered
        >
          <template v-slot:body-cell-observacion="props">
            <!-- Mostrar directamente el texto de la observación -->
            <div>{{ props.row.observacion }}</div>
          </template>
        </q-table>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "GenerateReport",
  data() {
    return {
      startDate: null,
      endDate: null,
      selectedDepartment: null,
      startDateError: false,
      endDateError: false,
      selectedDepartmentError: false,
      departments: [
        "Recursos Humanos",
        "Finanzas",
        "Producción",
        "Ventas",
        "Marketing",
      ],
      rows: [
        {
          id: 1,
          nombre: "Juan Pérez",
          dias_trabajados: 20,
          ausencias: 2,
          horas_extra_dia: 5,
          horas_extra_noche: 3,
          observacion: "Observación para Juan Pérez",
        },
        {
          id: 2,
          nombre: "Ana Gómez",
          dias_trabajados: 22,
          ausencias: 1,
          horas_extra_dia: 8,
          horas_extra_noche: 2,
          observacion: "Observación para Ana Gómez",
        },
      ],
      columns: [
        { name: "id", label: "ID", align: "left", field: "id" },
        { name: "nombre", label: "NOMBRE", align: "left", field: "nombre" },
        {
          name: "dias_trabajados",
          label: "DÍAS TRABAJADOS",
          align: "center",
          field: "dias_trabajados",
        },
        {
          name: "ausencias",
          label: "AUSENCIAS",
          align: "center",
          field: "ausencias",
        },
        {
          name: "horas_extra_dia",
          label: "HORAS EXTRA DÍA",
          align: "center",
          field: "horas_extra_dia",
        },
        {
          name: "horas_extra_noche",
          label: "HORAS EXTRA NOCHE",
          align: "center",
          field: "horas_extra_noche",
        },
        {
          name: "observacion",
          label: "OBSERVACIÓN",
          align: "left",
          field: "observacion",
        },
      ],
    };
  },
  methods: {
    validateAndSearch() {
      // Reiniciar errores
      this.startDateError = !this.startDate;
      this.endDateError = !this.endDate;
      this.selectedDepartmentError = !this.selectedDepartment;

      // Si no hay errores, ejecutar la lógica de búsqueda
      if (
        !this.startDateError &&
        !this.endDateError &&
        !this.selectedDepartmentError
      ) {
        console.log("Buscando reportes para:", {
          startDate: this.startDate,
          endDate: this.endDate,
          department: this.selectedDepartment,
        });
        // Aquí puedes implementar la lógica para filtrar los datos en 'rows'
      } else {
        console.warn("Por favor, completa todos los campos antes de buscar.");
      }
    },
  },
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
