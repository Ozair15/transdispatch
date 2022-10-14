<template>
    <div class="rounded-lg bg-zinc-700 flex items-center  w-max h-96">
        <div class="flex mx-3 border-zinc-500 p-3 text-gray-800">
            <div class="flex flex-col justify-center pl-16">
                <div class="flex flex-col items-center pt-3.5">
                    <h1 class="text-xs text-zinc-50">Modififiez votre nom d'utilisateur :</h1>
                    <input type="text" class="rounded text-align-center text-xs p-1 mt-1.5" v-model="user.name">
                    <Button class="border rounded  border-zinc-600 text-xs text-white p-1 bg-zinc-500 mt-2">
                        Valider
                    </Button>
                </div>
                <div class="flex flex-col items-center pt-3.5">
                    <h1 class="text-xs text-zinc-50">Modififiez votre email :</h1>
                    <input type="email" class="rounded text-align-center text-xs w-44 p-1 mt-1.5" v-model="user.email">
                    <Button class="border rounded  border-zinc-600 text-xs text-white p-1 bg-zinc-500 mt-2">
                        Valider
                    </Button>
                </div>
            </div>
            <div class="flex flex-col items-center p-16">
                <img class="w-40 rounded-full" src="@/assets/photo_profil.jpg">
                <Button class="border rounded  border-zinc-600 text-xs text-white p-1 bg-zinc-500 mt-2">
                    Changer de photo
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
import Button from "./Button.vue";

export default {
    components: { Button },
    data() {
        return {
            user: "",
            token: "",
            allUsers: [],
        };
    },
    methods: {
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
        this.fetchUsers();
    },
};
</script>