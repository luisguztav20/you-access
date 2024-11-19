<template>
  <nav>
    <q-toolbar class="row justify-center col-1">
      <img src="/src/assets/you-access-logo-01.svg" style="width: 125px" />
    </q-toolbar>
  </nav>

  <div class="login-page flex flex-center">
    <div class="login-container q-pa-md q-mt-xl">
      <div class="text-h4 text-primary text-center font-bold">
        Iniciar sesión
      </div>
      <div class="text-subtitle1 text-center q-mt-md welcome-text">
        Bienvenido de nuevo
      </div>

      <q-form @submit="onLogin" class="q-mt-lg">
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
          class="q-mb-sm full-width"
          :rules="[(val) => !!val || 'La contraseña es obligatoria']"
        />

        <div class="q-mb-sm full-width">
          <q-btn
            flat
            label="¿Has olvidado tu contraseña?"
            @click="onForgotPassword"
            class="text-dark-blue full-width forgot-password-btn"
          />
        </div>

        <q-btn
          label="Iniciar sesión"
          color="primary"
          rounded
          type="submit"
          class="full-width q-mt-sm"
        />
      </q-form>
      <q-btn
        label="Crear cuenta"
        class="full-width q-mt-md google-btn"
        to="/signup"
        flat
      />
      <q-btn
        label="Iniciar con Google"
        class="full-width q-mt-md google-btn"
        @click="onGoogleLogin"
        flat
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

const email = ref("");
const password = ref("");

const onLogin = async () => {
  try {
    const response = await api.post(
      "api/auth/login",
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.message === "Admin logged in successfully") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
    console.log(response.data);
  } catch (error) {
    // Manejar el error
    console.error(error);
  }
};

const onForgotPassword = () => {
  // Lógica para recuperar contraseña
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.login-container {
  max-width: 400px; /* Aumenta el tamaño del contenedor */
  width: 100%;
}
.full-width {
  width: 100%; /* Ocupa todo el ancho del contenedor */
}
.font-bold {
  font-weight: 700;
}
.welcome-text {
  font-size: 1.25rem; /* Ajuste el tamaño de la fuente */
}
.text-dark-blue {
  color: #0d47a1; /* Azul oscuro */
}
.text-right {
  text-align: right;
}
.google-btn {
  background-color: #f5f5f5; /* Fondo gris claro */
  color: #0d47a1; /* Texto en azul oscuro */
  border-radius: 5px;
}
.forgot-password-btn {
  justify-content: flex-end; /* Alinea el texto a la derecha */
  display: flex; /* Asegura que el botón use flexbox para la alineación */
}
</style>
