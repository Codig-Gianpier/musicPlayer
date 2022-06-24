<template>
  <div class="mx-2">
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- CARD 1 -->
      <Spinner v-if="mostrar" />
      <div
        v-for="art in nuevosArtistas.slice(0, artistaMusic)"
        :key="art.id"
        class="bg-gray-900 shadow-lg rounded p-3"
      >
        <div class="group relative">
          <img
            class="w-full md:w-full block rounded"
            src="https://www.mosalingua.com/es/files/2012/07/musica.jpg"
            alt=""
          />
          <div
            class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
          >
            <button
              @click="activedMusic"
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <svg
                v-if="isPlayer"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-play-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                />
              </svg>
              <div v-if="!isPlayer">
                <audio
                  controls
                  :src="art.preview"
                  preload="auto"
                  ref="audioPlayer"
                />
              </div>
            </button>
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-white text-lg">{{ art.title }}</h3>
          <p class="text-gray-400">{{ art.type }}</p>
        </div>
      </div>

      <Spinner v-if="spinner" />
      <!-- Card cargan.... -->
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner.vue";
export default {
  name: "Proceso22062022Artista",
  components: {
    Spinner,
  },

  data() {
    return {
      nuevosArtistas: [],
      isPlayer: true,
      spinner: true,
      artistaMusic: 6,
      mostrar: true,
    };
  },

  mounted() {
    //  mientras se espera la respuesta de la api mediante el
    //  scrool se mostrara el spinner mostrando de 6 en 6 las imagenes
    window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;

      this.spinner = true;
      if (scrollTop + clientHeight > scrollHeight - 6) {
        this.artistaMusic++;
        this.spinner = false;
        this.getAttributes();
      }
    });
  },

  methods: {
      // consultando la api con axios 
    getAttributes() {
      axios.get("https://api.deezer.com/album/302127/tracks").then((datos) => {
        const { data } = datos.data;
        this.mostrar = false;
        this.nuevosArtistas = data;
        // console.log(data);
      });
    },

    activedMusic() {
      // aqui cambiaremos el estado si esta reproducion o en pause
      this.isPlayer = !this.isPlayer;
    },
  },

  created() {
    // mandaremos a correr el metodo de consulta ala api
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped></style>
