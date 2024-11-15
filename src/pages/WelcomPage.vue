<template>
  <div class="column" style="height: 100vh">
    <nav>
      <q-toolbar class="row justify-center col-1">
        <img src="/src/assets/you-access-logo-01.svg" style="width: 125px" />
      </q-toolbar>
    </nav>

    <main class="row justify-center items-center col-11">
      <img
        src="/src/assets/welcom.svg"
        alt="imagen welcom"
        class="q-mt-md col-10 col-sm-5 col-md-4 col-lg-2 col-xl-1"
        style="width: 300px"
      />
      <div class="col-sm-1"></div>
      <div class="col-10 col-sm-5 col-md-4 col-lg-3 col-xl-2">
        <h1 class="text-h4 text-center text-bold text-primary">
          Sistema de control asistencia
        </h1>
        <p class="text-center">
          Explora tus asistencias, en cualquier momento y cualquier lugar
        </p>

        <div class="row justify-around q-my-md">
          <q-btn
            color="primary"
            label="Iniciar sesión"
            @click="onClick"
            to="/login"
          />
          <q-btn flat color="primary" label="Crear cuenta" to="/signup" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
