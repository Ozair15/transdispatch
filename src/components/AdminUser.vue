<script>
export default {
    props: [
        "_id",
        "name",
        "email",
        "admin",
    ],
    data() {
        return {
            token: "",
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

    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.token = localStorage.getItem("token");
        }
        if (sessionStorage.getItem("token")) {
            this.token = sessionStorage.getItem("token");
        }
    },
};
</script>

<template>
    <div v-if="!update">
        <tr>
            
            <td>{{name}}</td>
            <td>{{email}}</td>
            <td>{{admin}}</td>
            <td>            
                <font-awesome-icon
                icon="pen-to-square"
                @click="modifier()"
                class="mx-2"
                />
            </td>
            <td>
                <font-awesome-icon
                icon="trash"
                @click="supprUser()"
                class="ml-2"
                />
            </td>
        </tr>
        <span
        v-if="onloadSupp"
        class="flex justify-center items-center w-full"
        >En cours de suppression...</span
        >
    </div>
    <div v-else>
        <tr>
            <td>
                <td>{{_id}}</td>
            </td>
            <td>
                <input 
                class="text-gray-950"
                v-model="name"
                />
            </td>
            <td>
                <input 
                class="text-gray-950"
                v-model="email"
                />
            </td>
            <td>
                <input 
                class="text-gray-950"
                v-model="admin"
                />
            </td>
            <td>
                <!-------------- ne fonctionne pas -------------------
                <font-awesome-icon 
                icon="fa-regular fa-rectangle-xmark"
                @click="annuler()"
                class="ml-2"
                /> -->
                <Button class="bg-gray-500 mb-2" @click="updateUser">
                Mettre à jour
                </Button>
            </td>
            <td>
                <Button class="bg-gray-400 text-red-500" @click="annuler">
                Annuler
                </Button>
            </td>
        </tr>
        <span
        v-if="onload"
        class="flex justify-center items-center w-full"
        >En cours de modification...</span
        >
    </div>

</template>
