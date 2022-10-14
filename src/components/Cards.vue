<template>
  <article
    class="border-2 rounded-lg border-gray-400 shadow-xl w-64 h-52 bg-zinc-700 transform transition duration-500 hover:scale-110"
  >
    <div class="rounded-lg m-3">
      <div class="flex justify-between items-center border-b border-gray-400">
        <router-link :to="`missions/${id}`">
          <div class="text-white text-lg">By {{ username }}</div>
        </router-link>
        <img class="w-8 mb-2 rounded-full" src="@/assets/photo_profil.jpg" />
      </div>
      <div class="flex flex-col justify-between">
        <div class="py-2 text-sm text-gray-100">
          <div class="my-1 flex flex-row items-center">
            <font-awesome-icon icon="location-arrow" />
            <p class="pl-3">Mission sur : {{ location }}</p>
          </div>
          <div class="my-1 flex flex-row items-center">
            <font-awesome-icon icon="calendar-days" />
            <p class="pl-3">
              Du {{ dateTime(startdate) }} au {{ dateTime(enddate) }}
            </p>
            <!-- <p class="pl-3">Du 01/12 au 04/12</p> -->
          </div>
        </div>
        <div class="flex justify-center">
          <div class="text-white text-2xl">
            {{ price }}
            <font-awesome-icon icon="euro-sign" /> / j
          </div>
        </div>
        <div class="flex justify-between items-center py-2 px-3">
          <div>
            <button class="text-gray-100">
              <div v-if="liked == true">
                <font-awesome-icon
                  id="like"
                  class="text-red-600"
                  icon="heart"
                  @Click="
                    suppLikes();
                    emitFetch();
                  "
                />
              </div>
              <div v-else>
                <font-awesome-icon
                  icon="heart"
                  @Click="
                    addlike();
                    emitFetch();
                  "
                />
              </div>
            </button>
            {{ likes.length }}
          </div>
          <button class="text-gray-100">
            <font-awesome-icon icon="comments" /> {{ comments.length }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import moment from "moment";
export default {
  props: [
    "location",
    "username",
    "startdate",
    "enddate",
    "price",
    "id",
    "likes",
    "comments",
  ],
  data() {
    return {
      myLikes: "",
      user: "",
      token: "",
      liked: false,
      likeId: "",
    };
  },
  methods: {
    addlike() {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        user_id: this.user._id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/" + this.id + "/likes",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.likes) {
            // this.fetchLikes();
            this.liked = true;
          } else if (data.message == "Unauthenticated.") {
            window.location.href = "/connexion";
          } else {
            this.liked = false;
          }
        })
        .catch((error) => console.log("error", error));
    },
    nbComment() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/" + this.id + "/comments",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => (this.comments = data))
        .catch((error) => console.log("error", error));
    },
    dateTime(value) {
      return moment(value).format("DD/MM/YY");
    },
    fetchLikes() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/" + this.id + "/likes",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.myLikes = 0;
          } else {
            this.likes = data;
            // this.myLikes.forEach((value) => {
            //   if (value.user_id == this.user._id) {
            //     this.liked = true;
            //     this.likeId = value._id;
            //   }
            // });
          }
        })
        .catch((error) => console.log("error", error));
    },
    suppLikes() {
      // console.log(likeId);
      // var myHeaders = new Headers();
      // myHeaders.append("Accept", "application/json");
      // myHeaders.append("Authorization", "Bearer " + this.token);
      // var requestOptions = {
      //   method: "DELETE",
      //   headers: myHeaders,
      //   redirect: "follow",
      // };
      // fetch(
      //   "http://localhost:8000/api/missions/" + this.id + "/likes/" + likeId,
      //   requestOptions
      // )
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data) {
      //       this.fetchLikes();
      //       this.liked = "false";
      //     }
      //   })
      //   .catch((error) => console.log("error", error));
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/" +
          this.id +
          "/user/" +
          this.user._id,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // this.fetchLikes();
            this.liked = "false";
          }
        })
        .catch((error) => console.log("error", error));
    },
    checkLike() {
      this.liked = false;
      this.likes.forEach((value) => {
        if (value == this.user._id) {
          this.liked = true;
        }
      });
    },
    emitFetch() {
      console.log("jessaye de lancer le fetchmission");
      setTimeout(() => {
        this.$emit("fetchCard");
      }, 250);
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
    this.checkLike();
    // this.nbComment();
    // this.fetchLikes();
  },
  updated() {
    this.checkLike();
  },
};
</script>
