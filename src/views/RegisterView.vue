<template>
  <Navbar />
  <section>
    <div v-if="success" class="text-center my-5">
      <span class="mb-5"> Utilisateur créé ! </span>
    </div>
    <div class="flex flex-col items-center justify-center py-12 mx-auto">
      <div
        class="w-full bg-gray-950 rounded-lg shadow border-2 dark:border md:mt-0 sm:max-w-xs xl:p-0 dark:bg-gray-950 dark:border-gray-960"
      >
        <div class="p-4 space-y-2 md:space-y-4">
          <h1
            class="text-sm text-center font-bold leading-tight tracking-tight text-white md:text-lg dark:text-white"
          >
            Bienvenue !
          </h1>
          <div class="space-y-4 md:space-y-3">
            <div>
              <label
                for="name"
                class="block mb-2 text-xs font-medium text-white dark:text-white"
                >Pseudo</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pseudo..."
                v-model="name"
                required
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-xs font-medium text-white dark:text-white"
                >E-mail</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                v-model="email"
                required
              />
              <!--Mettre 'required=""' a gauche au besoin -->
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
                id="password"
                placeholder="••••••••"
                v-model="password"
                autocomplete="on"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <!--Mettre 'required=""' a gauche au besoin -->
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-xs font-medium text-white dark:text-white"
                >Confirmer votre mot de passe</label
              >
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                v-model="password_confirmation"
                autocomplete="on"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <!--Mettre 'required=""' a gauche au besoin -->
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div class="ml-3 text-xs">
                <label
                  for="terms"
                  class="font-light text-gray-300 dark:text-gray-300"
                  >J'accepte les
                  <a
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                    >conditions d'utilisation</a
                  ></label
                >
              </div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <button
                @click="register"
                :class="{ shake: disabled }"
                class="w-3/5 mb-1 dark:bg-gray-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                S'inscrire
              </button>
              <span v-if="disabled" class="text-red-700"
                >Veuillez remplir les champs !</span
              >
              <span v-if="error" class="text-red-700">{{ error }}!</span>
              <p
                id="text"
                class="text-xs mt-5 font-light text-gray-300 dark:text-gray-400"
              >
                Vous êtes déjà membre?
                <a
                  href="/connexion"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500 text-align: center"
                  >Connectez-vous</a
                >
                <br />
                <a
                  href="/"
                  class="font-medium text-red-400 hover:underline dark:text-primary-500 text-align: center"
                  >Annuler</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "inscription",
  components: {Navbar},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      disabled: false,
      error: "",
      success: "",
    };
  },
  methods: {
    register() {
      this.error = "";
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.password_confirmation
      ) {
        return this.warnDisabled();
      } else if (this.password !== this.password_confirmation) {
        this.error = "Ce n'est pas le même password !";
      } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        var raw = JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch("http://localhost:8000/api/register", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.errors);
            if (data.errors) {
              if (data.errors.email) {
                this.error = "Ce mail existe déjà !";
                // console.log("mail existe deja !");
              }
              if (data.errors.name) {
                this.error = "Ce pseudo existe déjà !";
                // console.log("name existe déja !");
              }
            } else {
              this.success = true;
              sessionStorage.setItem("user", JSON.stringify(data.user));
              sessionStorage.setItem("token", data.token);
              this.user = JSON.parse(sessionStorage.getItem("user"));
              this.logged = !this.logged;

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
#text {
  text-align: center;
}

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
