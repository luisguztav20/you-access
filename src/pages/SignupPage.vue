<template>
  <div class="signup-page flex flex-center">
    <div
      class="signup-container q-pa-md q-mt-xl bg-white"
      style="border-radius: 10px"
    >
      <div class="text-h4 text-primary text-center font-bold">Crear cuenta</div>
      <div class="text-subtitle2 text-center q-mt-md small-text">
        Crea una cuenta para disfrutar la experiencia
      </div>

      <q-form @submit="onSignup" class="q-mt-lg">
        <div class="row q-gutter-x-sm">
          <div class="col">
            <q-input
              v-model="name"
              type="text"
              label="Nombre"
              outlined
              dense
              class="q-mb-md full-width"
              :rules="[(val) => !!val || 'El nombre es obligatorio']"
            />
          </div>
          <div class="col">
            <q-input
              v-model="lastName"
              type="text"
              label="Apellido"
              outlined
              dense
              class="q-mb-md full-width"
              :rules="[(val) => !!val || 'El apellido es obligatorio']"
            />
          </div>
        </div>
        <q-input
          v-model="email"
          type="email"
          label="Correo"
          outlined
          dense
          class="q-mb-md full-width"
          :rules="[(val) => !!val || 'El correo es obligatorio']"
        />
        <q-input
          v-model="password"
          type="password"
          label="Contraseña"
          outlined
          dense
          class="q-mb-md full-width"
          :rules="[(val) => !!val || 'La contraseña es obligatoria']"
        />
        <q-input
          v-model="confirmPassword"
          type="password"
          label="Confirmar contraseña"
          outlined
          dense
          class="q-mb-md full-width"
          :rules="[(val) => val === password || 'Las contraseñas no coinciden']"
        />

        <q-btn
          label="Crear cuenta"
          color="primary"
          rounded
          type="submit"
          class="full-width q-mt-md"
        />

        <q-btn
          label="Iniciar sesion"
          rounded
          class="full-width q-mt-md google-btn"
          to="/login"
          flat
        />
      </q-form>
    </div>

    <q-dialog v-model="showModal">
      <q-card class="modal-card">
        <q-card-section>
          <div class="text-h6">Error</div>
        </q-card-section>

        <q-card-section>
          <p>¡El correo ya esta registrado!</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { Cookies } from "quasar";

const router = useRouter();
const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showModal = ref(false);

async function onSignup() {
  Cookies.remove("x-token");

  try {
    const response = await api.post(
      "/api/auth/register",
      {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );
    clearFields();
    router.push("/user");
    if (response.status === 201) {
      const token = response.data.token;
      Cookies.set("x-token", token, {
        expires: 7,
      });
      this.$router.push("/user");
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    if (
      (error.response && error.response.status === 400) ||
      error.response.data.error === "User already exists"
    ) {
      showModal.value = true;
    }
  }
}

function clearFields() {
  name.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
}
</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.signup-container {
  max-width: 400px; /* Aumenta el tamaño del contenedor para que coincida con el login */
  width: 100%;
}
.full-width {
  width: 100%; /* Ocupa todo el ancho del contenedor */
}
.font-bold {
  font-weight: 700;
}
.small-text {
  font-size: 0.875rem; /* Tamaño de letra más pequeño */
}
.modal-card {
  min-width: 350px;
}
</style>
