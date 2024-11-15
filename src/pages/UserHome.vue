<template>
  <div class="row justify-center">
    <div class="col-12 col-md-6 col-sm-10 col-xs-12 q-pa-sm my-container">
      <h4 class="text-primary text-bold mb-2">Mis asistencias</h4>

      <h7 class="text-center my-subtitle">Filtrar asistencias</h7>

      <div class="row q-py-md align-items-center justify-center filter-container">
        <div class="col-12 col-md-4 q-px-sm q-pb-md">
          <q-input outlined v-model="text1" label="Inicio" dense size="sm" class="q-pa-xs" />
        </div>
        <div class="col-12 col-md-4 q-px-sm q-pb-md">
          <q-input outlined v-model="text2" label="Fin" dense size="sm" class="q-pa-xs" />
        </div>
        <div class="col-12 col-md-4 q-px-sm q-pb-md">
          <q-btn class="q-pa-xs search-button" label="Buscar" />
        </div>
      </div>

      <q-card class="my-card q-px-lg q-py-lg" flat bordered>
        <q-card-section>
          <div class="text-h5 text-primary text-bold">Tabla de asistencias</div>
        </q-card-section>
        <q-separator />

        <div class="table-container">
          <q-markup-table class="q-py-md q-px-lg my-table">
            <thead>
              <tr>
                <th class="text-left">Index</th>
                <th class="text-right">Dessert</th>
                <th class="text-right">Calories</th>
                <th class="text-right">Fat</th>
                <th class="text-right">Carbs</th>
                <th class="text-right">Protein</th>
                <th class="text-right">Sodium</th>
                <th class="text-right">Calcium %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td class="text-left">{{ index + 1 }}</td>
                <td class="text-right">{{ item.dessert }}</td>
                <td class="text-right">{{ item.calories }}</td>
                <td class="text-right">{{ item.fat }}</td>
                <td class="text-right">{{ item.carbs }}</td>
                <td class="text-right">{{ item.protein }}</td>
                <td class="text-right">{{ item.sodium }}</td>
                <td class="text-right">{{ item.calcium }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Variables reactivas para los campos de filtro
const text1 = ref('');
const text2 = ref('');

// Datos de ejemplo para la tabla
const items = ref([
  { dessert: 'Ejemplo 1', calories: 200, fat: 10, carbs: 25, protein: 5, sodium: 60, calcium: 15 },
  { dessert: 'Ejemplo 2', calories: 300, fat: 15, carbs: 40, protein: 6, sodium: 100, calcium: 10 },
  { dessert: 'Ejemplo 3', calories: 300, fat: 15, carbs: 40, protein: 6, sodium: 100, calcium: 10 },
]);
</script>

<style scoped>
.my-container {
  max-width: 600px;
  width: 50%;
}

.my-subtitle {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 15px;
}

.my-card {
  border: 2px solid #055dc9;
  padding: 10px;
  margin: 0 15px;
}

.my-table {
  color: #055dc9;
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
  margin: 0 10px;
}

@media (min-width: 900px) {
  .search-button {
    font-size: 14px;
    padding: 10px 6px;
    width: 100%;
    background-color: #e0e0e0;
    color: #055dc9;
  }

  .filter-container {
    flex-direction: row;
  }

  .my-table th {
    background-color: #e0e0e0;
    color: #055dc9;
  }


  .table-container {
    overflow: visible;
  }

  .my-table {
    min-width: auto;
  }
}

@media (max-width: 899px) {
  .my-container {
    width: 90%;
    margin: 0 auto;
  }

  .filter-container {
    flex-direction: column;
    align-items: center;
  }

  .filter-container > div {
    width: 100%;
  }

  .search-button {
    font-size: 14px;
    padding: 8px 16px;
    width: 100%;
    background-color: #e0e0e0;
    color: #055dc9;
  }

  .my-table th {
    background-color: #e0e0e0;
    color: #055dc9;
  }

  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .my-table {
    min-width: 800px;
  }
}
</style>
