<template>
  <Navbar />
  <div class="flex flex-row flex-wrap w-2/3 mx-auto">
    <div v-for="mission in myFavorites" :key="mission._id">
      <Cards
        :location="mission.location"
        :username="mission.user_name"
        :price="mission.price"
        :startdate="mission.start_date"
        :enddate="mission.end_date"
        :id="mission._id"
        :likes="mission.likes"
        :comments="mission.missionComments"
        @fetchCard="fetchMission"
        class="m-5"
      />
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Cards from "../components/Cards.vue";
export default {
  name: "likes",
  components: { Cards, Navbar },
  data() {
    return {
      myFavorites: "",
      user: "",
      token: "",
    };
  },
  methods: {
    fetchFavorites() {
      console.log(this.user._id);

      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/likes/" + this.user._id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            this.myFavorites = data;
          }
        })
        .catch((error) => console.log("error", error));

      // var myHeaders = new Headers();
      // myHeaders.append("Accept", "application/json");
      // myHeaders.append("Authorization", "Bearer " + this.token);

      // var requestOptions = {
      //   method: "GET",
      //   headers: myHeaders,
      //   redirect: "follow",
      // };

      // fetch("http://localhost:8000/api/likes/" + this.user._id, requestOptions)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data);
      //     if (data) {
      //       this.myFavorites = data;
      //     }
      //   })
      //   .catch((error) => console.log("error", error));
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
    this.fetchFavorites();
  },
};
</script>
