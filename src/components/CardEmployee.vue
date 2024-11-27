<template>
  <div class="col-12 col-sm-6 col-lg-4">
    <q-card class="card-mod" flat bordered>
      <q-item>
        <q-item-section
          avatar
          class="column justify-center items-center q-mr-md"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-badge
            v-if="empleado.isPresent"
            rounded
            color="green"
            class="q-mt-md"
          >
            Presente
          </q-badge>
          <q-badge v-else rounded color="red" class="q-mt-md">
            Ausente
          </q-badge>
        </q-item-section>

        <q-separator vertical />

        <div style="width: 100%">
          <q-item-section horizontal class="q-ma-md">
            <q-item-label caption class="text-bold">
              {{ empleado.name }} {{ empleado.lastName }}</q-item-label
            >
            <q-item-label caption>
              <span class="text-bold">Correo:</span>
              {{ empleado.email }}</q-item-label
            >
            <q-item-label caption>
              <span class="text-bold">Departamento:</span>
              {{ employeeDepartment }}
            </q-item-label>
            <q-item-label caption>
              <span class="text-bold">Cargo:</span> {{ empleado.position }}
            </q-item-label>
          </q-item-section>
          <q-separator />
          <q-card-actions
            class="q-pa-none row full-width justify-start q-mt-sm"
          >
            <q-btn
              v-for="iconName in iconsNames"
              :key="iconName.function"
              flat
              :icon="iconName.name"
              color="primary"
              @click="Dialog(iconName.function)"
            />
            <!-- <q-btn
              flat
              icon="delete"
              color="negative"
              @click="Dialog('delete')"
            /> -->
          </q-card-actions>
        </div>
      </q-item>

      <ReportDialog v-model="report" :employee="empleado" />
      <AssignCard v-model="edit" :employee="empleado" />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ReportDialog from "../components/ReportDialog.vue";
import AssignCard from "../components/AssignCard.vue";

const report = ref(false);
const edit = ref(false);
const employeeDepartment = ref("");
const employeeCard = ref("");

const props = defineProps({
  empleado: {
    type: Object,
    require: true,
  },
  iconsNames: {
    type: Object,
    required: true,
  },
  departmentName: {
    type: String,
    required: false,
  },
});

if (props.departmentName) {
  employeeDepartment.value = props.departmentName;
} else {
  employeeDepartment.value =
    props.empleado?.department?.name || "Sin departamento";
}

function Dialog(name) {
  if (name === "report") {
    report.value = true;
  }
  if (name === "edit") {
    edit.value = true;
  }
  if (name == "delete") {
  }
}
</script>

<style lang="scss" scoped>
.card-mod {
  border-radius: 10px;
}
</style>
