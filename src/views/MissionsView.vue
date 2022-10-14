<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="mission in allMission" :key="mission.id">
      <div v-for="miss in mission" :key="miss.id">
        <p>hello {{ miss.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "missions",
  components: {},
  data() {
    return {
      allMission: [],
      user: "",
      token: "",
      logged: false,
      isSearching: false,
      query: "",
      gameId: "",
      order: "",
    };
  },
  methods: {
    fetchMission() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/missions", requestOptions)
        .then((response) => response.json())
        .then((result) => (this.allMission = result))
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    // if (localStorage.getItem('user') || sessionStorage.getItem('user')) {
    //     this.logged = true
    //     localStorage.getItem('user') ? this.user = JSON.parse(localStorage.getItem('user')) : this.user = JSON.parse(sessionStorage.getItem('user'))
    // }
    // if (localStorage.getItem('token')) {
    //     this.token = localStorage.getItem('token')
    // }
    // if (sessionStorage.getItem('token')) {
    //     this.token = sessionStorage.getItem('token')
    // }
    this.fetchMission();
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
