<template>
  <q-item clickable :to="'/' + props.name">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" color="primary" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-light">{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    default: "",
  },
  name: {
    type: String,
  },
});
</script>
