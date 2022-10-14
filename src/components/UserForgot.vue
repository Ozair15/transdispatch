<template>
  <div class="w-1/4 border rounded-2xl border-gray-960 m-auto">
    <h1 class="text-center text-xl text-white m-5">Mot de passe oublié !</h1>
    <div class="warning--message"></div>
    <div class="success--message"></div>
    <div class="m-5">
      <label for="email">E-mail</label>
      <input
        type="email"
        class="border border-gray-960 text-gray-950 sm:text-xs rounded-lg block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-960 dark:focus:border-gray-960"
        name="email"
        id="email"
        v-model="email"
        required
      />

      <Button class="w-1/3 bg-gray-500 mx-auto my-2" @click="sendmail"
        >Envoyer</Button
      >
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
  data() {
    return {
      email: "",
      email_error: "*",
      forgot_success: false,
    };
  },
  methods: {
    warning(message) {
      document.querySelector(".warning--message").innerText = message;
      setTimeout(() => {
        document.querySelector(".warning--message").innerText = "";
      }, 3000);
    },
    success(message) {
      document.querySelector(".success--message").innerText = message;
    },
    resetfields() {
      this.email = "";
    },
    validateEmail(email) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },
    checkdata() {
      if (this.email == "") {
        this.warning("Email can't be empty");
        setTimeout(() => {
          return false;
        }, 3000);
      } else if (!this.validateEmail(this.email)) {
        this.warning("Syntax error in email field");
        setTimeout(() => {
          return false;
        }, 3000);
      } else {
        return true;
      }
    },
    sendmail() {
      if (this.checkdata()) {
        let url = "http://127.0.0.1:8000/api/password/email";

        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              this.warning(data.error);
            } else {
              this.success(data.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
