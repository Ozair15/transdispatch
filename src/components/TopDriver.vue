<template>
  <article
    class="border-2 rounded-lg bg-zinc-700 border-gray-400 shadow-xl w-64 h-52"
  >
    <div class="rounded-lg m-3">
      <div
        class="flex justify-center items-center py-2 px-3 border-b border-gray-400"
      >
        <div class="text-white text-lg">TOP 5 MISSIONS</div>
      </div>
      <div v-for="mission in classement" :key="mission._id">
        <router-link
          :to="`missions/${mission._id}`"
          class="flex flex-row justify-between items-center pt-1 mx-5"
        >
          <div class="text-white">{{ mission.location }}</div>
          <div>{{ mission.price }} <font-awesome-icon icon="euro-sign" /></div
        ></router-link>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      classement: "",
    };
  },
  methods: {
    fetchClassement() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/missionkpi", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            this.classement = data;
          }
        })
        .catch((error) => console.log("error", error));
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
    this.fetchClassement();
  },
};
</script>
