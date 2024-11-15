<template>
  <q-card class="my-card card-mod cursor-pointer q-mt-lg q-mr-lg">
    <img class="card-img" src="/src/assets/card-image.webp" />

    <q-card-section>
      <h3 class="text-subtitle1 q-ma-none q-pb-md text-weight-regular">
        {{ departamento.title }} - {{ departamento.id }}
      </h3>
      <q-btn
        color="primary"
        label="Gestionar"
        rounded
        @click="$emit('redireccion')"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  departamento: {
    type: Object,
    required: true,
  },
});

defineEmits(["redireccion"]);
</script>

<style lang="scss" scoped>
.card-mod {
  border-radius: 15px;
  max-width: 300px;
}

.card-img {
  width: 300px;
  height: 200px;
}
</style>
