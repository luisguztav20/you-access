<template>
  <q-scroll-area style="height: 140px">
    <div class="flex no-wrap">
      <q-card class="card q-mr-md" bordered>
        <q-card-section class="row justify-around items-center">
          <div class="column">
            <div class="text-h6">
              {{ totalWorkPeople }}
            </div>
            <p>Total empleados</p>
          </div>
          <q-icon size="50px" name=" group" />
        </q-card-section>
      </q-card>
      <q-card class="card q-mr-md" bordered>
        <q-card-section class="row justify-around items-center">
          <div class="column">
            <div class="text-h6">{{ presents }}/{{ totalWorkPeople }}</div>
            <p>Empleados presentes</p>
          </div>
          <q-icon size="50px" name="how_to_reg" />
        </q-card-section>
      </q-card>
      <q-card class="card q-mr-md" bordered>
        <q-card-section class="row justify-around items-center">
          <div class="column">
            <div class="text-h6">{{ absent }}/{{ totalWorkPeople }}</div>
            <p>Empleados ausentes</p>
          </div>
          <q-icon size="50px" name="gpp_maybe" />
        </q-card-section>
      </q-card>
    </div>
  </q-scroll-area>
</template>

<script setup>
const props = defineProps({
  totalWorkPeople: {
    type: Number,
    required: true,
  },
  absent: {
    type: Number,
    required: true,
  },
  presents: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card {
  min-width: 250px; /* Tamaño mínimo para cada tarjeta */
  flex: 0 0 auto; /* Asegura que las tarjetas no se ajusten y se mantengan en una fila */
  border-radius: 10px;
}
</style>
