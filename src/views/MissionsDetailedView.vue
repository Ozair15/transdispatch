<template>
  <Navbar />
  <main>
    <MissionDetailed />
  </main>
</template>

<script>
import MissionDetailed from "../components/MissionDetailed.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "missions",
  components: { MissionDetailed, Navbar },
  data() {
    return {
      user: "",
    };
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
