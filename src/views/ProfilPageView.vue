<script>
import Menu from "../components/Menu.vue";
import Cards from "../components/Cards.vue";
import Footer from "../components/Footer.vue";
import MyMissions from "../components/MyMissions.vue";
import Navbar from "../components/Navbar.vue";

import ModifPassword from "../components/ModifPassword.vue";
import MyMessaging from "../components/MyMessaging.vue";
import MyInformation from "../components/MyInformation.vue";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    MyMessaging,
    ModifPassword,
    MyMissions,
    Menu,
    Cards,
    Footer,
    MyInformation,
    Navbar,
  },
  data() {
    return {
      user: "",
      token: "",
      AllMyMission: [],
      displayMessaging: false,
      displayMissions: true,
      displayChangePassword: false,
    };
  },
  methods: {
    mission() {
      this.displayMissions = true;
      this.displayMessaging = false;
      this.displayChangePassword = false;
      this.displayMyInformation = false;
    },
    message() {
      this.displayMissions = false;
      this.displayMessaging = true;
      this.displayChangePassword = false;
      this.displayMyInformation = false;
    },
    change() {
      this.displayMissions = false;
      this.displayMessaging = false;
      this.displayChangePassword = true;
      this.displayMyInformation = false;
    },
    info() {
      this.displayMissions = false;
      this.displayMessaging = false;
      this.displayChangePassword = false;
      this.displayMyInformation = true;
    },
    getAllMyMission() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/user/" + this.user._id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          this.AllMyMission = result;
          console.log(result);
          console.log(this.user._id);
          console.log(this.token);
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
    } else {
      window.location.href = "/";
    }
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    }
    if (sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
    }
    this.getAllMyMission();
    // console.log(this.allMission)
  },
};
</script>
<template>
  <Navbar />

  <main>
    <div class="flex m-6 justify-center">
      <div class="sm:flex sm:gap-16 sm:mt-4 sm:justify-center">
        <div class="flex ml-5 gap-10 mt-4 w-screen flex-wrap justify-start">
          <div class="flex flex-col gap-6">
            <Menu @message="message" @mission="mission" @change="change" @info="info" />
          </div>
          <!-- emplacement div -->
          <div v-if="displayMyInformation" class="w-3/5">
            <MyInformation />
          </div>
          <div v-if="displayMessaging" class="w-3/5">
            <MyMessaging />
          </div>
          <div class="flex flex-wrap" v-for="mission in AllMyMission" :key="mission.id">
            <div v-if="displayMissions">
              <Cards :location="mission.location" :username="mission.user_name" :price="mission.price"
                :startdate="mission.start_date" :enddate="mission.end_date" :likes="mission.likes" :id="mission._id"
                :comments="mission.missionComments" />
            </div>
          </div>

          <div v-if="displayChangePassword" class="mr-21 ">
            <ModifPassword />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-7">
      <!-- <Pagination /> -->
    </div>

  </main>

</template>
