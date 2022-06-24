<template>
  <div>
    <div class="text-2xl text-green-800">
      <router-link to="/"> <p>atras</p> </router-link>
    </div>
    <Spinner v-if="mostrar" />
    <div v-if="!mostrar">
      <div v-for="item in info" :key="item">
        <div v-if="item.title == nombre">
          <audio :src="item.preview" preload="auto" ref="audioPlayer" />
          <div class="w-full">
            <div class="h-16 py-5 font-semibold text-blue-300 text-2xl">
              Musica de Prueba
            </div>
            <div class="flex px-10 py-2 h-72 bg-gray-100">
              <div
                class="bg-white items-center mt-2 p-3 h-64 shadow-lg rounded-lg"
                style="width: 30rem !important"
              >
                <div class="flex my-3">
                  <div class="">
                    <img
                      class="w-full h-full rounded hidden md:block"
                      src="https://tailwindcss.com/img/card-top.jpg"
                      alt="Album Pic"
                    />
                  </div>
                  <div class="w-full p-5">
                    <div class="flex justify-center">
                      <div>
                        <h3 class="text-2xl text-grey-darkest font-medium">
                          {{ item.title.slice(0, 8) }}..
                        </h3>
                        <p class="text-sm text-grey mt-1">
                          {{ item.title_short.slice(0, 8) }}..
                        </p>
                      </div>
                    </div>
                    <div class="flex justify-center items-center mt-3">
                      <button
                        @click="ToggleReprod"
                        class="text-black p-8 rounded-full bg-orange-500 shadow-lg"
                      >
                        <svg
                          v-if="isPlayer"
                          class="w-8 h-8"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                        </svg>
                        <div v-if="!isPlayer" class="font-bold ml-2 text-2xl">
                          ►
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-gray-50 mx-auto py-4">
            <div class="flex gap-8 items-center justify-center">
              <button
                @click="mosArtista"
                class="text-3xl font-bold text-white w-1/6 mt-2 font-medium bg-green-500 hover:bg-green-600 rounded p-3"
              >
                Artistas
              </button>
              <button
                @click="mosAlbum"
                class="text-3xl text-white font-bold w-1/6 mt-2 font-medium bg-orange-500 hover:bg-orange-600 rounded p-3"
              >
                Album
              </button>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div>

    <Artista v-if="artista" />

    <Album v-if="album" />
  </div>
</template>

<script>
import axios from "axios";
import Artista from "../components/Busqueda/Artista.vue";
import Album from "../components/Busqueda/Album.vue";
import Spinner from "../components/Spinner/Spinner.vue";
export default {
  components: { Artista, Spinner, Album },
  name: "Proceso22062022Reproductor",

  data() {
    return {
      nombre: null,
      info: [],
      isPlayer: false,
      mostrar: true,
      artista: true,
      album: false,
    };
  },

  mounted() {
    this.nombre = this.$route.params.nombres;
    // console.log(this.nombre);
  },

  methods: {
    getAttributes() {
      axios.get("https://api.deezer.com/album/302127").then((s) => {
        this.mostrar = false;
        const { data } = s.data.tracks;
        this.info = data;
      });
    },
    ToggleReprod() {
      // console.log(this.$refs.audioPlayer[0].pause());
      // usamos el href para poder interactuar con el pausado o play del audio
      if (this.isPlayer) {
        this.$refs.audioPlayer[0].pause();
      } else {
        this.$refs.audioPlayer[0].play();
      }

      this.isPlayer = !this.isPlayer;
    },
    mosArtista() {
      this.artista = true;
      this.album = false;
    },
    mosAlbum() {
      this.album = true;
      this.artista = false;
    },
  },

  created() {
    this.getAttributes();
  },
};
</script>

<style lang="scss" scoped></style>
