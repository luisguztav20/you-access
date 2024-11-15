<template>
  <div class="signup-page flex flex-center">
    <div class="signup-container q-pa-md q-mt-xl">
      <div class="text-h4 text-primary text-center font-bold">Crear cuenta</div>
      <div class="text-subtitle2 text-center q-mt-md small-text">
        Crea una cuenta para disfrutar la experiencia
      </div>

      <q-form @submit="onSignup" class="q-mt-lg">
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
          type="submit"
          class="full-width q-mt-md"
        />
      </q-form>

      <q-btn
        label="Crear con Google"
        class="full-width q-mt-md google-btn"
        @click="onGoogleSignup"
        flat
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    onSignup() {
      // Lógica para crear cuenta
    },
    onGoogleSignup() {
      // Lógica para crear cuenta con Google
    },
  },
};
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
.google-btn {
  background-color: #f5f5f5; /* Fondo gris claro */
  color: #0d47a1; /* Texto en azul oscuro */
  border-radius: 5px;
}
</style>
