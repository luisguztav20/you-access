<template>
  <q-dialog v-model="localDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Marcar asistencia</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-px-xl">
        <h3 class="text-h6 q-ma-none text-primary">{{ employeeId }}</h3>
        <h4 class="text-h6 q-ma-none text-primary">{{ employeeName }}</h4>
      </q-card-section>
      <q-card-section class="q-px-xl">
        <q-input
          v-model="date"
          outlined
          type="date"
          label="Fecha"
          class="q-py-md full-width"
        />
        <q-input
          v-model="time"
          outlined
          type="time"
          label="Hora"
          class="q-py-md"
        />
        <q-btn
          color="primary"
          label="Marcar asistencia"
          class="q-my-md full-width"
          @click="onClick"
        />
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
