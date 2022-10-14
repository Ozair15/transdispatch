<template>
  <div
    class="bg-gray-950 text-gray-100 px-6 shadow md:flex justify-between items-center border-b-2 border-gray-960"
    id="container"
  >
    <div class="flex justify-center">
      <a href="/"
        ><img
          src="/src/assets/prototype.png"
          class="w-20"
          alt="Prototype volants"
      /></a>
    </div>
    <div action="" class="m-3">
      <div class="text-gray-960 focus-within:text-gray-900" id="divIcon">
        <font-awesome-icon icon="magnifying-glass" id="loupe" />
        <input
          type="text"
          name="search"
          id="searchbar"
          placeholder="Rechercher une mission..."
          autocomplete="off"
          aria-label="Search a mission"
          class="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          @keyup.enter="emitSearch"
          v-model="this.query"
        />
      </div>
    </div>
    <div class="flex space-x-4" v-if="!user">
      <a href="/inscription">
        <Button class="bg-slate-100 text-gray-700">S'enregistrer</Button>
      </a>
      <a href="/connexion">
        <Button class="bg-gray-500 text-slate-100">Se connecter</Button>
      </a>
    </div>
    <div v-else class="flex space-x-10">
      <a href="/ajout-mission">
        <Button class="border border-gray-960 text-gray-700 mx-5"
          ><font-awesome-icon icon="plus" class="mr-2" /> Mission</Button
        >
      </a>
      <Dropdown />
    </div>
  </div>
</template>
<script>
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";

export default {
  components: {
    Button,
    Dropdown,
  },
  data() {
    return {
      user: "",
      token: "",
      query: "",
    };
  },
  methods: {
    emitSearch() {
      this.$emit("searchMission", this.query);
      this.query = "";
    },
  },
  mounted() {
    if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
      this.logged = true;
      localStorage.getItem("user")
        ? (this.user = JSON.parse(localStorage.getItem("user")))
        : (this.user = JSON.parse(sessionStorage.getItem("user")));
    }
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    }
    if (sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
    }
  },
};
</script>

<style>
/* #searchbar {
  width: 600px;
  /* position: relative;
} */
#loupe {
  position: absolute;
  top: 12px;
  left: 15px;
  z-index: 7;
}
#divIcon {
  position: relative;
  z-index: 1;
}

@media screen and (min-width: 600px){
  #searchbar {
    width: 600px;
  }
}
@media screen and (max-width: 600px){
  #container {
    padding-bottom: 2em;
  }
}

</style>
