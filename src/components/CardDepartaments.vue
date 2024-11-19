<template>
  <q-card class="card-mod cursor-pointer q-mt-lg q-mr-lg">
    <img class="card-img" src="/src/assets/card-image.webp" />

    <q-card-section>
      <h3 class="text-subtitle1 q-ma-none q-pb-md text-weight-bold">
        {{ departamento.name }} - {{ departamento._id }}
      </h3>
      <p>
        Descripcion:
        <span class="text-grey-7">{{ departamento.description }}</span>
      </p>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="primary"
        label="Gestionar"
        rounded
        @click="$emit('redireccion')"
      />
    </q-card-actions>
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
  width: 300px;
}

.card-img {
  max-width: 300px;
  max-height: 200px;
}
</style>
