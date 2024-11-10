<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-sm-12 col-md-8 q-pt-lg q-px-md xs-hide">
      <q-card class="my-card" style="background-color: #f0f0f0">
        <q-item class="q-pb-none">
          <q-item-section avatar>
            <q-avatar size="80px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="Avatar de trabajador" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="q-py-sm">
            <h5 style="color: #055dc9; font-weight: bold">Nombre Trabajador</h5>
          </q-item-section>
          <q-item-section
            class="q-py-sm absolute-right col-md-5 col-sm-5 q-pl-lg"
          >
            <q-btn
              color="blue-10"
              square
              class="q-py-md"
              label="Cerrar Sesión"
              style="width: 60%; border-radius: 12px;"
            />
          </q-item-section>
        </q-item>
        <q-separator class="custom-separator" />

        <!-- Información del trabajador -->
        <q-item>
          <div class="row">
            <div class="col-sm-2 q-py-md">
              <p class="q-mb-xs" style="font-weight: bold;">Código</p>
              <p class="q-mb-xs" style="font-weight: bold;">Correo</p>
              <p class="q-mb-xs" style="font-weight: bold;">Departamento</p>
              <p class="q-mb-xs" style="font-weight: bold;">Cargo</p>
            </div>

            <!-- Información dinámica utilizando arrays -->
            <div class="col-sm-4 q-py-md q-px-xl">
              <p v-for="(item, index) in data" :key="index" class="q-mb-xs">{{ item.codigo }}</p>
              <p v-for="(item, index) in data" :key="index" class="q-mb-xs">{{ item.correo }}</p>
              <p v-for="(item, index) in data" :key="index" class="q-mb-xs">{{ item.departamento }}</p>
              <p v-for="(item, index) in data" :key="index" class="q-mb-xs">{{ item.cargo }}</p>
            </div>

            <div class="col-sm-1"></div>

            <div class="col q-py-md q-pl-xl" style="display: flex; flex-direction: column;">
              <div class="row">
                <div class="col">
                  <p class="q-mb-xs" style="font-weight: bold;">Código 2</p>
                  <p class="q-mb-xs" style="font-weight: bold;">Correo 2</p>
                  <p class="q-mb-xs" style="font-weight: bold;">Departamento 2</p>
                  <p class="q-mb-xs" style="font-weight: bold;">Cargo 2</p>
                </div>
                <div class="col">
                  <p v-for="(item, index) in data" :key="'2-' + index" class="q-mb-xs">{{ item.codigo2 }}</p>
                  <p v-for="(item, index) in data" :key="'2-' + index" class="q-mb-xs">{{ item.correo2 }}</p>
                  <p v-for="(item, index) in data" :key="'2-' + index" class="q-mb-xs">{{ item.departamento2 }}</p>
                  <p v-for="(item, index) in data" :key="'2-' + index" class="q-mb-xs">{{ item.cargo2 }}</p>
                </div>
              </div>
            </div>
          </div>
        </q-item>
      </q-card>
    </div>
  </div>

  <!-- Versión de móvil -->
  <div class="row">
    <div class="col-xs-12 q-px-md q-py-md xl-hide lg-hide md-hide sm-hide">
      <q-card
        class="my-card"
        style="background-color: #f0f0f0; display: flex; flex-direction: column; align-items: center; justify-content: center;"
      >
        <q-item>
          <q-item-section avatar class="q-px-lg">
            <q-avatar size="100px" class="q-pb-md q-pl-md">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="Avatar trabajador móvil" />
            </q-avatar>
            <p class="q-pt-md q-pb-none q-pl-lg" style="color: gray">
              #894904-D
            </p>
            <p style="color: #055dc9; font-weight: bold" class="q-pb-mlg">
              Nombre Trabajador
            </p>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <p>
              <q-icon name="list" size="20px" style="vertical-align: middle" />
              Departamento de ingeniería
            </p>

            <p>
              <q-icon name="person" size="20px" style="vertical-align: middle" />
              Supervisor
            </p>

            <p>
              <q-icon name="mail" size="20px" style="vertical-align: middle" />
              luisalfaro@gmail.com
            </p>
          </q-item-section>
        </q-item>
      </q-card>

      <div class="q-pt-xl">
        <q-btn
          color="blue-10"
          square
          class="q-px-lg q-py-md"
          label="Cerrar sesión"
          style="width: 100%; border-radius: 12px;"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  {
    codigo: '#123-335',
    correo: 'luisalfaro@gmail.com',
    departamento: 'Ingeniería',
    cargo: 'Desarrollador',
    codigo2: '#123-336',
    correo2: 'juanperez@gmail.com',
    departamento2: 'Marketing',
    cargo2: 'Gerente'
  }
]);
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 10px;
}

.q-px-md {
  padding-left: 1rem;
  padding-right: 1rem;
}

.q-py-md {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.q-my-md {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.q-mb-xs {
  margin-bottom: 0.5rem;
}

.q-pl-xl {
  padding-left: 2rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.custom-separator {
  border-color: #ccc;
}
</style>
