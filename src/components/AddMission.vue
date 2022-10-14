<template>
  <section>
    <div v-if="success" class="text-center my-5">
      <span class="mb-5"> Mission ajoutée ! </span>
    </div>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-5"
    >
      <div
        class="w-full bg-zinc-700 rounded-lg shadow border-2 dark:border md:mt-0 max-w-xl xl:p-0 dark:bg-gray-950 dark:border-gray-960"
      >
        <div class="p-5 border-b space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl leading-tight tracking-tight text-white md:text-2xl dark:text-white"
          >
            Déposez votre mission
          </h1>
        </div>
        <div class="py-2 px- mx-3 mt-3 text-xs text-gray-100">
          <div class="flex justify-between">
            <div>
              <p><font-awesome-icon icon="list" /> Descriptif:</p>
              <textarea
                class="w-80 text-xs h-20 rounded-lg mt-2 pt-2 pl-2 text-gray-950"
                name=""
                id=""
                cols=""
                rows="10"
                placeholder="Description..."
                v-model="mission_content"
              ></textarea>
            </div>

            <img
              class="w-32 mr-4 rounded-xl"
              src="@/assets/photo_gogole.webp"
            />
          </div>
          <div class="mb-2 flex flex-col items-start">
            <div class="flex flex-row items-center mb-2">
              <font-awesome-icon icon="location-arrow" />
              <p class="mx-1">Localisation :</p>
            </div>
            <input
              type="text"
              v-model="location"
              class="text-gray-950 rounded-md font-semibold px-1.5 h-6"
              placeholder="Cannes..."
            />
          </div>

          <div class="mb-2">
            <div class="flex flex-row items-center mb-2">
              <font-awesome-icon icon="calendar-days" />
              <p class="mx-1">Mission du :</p>
            </div>
            <div class="flex flex-row items-center">
              <input
                type="date"
                name="start_date"
                class="w-30 h-6 rounded-md text-gray-950 font-semibold px-1.5 form-control"
                min="2018-01-01"
                max="2025-12-31"
                v-model="start_date"
              />
              <p class="mx-2">au</p>

              <input
                type="date"
                name="end_date"
                class="w-30 h-6 rounded-md font-semibold px-1.5 text-gray-950 form-control"
                min="2018-01-01"
                max="2025-12-31"
                v-model="end_date"
              />
            </div>
          </div>
          <div class="flex justify-center mt-5">
            <div
              class="border p-2 rounded-md border-gray-400 text-white text-lg flex flex-row items-center justify-center w-60 sm:w-5/12"
            >
              <p id="prix">Forfait jour :</p>
              <input
                type="number"
                class="w-20 sm:w-14 h-8 sm:rounded-md text-gray-600 font-semibold pl-2 mx-2"
                placeholder="..."
                v-model="price"
              />
              <p>€</p>
            </div>
          </div>
        </div>

        <div class="text-end mr-2">
          <Button
            class="border border-gray-960 text-gray-700 m-5"
            @click="addMission"
          >
            Valider</Button
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment";
import Button from "./Button.vue";
export default {
  components: { Button },
  data() {
    return {
      user: "",
      location: "",
      mission_content: "",
      start_date: moment().format("2022-07-22", "DD-MM-YYYY"),
      end_date: moment().format("2022-07-22", "DD-MM-YYYY"),
      price: 0,
      likes: 0,
      success: false,
      token: "",
    };
  },
  methods: {
    addMission() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      const startDate = this.start_date.toString();
      const endDate = this.end_date.toString();

      var raw = JSON.stringify({
        mission_content: this.mission_content,
        user_id: this.user._id,
        user_name: this.user.name,
        location: this.location,
        start_date: startDate,
        end_date: endDate,
        price: this.price,
        likes: this.likes,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/missions/add", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.success = true;
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
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
    } else {
      window.location.href = "/";
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
@media screen and (max-width: 600px){
  img{
    visibility: hidden;
  }
  textarea{
    width: 280px !important;
  }
  #prix{
    font-size: medium;
  }
}
@media screen and (min-width: 600px){
  #container {
    padding-bottom: 2em;
  }
}
</style>