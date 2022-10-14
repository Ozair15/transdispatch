<template>
  <UserForgot />
</template>
<script>
import UserForgot from "../components/UserForgot.vue";
export default {
  components: { UserForgot },
  data() {
    return {};
  },
  methods: {},
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
