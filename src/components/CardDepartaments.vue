<template>
  <div class="col-12 col-sm-6 col-md-6 col-lg-3">
    <q-card class="card-mod cursor-pointer">
      <img class="card-img" src="/src/assets/card-image.webp" />

      <q-card-section>
        <h3 class="text-subtitle1 q-ma-none q-pb-md text-weight-bold">
          {{ departamento.name }}
        </h3>
        <p style="display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
          Descripcion:
          <span class="text-grey-7">
            {{ departamento.description }}
          </span>
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
  </div>
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
}

.card-img {
  aspect-ratio: 13/9;
}
</style>
