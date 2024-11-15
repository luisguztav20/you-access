<template>
  <q-card
    class="my-card q-mt-sm q-mr-sm card-mod"
    flat
    bordered
    style="width: 300px"
  >
    <q-item>
      <q-item-section avatar class="column justify-center items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <q-item-label class="text-primary q-mt-md q-pr-sm">{{
          empleado.id
        }}</q-item-label>
        <q-badge v-if="empleado.current" rounded color="green" class="q-mt-sm">
          Presente
        </q-badge>
        <q-badge v-else rounded color="red" class="q-mt-sm"> Ausente </q-badge>
      </q-item-section>

      <q-separator vertical />

      <div>
        <q-item-section horizontal class="q-ma-md">
          <q-item-label caption class="q-ma-none">
            {{ empleado.name }}</q-item-label
          >
          <q-item-label caption> Cargo: {{ empleado.position }} </q-item-label>
        </q-item-section>
        <q-separator />
        <q-card-actions class="q-pa-none row full-width justify-center q-mt-sm">
          <q-btn
            v-for="(iconName, indice) in iconsNames"
            :key="indice"
            flat
            :icon="iconName"
            color="primary"
            @click="openDialog(indice)"
          />
        </q-card-actions>
      </div>
    </q-item>

    <!-- <q-dialog v-model="asitemDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Marcar asistencia</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>{{ empleado.id }}</p>
          <p>{{ empleado.name }}</p>
        </q-card-section>
      </q-card>
    </q-dialog> -->
    <AsitemDialog
      v-model="asitem"
      :employeeId="empleado.id"
      :employeeName="empleado.name"
    />
    <ExitDialog
      v-model="exit"
      :employeeId="empleado.id"
      :employeeName="empleado.name"
    />

    <ReportDialog
      v-model="report"
      :employeeId="empleado.id"
      :employeeName="empleado.name"
    />
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import AsitemDialog from "../components/AsistemDialog.vue";
import ExitDialog from "../components/ExitDialog.vue";
import ReportDialog from "../components/ReportDialog.vue";

const asitem = ref(false);
const exit = ref(false);
const report = ref(false);

const props = defineProps({
  empleado: {
    type: Object,
    require: true,
  },
  iconsNames: {
    type: Array,
    required: true,
  },
});

function openDialog(indice) {
  if (indice === 0) {
    asitem.value = true;
  }

  if (indice === 1) {
    exit.value = true;
  }
  if (indice === 2) {
    report.value = true;
  }
}
</script>

<style lang="scss" scoped>
.card-mod {
  border-radius: 10px;
}
</style>
