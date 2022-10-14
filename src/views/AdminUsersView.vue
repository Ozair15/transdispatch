<script>
import AdminUser from "../components/AdminUser.vue";
import Navbar from "../components/Navbar.vue";
import LineUser from "../components/LineUser.vue";

export default {
  name: "AdminUsers view",
  components: {
    AdminUser,
    Navbar,
    LineUser,
  },
  data() {
    return {
      user: "",
      token: "",
      logged: false,
      allUsers: [],
      update: false,
      onload: false,
      onloadSupp: false,
    };
  },
  methods: {
    modifier() {
      this.update = true;
    },
    annuler() {
      this.update = false;
    },
    updateUser() {
      this.onload = true;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var raw = JSON.stringify({
        name: this.name,
        email: this.email,
        admin: this.admin,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let url = "http://localhost:8000/api/user/" + this._id;

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.update = false;
            this.onload = false;
            location.reload();
          }
        })
        .catch((error) => {
          if (error) {
            console.log("error", error);
            location.reload();
          }
        });
    },
    supprUser() {
      if (confirm("Etes vous sûre de vouloire supprimer cette utilisateur ?")) {
        this.onloadSupp = true;

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

        let url = "http://localhost:8000/api/user/" + this._id;

        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              location.reload();
            }
          })
          .catch((error) => {
            if (error) {
              console.log("error", error);
              location.reload();
            }
          });
      }
    },

    fetchUsers() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + this.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8000/api/allusers", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          this.allUsers = result;
          console.log(result);
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
    //---------------------------------  a mettre une verification si admin ou redirect ------------------------------------
    this.fetchUsers();
  },
};
</script>

<template>
  <Navbar />
  <div class="flex justify-center">
    <table
      class="table-auto overflow-auto text-base bg-gray-200 rounded-lg h-64 w-2/5"
    >
      <thead class="border-b border-gray-400">
        <tr class="h-8">
          <th class=""><input class="p-2" type="checkbox" /></th>
          <th class="text-black mt-2">Name</th>
          <th class="text-black">E-mail</th>
          <th class="text-black">Admin</th>
          <th class="text-black">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-8" v-for="user in this.allUsers" :key="user._id">
          <LineUser
            :name="user.name"
            :email="user.email"
            :id="user._id"
            :admin="user.admin"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
