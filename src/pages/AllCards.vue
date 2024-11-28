<template>
  <q-page padding>
    <section>
      <div class="row justify-center">
        <div class="column col-11">
          <h1 class="text-primary text-h4 text-bold">Todas las tarjetas</h1>
          <q-separator class="q-mt-lg" />
        </div>
      </div>
    </section>
    <section>
      <div class="row q-col-gutter-md q-py-md q-px-xl">
        <div
          v-for="card in cards"
          :key="card.cardId"
          class="col-6 col-sm-6 col-md-4"
        >
          <q-card
            flat
            class="relative-position overflow-hidden card-container"
            style="aspect-ratio: 16/9"
          >
            <img src="/src/assets/logo.png" alt="Logo" class="logo" />
            <span
              class="absolute text-h6 text-primary card-id"
              style="top: 8px; right: 4px"
            >
              {{ card.cardId }}
            </span>
            <span
              class="absolute text-subtitle2 text-primary assigned-to"
              style="bottom: 8px; left: 4px"
            >
              {{ card.assignedTo ? `${card.assignedTo.email}` : "No asignada" }}
            </span>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { io } from "socket.io-client";
import { Notify } from "quasar";

const notify = (message, color) => {
  Notify.create({
    message,
    color,
    position: "top-right",
    timeout: 5000,
  });
};

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

socket.on("assistance", (data) => {
  console.log(data);
  const { user } = data;
  const { card } = data;
  notify(
    `El empledo ${user.name} ${user.lastName} con tarjeta ${card.cardId} ${
      data.user.isPresent ? "entro a la empresa" : "salio de la empresa"
    }`,
    "secondary"
  );
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

const cards = ref([]);

onMounted(() => {
  api
    .get("/api/nfcCard/all", {
      withCredentials: true,
    })
    .then((response) => {
      cards.value = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style scoped>
.card-container {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 13%,
    rgba(170, 170, 170, 1) 100%
  );
  position: relative;
}

/* Imagen del logo escalable */
.logo {
  width: 20%; /* Ajusta este valor según el tamaño deseado */
  height: auto;
  top: 10px;
  left: 10px;
  position: absolute;
}

/* Escala de texto ajustable a la tarjeta */
.card-id {
  font-size: 4vw; /* Escala relativa */
}

.assigned-to {
  font-size: 2vw; /* Escala relativa */
}

/* Estilos para texto responsive en móviles */
@media (max-width: 600px) {
  .card-id {
    font-size: 3vw;
  }

  .assigned-to {
    font-size: 2.5vw;
  }

  .logo {
    width: 25%;
  }
}
@media (min-width: 1024px) {
  .card-id {
    font-size: 2.5vw;
  }

  .assigned-to {
    font-size: 1.5vw;
  }

  .logo {
    width: 25%;
  }
}
</style>
