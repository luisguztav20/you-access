<template>
  <q-dialog v-model="localDialog">
    <q-card style="width: 800px; border-radius: 15px">
      <q-card-section class="row items-center q-pb-none">
        <h2 class="text-h6">Datos del empleado</h2>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator class="q-mx-lg" />
      <q-card-section class="column items-start q-pb-none q-px-lg">
        <h3 class="text-h6 q-ma-none text-primary">ID: {{ employeeId }}</h3>
        <h4 class="text-h6 q-ma-none text-primary">
          {{ employeeName }}
        </h4>
      </q-card-section>
      <q-separator class="q-mx-lg q-mt-lg" />
      <q-card-section class="q-px-lg">
        <q-input
          v-model="date"
          outlined
          type="date"
          label="Fecha"
          class="q-py-md full-width"
          :error="errorDate"
          :error-message="errorMessageDate"
          @blur="validateDate"
        />
        <q-input
          v-model="time"
          outlined
          type="time"
          label="Hora"
          class="q-py-md"
          :error="errorTime"
          :error-message="errorMessageTime"
          @blur="validateTime"
        />

        <q-btn
          color="primary"
          label="Guardar cambios"
          class="q-my-md full-width"
          @click="onClick"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { workpeople } from "src/data/workpeople";

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

const date = ref("");
const time = ref("");
const text = ref("");
const errorDate = ref(false);
const errorMessageDate = ref("Campo vacío");
const errorTime = ref(false);
const errorMessageTime = ref("Campo vacío");
const errorText = ref(false);
const errorMessageText = ref("Campo vacío");

// Funciones de validación individuales para cada campo
const validateDate = () => {
  errorDate.value = date.value === "";
};

const validateTime = () => {
  errorTime.value = time.value === "";
};

const validateText = () => {
  errorText.value = text.value === "";
};

// Llamada al hacer clic en el botón "Marcar asistencia"
const onClick = () => {
  validateDate();
  validateTime();
  validateText();

  if (!errorDate.value && !errorTime.value && !errorText.value) {
    console.log(
      `se marco ingresa el dia: ${date.value} a las ${time.value} con observaciones ${text.value}`
    );

    markAsAbsent();

    date.value = "";
    time.value = "";
    text.value = "";
    localDialog.value = false;
  }
};

function markAsAbsent() {
  // Encuentra el empleado por ID y modifica su propiedad `current`
  const employee = workpeople.find((emp) => emp.id === props.employeeId);
  if (employee) {
    employee.current = false; // Cambiar de true a false
    console.log(
      `Empleado ${employee.name} marcado como presente. ${employee.current}`
    );
  }
}

// Emitir el evento para actualizar el valor en el componente padre
watch(localDialog, (newValue) => {
  emit("update:modelValue", newValue);

  // Reinicia los valores de los inputs si el diálogo se cierra
  if (!newValue) {
    resetFields();
  }
});

// Sincronizar cambios cuando la prop `modelValue` cambie desde el padre
watch(
  () => props.modelValue,
  (newValue) => {
    localDialog.value = newValue;
  }
);

// Función para reiniciar los valores de los inputs
const resetFields = () => {
  date.value = "";
  time.value = "";
  text.value = "";
  errorDate.value = false;
  errorTime.value = false;
  errorText.value = false;
};
</script>

<style lang="scss" scoped></style>
