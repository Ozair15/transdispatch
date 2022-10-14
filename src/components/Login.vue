<template>
  <Navbar />
  <section class="">
    <div v-if="success" class="text-center my-5">
      <span class="mb-5"> Vous êtes connecté ! </span>
    </div>
    <div class="flex flex-col items-center justify-center px-6 py-16 mx-auto">
      <div
        class="w-full rounded-lg shadow border-2 md:mt-0 sm:max-w-xs xl:p-0 dark:bg-gray-950 dark:border-gray-960"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-lg font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
          >
            Connexion
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-xs font-medium text-white dark:text-white"
                >Votre email</label
              >
              <input
                type="email"
                name="email"
                v-model="email"
                id="email"
                class="border border-gray-960 text-gray-950 sm:text-xs rounded-lg block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-960 dark:focus:border-gray-960"
                placeholder="nom@compagnie.com"
              /><!--Mettre 'required=""' a gauche au besoin -->
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-xs font-medium text-white dark:text-white"
                >Mot de passe</label
              >
              <input
                type="password"
                name="password"
                v-model="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /><!--Mettre 'required=""' a gauche au besoin -->
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col items-center justify-between">
                <div class="flex items-center h-5 mb-2">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  /><!--Mettre 'required=""' a gauche au besoin -->
                  <label
                    for="remember"
                    class="text-gray-300 dark:text-gray-300 ml-3 text-xs"
                    >Se souvenir de moi</label
                  >
                </div>
                <a
                  href="forgot-password"
                  class="text-xs font-medium text-primary-600 text-gray-300 hover:underline dark:text-primary-500 mb-2"
                  >Mot de passe oublié?</a
                >
              </div>
              <Button
                @click="login"
                type="submit"
                :class="{ shake: disabled }"
                class="w-1/2 bg-gray-500 mx-auto my-2"
              >
                Connexion
              </Button>
              <span v-if="error" class="text-red-700 text-center"
                >{{ error }}!</span
              >
              <span v-if="disabled" class="text-red-700"
                >Veuillez remplir les champs !</span
              >
              <div
                class="text-xs font-light text-gray-200 dark:text-gray-400 text-center mt-3"
              >
                Vous n'avez pas encore de compte?
                <a
                  href="/inscription"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Inscription</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "./Button.vue";
import Navbar from "./Navbar.vue";
export default {
  name: "Connexion",
  components: { Button, Navbar },
  data() {
    return {
      email: "",
      password: "",
      disabled: false,
      error: "",
      user: "",
      remember: false,
      success: "",
    };
  },
  methods: {
    login() {
      this.error = "";
      if (!this.email || !this.password) {
        return this.warnDisabled();
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Accept", "application/json");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.email);
        urlencoded.append("password", this.password);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };

        fetch("http://localhost:8000/api/login", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              this.error = "Email ou Password incorrect !";
            } else {
              this.success = true;
              if (this.remember) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                this.user = JSON.parse(localStorage.getItem("user"));
                this.logged = !this.logged;
              } else {
                sessionStorage.setItem("user", JSON.stringify(data.user));
                sessionStorage.setItem("token", data.token);
                this.user = JSON.parse(sessionStorage.getItem("user"));
                this.logged = !this.logged;
              }
              this.email = "";
              this.password = "";
              this.remember = true;

              setTimeout(() => {
                window.location.href = "/";
              }, 2000);
            }
          })
          .catch((error) => console.log("error", error));
      }
    },
    warnDisabled() {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1500);
    },
  },
};
</script>
<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
