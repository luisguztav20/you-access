<template>
  <q-dialog v-model="localDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Reporte de asistencia</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>{{ employeeId }}</p>
        <p>{{ employeeName }}</p>
        <p>from component</p>
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
</script>

<style lang="scss" scoped></style>
