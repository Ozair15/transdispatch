<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-960 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        id="menu-button"
        :aria-expanded="active ? 'true' : 'false'"
        aria-haspopup="true"
        @click="dropdown"
      >
        Bonjour {{ user.name }}
        <!-- Heroicon name: mini/chevron-down -->
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      v-if="active"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          href="/admin"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-960"
          role="menuitem"
          tabindex="-1"
          v-if="user.admin"
          >Administrateur</a
        >
        <a
          href="/likes"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-960"
          role="menuitem"
          tabindex="-1"
          >Mes likes
        </a>
        <a
          href="/profil"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-960"
          role="menuitem"
          tabindex="-1"
          >Mon espace utilisateur
        </a>
        <a
          href="/support"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-960"
          role="menuitem"
          tabindex="-1"
          >Support</a
        >
        <a
          href="/license"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-960"
          role="menuitem"
          tabindex="-1"
          id="menu-item-2"
          >License</a
        >

        <div @click="logout">
          <button
            type="submit"
            class="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-960"
            role="menuitem"
            tabindex="-1"
            id="menu-item-3"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["username"],
  components: {},
  data() {
    return {
      active: false,
      user: "",
      token: "",
    };
  },
  methods: {
    dropdown() {
      this.active = !this.active;
    },
    logout() {
      this.logged = !this.logged;
      this.email = "";
      this.password = "";

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/logout", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data) {
            if (sessionStorage.getItem("user")) {
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("token");
            } else {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
            }
            window.location.href = "/";
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
