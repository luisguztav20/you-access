<template>
  <q-page padding>
    <section>
      <div class="row q-px-xl">
        <div class="column col-12">
          <h1 class="text-primary text-h5 text-bold q-mb-none">
            Departamentos
          </h1>
        </div>
      </div>
      <div class="row q-px-xl">
        <div class="column col-xs-12 col-md-6">
          <q-btn
            class="q-mt-md"
            label="Agregar departamento"
            color="primary"
            @click="prompt = true"
          />
          <q-dialog v-model="prompt">
            <q-card style="width: 800px; border-radius: 15px">
              <q-card-section>
                <q-form @submit="onSubmit">
                  <q-input
                    v-model="department"
                    label="Nombre del departamento"
                    outlined
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Ingrese el nombre del departamento',
                    ]"
                  />
                  <q-input
                    v-model="description"
                    label="Descripción del departamento"
                    outlined
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Ingrese la descripción del departamento',
                    ]"
                  />
                  <q-btn label="Agregar" color="primary" type="submit" />
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-separator />
        </div>
      </div>

      <div class="row q-col-gutter-md q-my-md q-px-xl">
        <CardDepartaments
          v-for="(departamento, key) in departamentos"
          :key="departamento._id"
          :departamento="departamento"
          @redireccion="redireccion(departamento._id, key)"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import CardDepartaments from "../components/CardDepartaments.vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
import { io } from "socket.io-client";

const socket = io("https://youaccess-backend-0388e95e5b0d.herokuapp.com");

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("unassignedCard", (data) => {
  console.log(data);
  const { card } = data;
  const { cardId } = card;
  notify(
    `Alguien esta intentando usar la tarjeta con codigo: ${cardId}, que no esta asignada`,
    "negative"
  );
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

const departamentos = ref([]);
const department = ref("");
const description = ref("");
const router = useRouter();
const prompt = ref(false);

const onSubmit = () => {
  api
    .post(
      "/api/department",
      {
        name: department.value,
        description: description.value,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      if (response.status === 201) {
        notify("Departamento agregado", "positive");
        departamentos.value.push(response.data);
        department.value = "";
        description.value = "";
        prompt.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        return notify("El departamento ya existe", "negative");
      }
      notify("Error al agregar departamento", "negative");
    });
};

onMounted(() => {
  api
    .get("/api/department", {
      withCredentials: true,
    })
    .then((response) => {
      departamentos.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        notify("No hay departamentos", "negative");
      }
    });
});

const notify = (message, type) => {
  Notify.create({
    message: message,
    type: type,
    position: "top",
    timeout: 2000,
  });
};

function redireccion(nombre) {
  router.push(`/admin/manager/${nombre}`);
}
</script>
