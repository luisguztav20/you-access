<template>
  <q-dialog v-model="localDialog">
    <q-card style="width: 800px; border-radius: 15px">
      <q-card-section class="row items-center q-pb-none">
        <h2 class="text-h6">Marcar ingreso</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator class="q-mx-lg" />
      <q-card-section class="column items-start q-pb-none q-px-lg">
        <h3 class="text-h6 q-ma-none text-primary">ID: {{ employee.id }}</h3>
        <h4 class="text-h6 q-ma-none text-primary">
          {{ employee.name }}
        </h4>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section class="q-px-lg">
        <q-input
          v-model="employeeName"
          outlined
          type="text"
          label="Nombre"
          class="q-py-md full-width"
          disable
        />
        <q-select
          v-model="selectedDepartment"
          :options="departamentOption"
          label="Selecciona una opción"
          emit-value
        />
        <q-btn
          color="primary"
          rounded
          label="Guardar cambios"
          class="q-my-md full-width"
          @click="saveChanges"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Notify } from "quasar";
import { departaments } from "src/data/departaments";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  employee: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  departament.value = departaments;

  departamentOption.value = departament.value.map((departamento) => ({
    label: departamento.title,
    value: departamento.title,
    key: departamento.name,
  }));
});

const emit = defineEmits(["update:modelValue"]);
const localDialog = ref(props.modelValue);
const employeeName = ref(props.employee.name);
const departament = ref(null);
const departamentOption = ref(null);
const selectedDepartment = ref(props.employee.departament);

const notifyPositive = () => {
  Notify.create({
    type: "positive",
    message: "Cambios guardados con exito",
  });
};

// Llamada al hacer clic en el botón "Marcar asistencia"
const saveChanges = () => {
  localDialog.value = false;
  notifyPositive();
};

//Emitir el evento para actualizar el valor en el componente padre
watch(localDialog, (newValue) => {
  emit("update:modelValue", newValue);
});

//Sincronizar cambios cuando la prop `modelValue` cambie desde el padre
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);
</script>

<style lang="scss" scoped></style>
