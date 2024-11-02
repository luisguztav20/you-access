<template>
  <div>
    <h1 class="text-h4">{{ parametro }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const ruta = useRoute();
const parametro = ref("");

onMounted(() => {
  parametro.value = ruta.params.departamento;
});
</script>
<style lang="scss" scoped></style>
