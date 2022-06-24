<template>
  <div>
    <div class="relative mx-20 mt-10">
      <input
        type="search"
        class="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="nombres"
        placeholder="Poner el titulo"
        required
      />
    </div>

    <Spinner v-if="temporizador" />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
      <article>
        <h2 class="text-2xl font-bold mt-10 text-gray-800">
          Canciones Y Artistas
        </h2>

        <section
          class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8"
        >
          <div v-for="item in info.slice(0, mosImag)" :key="item">
            <div v-if="filter(item)" class="mx-auto">
              <article
                class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
                style="
                  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShQnqIx6WhDAX0QNjVULthEFh4a546E_pkww&usqp=CAU');
                "
              >
                <div
                  class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"
                ></div>
                <div
                  class="relative w-full h-full px-4 sm:px-6 lg:px-4 my-16 justify-center items-center"
                >
                  <h3 class="text-center">
                    <button
                      @click="mandar(item.title)"
                      class="text-white text-2xl font-bold text-center"
                      href="#"
                    >
                      <span class="absolute inset-0"></span>
                      {{ item.title }}
                    </button>
                    <p class="mb-3 font-normal text-white">
                      artista: {{ item.artist.name }}
                    </p>
                  </h3>

                  <button
                    @click="mandar(item.title)"
                    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
                  >
                    Escuchar Audio
                    <svg
                      class="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>

          <Spinner v-if="spinner" />
        </section>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner/Spinner.vue";

export default {
  components: { Spinner },
  name: "Proceso22062022Buscador",

  data() {
    return {
      info: [],
      temporizador: true,
      nombres: "",
      spinner: false,
      mosImag: 6,
    };
  },

  methods: {
    // consulta ala api
    getAttributes() {
      axios.get("https://api.deezer.com/album/302127").then((r) => {
        this.temporizador = false;
        const datos = r.data;
        const { data } = datos.tracks;
        this.info = data;
        // console.log(this.info.length);
      });
    },

    mandar(titulo) {
      //  mandamos atravez del router  los parametros como titulo 
      this.$router.push("/escuchar/" + titulo);
      //   window.location.href = cancion;
    },

    filter(items) {
        // aqui nos aseguramos que el input contenga caracteres String y que valida
        // el v-model de this.nombre
      return (
        items.title
          .toLocaleLowerCase()
          .indexOf(this.nombres.toLocaleLowerCase()) >= 0
      );
    },
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
        this.mosImag++;

        this.spinner = false;

        this.getAttributes();
      }
    });
  },

  created() {
        // mandaremos a correr el metodo de consulta ala api

    this.getAttributes();
  },
};
</script>

<style scoped></style>
