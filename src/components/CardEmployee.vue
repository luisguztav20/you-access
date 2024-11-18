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
            v-for="iconName in iconsNames"
            :key="iconName.function"
            flat
            :icon="iconName.name"
            color="primary"
            @click="Dialog(iconName.function)"
          />
        </q-card-actions>
      </div>
    </q-item>

    <ReportDialog
      v-model="report"
      :employeeId="empleado.id"
      :employeeName="empleado.name"
    />

    <EditEmployee v-model="edit" :employee="empleado" />
  </q-card>
</template>

<script setup>
import { ref } from "vue";

import ReportDialog from "../components/ReportDialog.vue";
import EditEmployee from "../components/EditEmployee.vue";

const report = ref(false);
const edit = ref(false);

const props = defineProps({
  empleado: {
    type: Object,
    require: true,
  },
  iconsNames: {
    type: Object,
    required: true,
  },
});

function Dialog(name) {
  if (name === "report") {
    report.value = true;
  }
  if (name === "edit") {
    edit.value = true;
  }
  if (name == "delete") {
    console.log(
      "empledao : " +
        props.empleado.name +
        " eliminado ID: " +
        props.empleado.id
    );
  }
}
</script>

<style lang="scss" scoped>
.card-mod {
  border-radius: 10px;
}
</style>
