<template>
  <div class="row q-mb-md col-12 col-md-4">
    <q-input
      v-model="localNameSearch"
      type="text"
      label="Buscar empleado"
      class="full-width q-pr-sm"
      outlined
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: String, // Cambiado a modelValue para compatibilidad con v-model
});

const emit = defineEmits(["update:modelValue"]);
const localNameSearch = ref(props.modelValue);

// Emitir el evento para actualizar el valor en el componente padre
watch(localNameSearch, (newValue) => {
  emit("update:modelValue", newValue);
});

// Sincronizar cambios cuando la prop `modelValue` cambie desde el padre
watch(
  () => props.modelValue,
  (newValue) => {
    localNameSearch.value = newValue;
  }
);
</script>

<style lang="scss" scoped></style>
