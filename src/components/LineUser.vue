<template>
  <th>
    <input type="checkbox" class="m-3" />
  </th>
  <td>
    <div class="text-black text-center w-32" v-if="!update">{{ name }}</div>
    <div v-else class="flex items-center justify-center">
      <input class="w-32 h-6 rounded px-3 text-gray-950 mx-2" v-model="name" />
    </div>
  </td>
  <td>
    <div v-if="!update" class="text-black text-center w-80">{{ email }}</div>
    <div v-else class="flex flex-col items-center justify-center">
      <span class="text-red-500 w-80" v-if="error">{{ error }}</span>
      <input class="w-80 h-6 rounded px-3 text-gray-950 mx-2" v-model="email" />
    </div>
  </td>
  <td class="text-center text-gray-960">
    <div v-if="!update" class="text-black text-center w-24">{{ admin }}</div>
    <div v-else class="flex items-center justify-center">
      <select v-model="admin">
        <option disabled value="">Admin ?</option>
        <option>true</option>
        <option>false</option>
      </select>
    </div>
  </td>
  <td class="text-center text-gray-960">
    <div v-if="!update" class="w-24">
      <font-awesome-icon
        icon="pen-to-square"
        @click="modifier()"
        class="mx-2 cursor-pointer"
      />
      <font-awesome-icon
        icon="trash"
        @click="supprUser()"
        class="mx-2 cursor-pointer"
      />
    </div>
    <div v-else class="w-24">
      <font-awesome-icon
        icon="fa-solid fa-user-check"
        class="mx-1.5 cursor-pointer"
        @click="updateUser"
      />
      <font-awesome-icon
        icon="fa-solid fa-rectangle-xmark"
        class="mx-1.5 cursor-pointer"
        @click="annuler"
      />
    </div>
  </td>
</template>
<script>
export default {
  components: {},
  props: ["email", "name", "id", "admin"],
  data() {
    return { update: false, error: "" };
  },
  methods: {
    modifier() {
      this.update = true;
    },
    annuler() {
      this.update = false;
    },
    updateUser() {
      if (this.email == "" || this.name == "") {
        this.error = "veuillez remplir tous les champs !";
      } else {
        this.error = "";
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

        let url = "http://localhost:8000/api/user/" + this.id;

        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              this.update = false;
              this.onload = false;
            }
          })
          .catch((error) => {
            if (error) {
              console.log("error", error);
            }
          });
      }
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

        let url = "http://localhost:8000/api/user/" + this.id;

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
