<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div
        class="w-full bg-gray-950 rounded-lg shadow border-2 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-950 dark:border-gray-960"
      >
        <div class="p-5 border-b flex flex-row justify-between">
          <h1
            class="text-xl leading-tight tracking-tight text-white md:text-2xl dark:text-white"
          >
            Mission Proposée par {{ oneMission.user_name }}
          </h1>
          <div v-if="this.logged == true" class="flex flex-row items-center">
            <div
              v-if="
                this.user._id == oneMission.user_id || this.user.admin == true
              "
            >
              <font-awesome-icon
                icon="pen-to-square"
                @click="modifier()"
                class="mx-2"
              />
              <font-awesome-icon
                icon="trash"
                @click="supprMission()"
                class="ml-2"
              />
            </div>
          </div>
        </div>
        <div class="py-2 px-2 mx-3 mt-3 text-xs text-gray-100">
          <div class="border-b">
            <div class="flex justify-between">
              <div class="mr-9 w-1/2">
                <p class="mr-10">
                  <font-awesome-icon icon="list" /> Descriptif :
                </p>
                <!-- le content de la mission en "p" pour le public et en "textarea" pour les admin ou owner -->
                <div v-if="!update">
                  <p class="my-2">
                    {{ oneMission.mission_content }}
                  </p>
                  <span
                    v-if="onloadSupp"
                    class="flex justify-center items-center w-full"
                    >En cours de suppression...</span
                  >
                </div>
                <div v-else>
                  <textarea
                    name="updateComment"
                    v-model="oneMission.mission_content"
                    class="w-60 text-xs h-20 rounded-lg mt-2 pt-2 pl-2 text-gray-950"
                    rows="10"
                  ></textarea>
                  <span
                    v-if="onload"
                    class="flex justify-center items-center w-full"
                    >En cours de modification...</span
                  >
                </div>
                <!--                                 fin                                               -->
              </div>
              <div class="my-1 flex flex-col items-center">
                <div class="my-1 flex flex-row items-center">
                  <font-awesome-icon icon="location-arrow" />
                  <p v-if="!update" class="pl-3">
                    Mission sur : {{ oneMission.location }}
                  </p>
                  <input
                    v-else
                    type="text"
                    name="start_date"
                    v-model="oneMission.location"
                    class="w-24 h-6 rounded-md font-semibold px-1.5 text-gray-950 mx-2"
                  />
                </div>
                <img
                  class="max-h-40 min-w-40 rounded-xl"
                  src="@/assets/photo_gogole.webp"
                />
              </div>
            </div>
            <div v-if="!update">
              <p>
                <font-awesome-icon icon="calendar-days" /> Du
                {{ dateTime(oneMission.start_date) }} au
                {{ dateTime(oneMission.end_date) }}
              </p>
              <span
                v-if="onloadSupp"
                class="flex justify-center items-center w-full"
                >En cours de suppression...</span
              >
            </div>
            <div v-else class="flex flex-row justify-start items-center mt-5">
              <font-awesome-icon icon="calendar-days" />
              <p class="mx-2">Du</p>
              <input
                type="date"
                name="start_date"
                v-model="oneMission.start_date"
                class="w-30 h-6 rounded-md font-semibold px-1.5 text-gray-950"
              />
              <p class="mx-2">au</p>
              <input
                type="date"
                name="start_date"
                v-model="oneMission.end_date"
                class="w-30 h-6 rounded-md font-semibold px-1.5 text-gray-950"
              />
            </div>
            <div class="flex flex-row justify-between m-5">
              <div
                class="border p-2 rounded border-gray-400 text-white text-lg flex flex-row items-center"
              >
                <div v-if="!update">
                  <p>Forfait jour: {{ oneMission.price }}€</p>
                  <span
                    v-if="onloadSupp"
                    class="flex justify-center items-center w-full"
                    >En cours de suppression...</span
                  >
                </div>
                <div v-else>
                  Forfait jour:s
                  <input
                    type="number"
                    name="updateprice"
                    v-model="oneMission.price"
                    class="w-14 h-8 rounded-md text-gray-600 font-semibold mx-2 text-center"
                  />
                </div>
              </div>
              <div v-if="update" class="flex-col">
                <Button class="bg-gray-500 mb-2" @click="updateMission"
                  >Mettre à jour</Button
                >
                <br />
                <Button class="bg-gray-400 text-red-500" @click="annuler"
                  >Annuler</Button
                >
              </div>
              <div v-else class="flex items-center">
                <Button class="bg-gray-500"> Je postule</Button>
              </div>
            </div>
          </div>
          <div v-if="!update" class="mt-2">
            <textarea
              class="w-full text-xs h-20 rounded-lg mt-2 pt-2 pl-2 text-gray-950"
              name=""
              id=""
              cols=""
              rows="10"
              placeholder="Commentaire..."
              v-model="myComment"
            ></textarea>
            <div class="text-end my-2">
              <Button class="bg-gray-500" @click="addComment"> Valider </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full rounded-lg shadow border-2 dark:border sm:max-w-md dark:bg-gray-950 dark:border-gray-960 mt-5 p-2"
        v-for="comment in comments"
        :key="comment._id"
      >
        <Comment
          :user_name="comment.user_name"
          :comment_content="comment.comment_content"
          :user_id="comment.user_id"
          :comment_id="comment._id"
          @supprimer="supprimer"
          :key="comment.id"
        />
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import { comment } from "postcss";
import Button from "/src/components/Button.vue";
import Comment from "/src/components/Comment.vue";

