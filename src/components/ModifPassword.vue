<template>
  <section>
    <div class="flex flex-col items-center justify-center rounded-lg lg:py-0">
      <div
        class="p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
      >
        <h2
          class="mb-1 text-md font-bold leading-tight tracking-tight text-white dark:text-white"
        >
          Modifier votre mot de passe
        </h2>
        <div class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          <div>
            <label
              for="old_password"
              class="block mb-2 text-xs font-medium text-white dark:text-white"
              >Ancien mot de passe</label
            >
            <input
              type="password"
              v-model="old_password"
              name="old_password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-xs font-medium text-white dark:text-white"
              >Nouveau Mot de passe</label
            >
            <input
              type="password"
              v-model="new_password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-xs font-medium text-white dark:text-white"
              >Confirmez votre mot de passe</label
            >
            <input
              type="password"
              name="confirm-password"
              v-model="new_password_confirmation"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <span v-if="error" class="text-red-700 text-center"
            >{{ error }}!</span
          >
          <span v-if="success" class="text-green-700 text-center"
            >{{ success }}!</span
          >
          <div class="flex justify-center items-center">
            <Button
              @click="updatePassword"
              class="border border-gray-960 text-gray-700 mx-5"
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Button from "./Button.vue";
export default {
  components: { Button },
  data() {
    return {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
      error: "",
      user: "",
      token: "",
      success: "",
    };
  },
  methods: {
    updatePassword() {
      if (this.new_password !== this.new_password_confirmation) {
        this.error = "les mots de passes ne sont pas identiques ! ";
        this.new_password = "";
        this.new_password_confirmation = "";
        setTimeout(() => {
          this.error = "";
        }, 5000);
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + this.token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          old_password: this.old_password,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "http://localhost:8000/api/changePassword/" + this.user._id,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.error = "Votre ancien mot de passe est mauvais !";
            } else {
              this.success = "Votre mot de passe est à jour !";
              this.old_password = "";
              this.new_password = "";
              this.new_password_confirmation = "";
              setTimeout(() => {
                this.success = "";
              }, 5000);
            }
          })
          .catch((error) => console.log("error", error));
      }
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
