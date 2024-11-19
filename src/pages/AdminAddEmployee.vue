<template>
  <q-page padding>
    <div class="row justify-center q-my-lg">
      <q-card
        class="my-card col-11 col-md-8 col-lg-6"
        style="border-radius: 15px"
      >
        <q-card-section>
          <div class="text-h6">Agregar nuevo trabajador</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              outlined
              v-model="name"
              label="Nombre del trabajador "
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Ingrese el nombre del trabajador',
              ]"
            />
            <q-input
              outlined
              v-model="cargo"
              label="Cargo del trabajador"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Ingrese el cargo del trabajador',
              ]"
            />
            <q-select
              outlined
              label="Asignar departamento"
              v-model="selectedDepartment"
              :options="departamentsOptions"
              :rules="[(val) => val === '' || 'Seleccione un departamento']"
            />

            <div>
              <q-btn
                label="Agregar trabajador"
                type="submit"
                color="primary"
                rounded=""
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { Notify } from "quasar"; // Importar Notify de Quasar
import { ref, onMounted } from "vue";
import { departaments } from "src/data/departaments";

const name = ref(null);
const cargo = ref(null);
const departamentsOptions = ref([]);
const selectedDepartment = ref(null);
const departament = ref([]);

const notifyPosivite = (message) => {
  Notify.create({
    message: message,
    type: "positive",
    position: "bottom",
    timeout: 2000,
  });
};

const onSubmit = () => {
  notifyPosivite("Trabajador agregado\n" + name.value);
  onReset();
};

function onReset() {
  name.value = "";
  cargo.value = "";
  selectedDepartment.value == null;
}

onMounted(() => {
  departament.value = departaments;

  departamentsOptions.value = departament.value.map((departamento) => ({
    label: departamento.title,
    value: departamento.title,
    key: departamento.name,
  }));
});
</script>

<style lang="scss" scoped></style>