export default {
  name: "missions",
  components: { Button, Comment },
  data() {
    return {
      oneMission: [],
      comments: [],
      myComment: "",
      user: "",
      token: "",
      update: false,
      onload: false,
      onloadSupp: false,
      logged: false,
    };
  },
  async beforeMount() {
    this.fetched_oneMission();
    this.fetched_comment();
  },
  methods: {
    dateTime(value) {
      return moment(value).format("DD/MM/YY");
    },
    modifier() {
      this.update = true;
    },
    annuler() {
      this.update = false;
    },
    updateMission() {
      this.onload = true;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);
      console.log(this.oneMission.location);

      var raw = JSON.stringify({
        mission_content: this.oneMission.mission_content,
        start_date: this.oneMission.start_date,
        end_date: this.oneMission.end_date,
        price: this.oneMission.price,
        location: this.oneMission.location,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let url = "http://localhost:8000/api/missions/" + this.oneMission._id;

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.update = false;
            this.onload = false;
            // location.reload();
          }
        })
        .catch((error) => console.log("error", error));
    },
    supprMission() {
      if (confirm("Etes vous sûre de vouloire supprimer cette mission ?")) {
        this.onload = true;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + this.token);

        var raw = "";

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        let url = "http://localhost:8000/api/missions/" + this.oneMission._id;

        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              window.location.href = "/";
            }
          })
          .catch((error) => console.log("error", error));
      }
    },
    async fetched_oneMission() {
      let id = this.$route.params.id;

      let fetched_oneMission = await fetch(
        "http://localhost:8000/api/missions/" + id
      );
      this.oneMission = await fetched_oneMission.json();
    },
    async fetched_comment() {
      let id = this.$route.params.id;
      let fetched_comment = await fetch(
        "http://localhost:8000/api/missions/" + id + "/comments"
      );
      this.comments = await fetched_comment.json();
    },
    repondre() {
      console.log("je suis la fonction repondre du commentaire");
    },
    supprimer($id) {
      let mission_id = this.$route.params.id;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const url =
        "http://localhost:8000/api/missions/" + mission_id + "/comments/" + $id;

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.fetched_comment();
          }
        })
        .catch((error) => console.log("error", error));
    },
    addComment() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var raw = JSON.stringify({
        user_id: this.user._id,
        user_name: this.user.name,
        comment_content: this.myComment,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions/" +
          this.oneMission._id +
          "/comments",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => this.fetched_comment())
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
  },
};
</script>
