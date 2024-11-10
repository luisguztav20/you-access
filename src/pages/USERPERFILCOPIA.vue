<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-sm-12 col-md-8 q-pt-lg q-px-md xs-hide">
      <q-card class="my-card" style="background-color: a2adbb">
        <q-item class="q-pb-none">
          <q-item-section avatar>
            <q-avatar size="80px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-py-sm">
            <h5 style="color: #055dc9; font-weight: bold">Nombre Trabajador</h5>
          </q-item-section>
          <q-item-section
            class="q-py-sm absolute-right col-md-5 col-sm-5 q-pl-lg"
          >
            <q-btn
              color="blue-10  "
              square
              class="q-py-md"
              label="Cerrar Sección"
              style="width: 60%"
            />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item>
          <div class="row">
            <div class="col-sm-1 q-py-md">
              <p class="">codigo</p>
              <p class="">Correo</p>
              <p class="">Departamento</p>
              <p class="">Cargo</p>
            </div>
            <div class="col-sm-4 q-py-md q-px-xl">
              <p class="">#123-335</p>
              <p class="">luisalfaro@gmail.com</p>
              <p class="">Ingenieria</p>
              <p class="">Desarrollador</p>
            </div>
            <div class="col-sm-1"></div>
            <div class="col q-py-md q-pl-xl">
              <p class="">codigo2</p>
              <p class="">Correo2</p>
              <p class="">Departamento2</p>
              <p class="">Cargo2</p>
            </div>
            <div class="col-sm-4 q-py-md q-px-xl">
              <p class="">#123-335</p>
              <p class="">luisalfaro@gmail.com</p>
              <p class="">Ingenieria</p>
              <p class="">Desarrollador</p>
            </div>
          </div>
        </q-item>
      </q-card>
    </div>
  </div>
  <!-- Version de celular -->
  <div class="row">
    <div class="col-xs-12 q-px-md q-py-md xl-hide lg-hide md-hide sm-hide">
      <q-card
        class="my-card"
        style="
          background-color: a2adbb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <q-item>
          <q-item-section avatar class="q-px-lg">
            <q-avatar size="100px" class="q-pb-md q-pl-md">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
            <p class="q-pt-md q-pb-none q-pl-lg" style="color: gray">
              #894904-D
            </p>
            <p style="color: #055dc9; font-weight: bold" class="q-pb-mlg">
              Nombre Trabajador
            </p>
          </q-item-section>
        </q-item>
        <span>________________________________________</span>
        <q-item>
          <q-item-section>
            <p>
              <img
                src="public/icons/history-book.png"
                style="width: 20px; height: 20px; vertical-align: middle"
              />
              Departamento de ingenieria
            </p>

            <p>
              <img
                src="public/icons/user.png"
                style="width: 20px; height: 20px; vertical-align: middle"
              />
              Supervisor
            </p>

            <p>
              <img
                src="public/icons/mail.png"
                style="width: 20px; height: 20px; vertical-align: middle"
              />
              correp@youaccess.com
            </p>
          </q-item-section>
        </q-item>
      </q-card>
      <div class="q-pt-xl">
        <q-btn
          color="blue-10"
          square
          class="q-px-lg q-py-md"
          label="Cerrar sesion"
          style="width: 100%"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
