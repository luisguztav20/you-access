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
              type="email"
              outlined
              v-model="email"
              label="Correo del trabajador"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Ingrese el correo del trabajador',
                (val) =>
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                  'Ingrese un correo válido',
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
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Seleccione un departamento',
              ]"
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
// import { departaments } from "src/data/departaments";
import { api } from "src/boot/axios";

const email = ref(null);
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

const notifyNegative = (message) => {
  Notify.create({
    message: message,
    type: "negative",
    position: "bottom",
    timeout: 2000,
  });
};

const onSubmit = () => {
  api
    .post(
      "/api/admin/addUserToDepartment",
      {
        userEmail: email.value,
        position: cargo.value,
        departmentId: selectedDepartment.value.key,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.status === 200) {
        notifyPosivite("Trabajador agregado correctamente");
        onReset();
      }
    })
    .catch((error) => {
      if (error.response.message === "User already in department") {
        notifyNegative("El trabajador ya esta registrado en el departamento");
      } else if (error.response.status === 404) {
        notifyNegative("El trabajador no esta registrado en el sistema");
      } else if (error.response.status === 400) {
        notifyNegative("El trabajador ya esta registrado en el departamento");
      }
      console.log(error);
    });
};

function onReset() {
  email.value = "";
  cargo.value = "";
  selectedDepartment.value = null;
}

onMounted(() => {
  // departament.value = departaments;

  // departamentsOptions.value = departament.value.map((departamento) => ({
  //   label: departamento.title,
  //   value: departamento.title,
  //   key: departamento.name,
  // }));

  api
    .get("/api/department", {
      withCredentials: true,
    })
    .then((response) => {
      departament.value = response.data;
      departamentsOptions.value = departament.value.map((departamento) => ({
        label: departamento.name,
        value: departamento._id,
        key: departamento._id,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style lang="scss" scoped></style>
