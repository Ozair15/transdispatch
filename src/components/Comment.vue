<template>
  <h1
    class="text-white text-xl border-b-2 flex flex-row justify-between items-center"
  >
    <p class="py-2">{{ user_name }}</p>

    <div v-if="this.logged == true">
      <div v-if="this.user._id == user_id || this.user.admin == true">
        <font-awesome-icon
          icon="pen-to-square"
          class="mx-3"
          @click="modifier(comment_id)"
        />
        <font-awesome-icon icon="trash" @click="supprimer(comment_id)" />
      </div>
    </div>
  </h1>
  <div v-if="!update">
    <p class="py-2">{{ comment_content }}</p>
    <span v-if="onloadSupp" class="flex justify-center items-center w-full"
      >En cours de suppression...</span
    >
  </div>
  <div v-else>
    <textarea
      name="updateComment"
      v-model="comment_content"
      class="w-full text-xs h-20 rounded-lg mt-2 pt-2 pl-2 text-gray-950"
      rows="10"
    ></textarea>
    <div class="flex flex-row justify-end">
      <Button class="bg-gray-500" @click="updateComment">Mettre à jour</Button>
    </div>
    <span v-if="onload" class="flex justify-center items-center w-full"
      >En cours de modification...</span
    >
  </div>
</template>

<script>
import Button from "/src/components/Button.vue";

export default {
  name: "missions",
  components: { Button },
  data() {
    return {
      user: "",
      update: false,
      token: "",
      onload: false,
      onloadSupp: false,
      logged: false,
    };
  },
  props: ["user_name", "comment_content", "user_id", "comment_id"],
  emits: ["supprimer"],
  methods: {
    modifier() {
      this.update = true;
    },
    supprimer(id) {
      this.$emit("supprimer", id);
      this.onloadSupp = true;
    },
    updateComment() {
      this.onload = true;
      let mission_id = this.$route.params.id;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var raw = JSON.stringify({
        comment_content: this.comment_content,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let url =
        "http://localhost:8000/api/missions/" +
        mission_id +
        "/comments/" +
        this.comment_id;

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.update = false;
            this.onload = false;
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
  },
};
</script>
