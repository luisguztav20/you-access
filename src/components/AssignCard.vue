<template>
  <q-dialog v-model="localDialog">
    <q-card style="width: 800px; border-radius: 15px">
      <q-card-section class="row items-center q-pb-none">
        <h2 class="text-h6">Asignar tarjeta</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator class="q-mx-lg" />
      <q-card-section class="column items-start q-pb-none q-px-lg">
        <h3 class="text-h6 q-ma-none text-primary">
          {{ employee.email }}
        </h3>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section class="q-px-lg">
        <q-form @submit="onSubmit">
          <q-select
            v-model="selectedCard"
            :options="unassignedCardsOptions"
            label="Selecciona una opción"
            :rules="[
              (val) => (val !== null && val !== '') || 'Seleccione una tarjeta',
            ]"
          />
          <q-btn
            label="Asignar tarjeta"
            type="submit"
            color="primary"
            rounded=""
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

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

const emit = defineEmits(["update:modelValue"]);
const localDialog = ref(props.modelValue);
const unassignedCardsOptions = ref([]);
const unassignedCards = ref([]);
const selectedCard = ref(null);
const employee = props.employee;

onMounted(() => {
  api
    .get("/api/nfcCard/unassigned")
    .then((response) => {
      unassignedCards.value = response.data;
      if (unassignedCards.value.length < 1) {
        Notify.create({
          type: "negative",
          message: "No hay tarjetas disponibles",
        });
        localDialog.value = false;
      }

      unassignedCardsOptions.value = unassignedCards.value.map((card) => ({
        label: `Tarjeta NFC: ${card.cardId}`,
        value: card,
        key: card._id,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
});

const notifyPositive = (message) => {
  Notify.create({
    message: message,
    type: "positive",
    position: "bottom",
    timeout: 2000,
  });
};

const onSubmit = () => {
  api
    .post("/api/nfcCard/assign", {
      cardId: selectedCard.value.key,
      userId: employee._id,
    })
    .then((response) => {
      if (response.status === 200) {
        notifyPositive("Tarjeta asignada correctamente");
        onReset();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

function onReset() {
  selectedCard.value = null;
}

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
