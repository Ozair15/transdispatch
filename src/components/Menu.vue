<script>
export default {
    emits: ["mission", "message", "change", "info"],
    methods: {
        message() {
            this.$emit("message");
        },
        mission() {
            this.$emit("mission");
        },
        change() {
            this.$emit("change");
        },
        change() {
            this.$emit("info");
        },
    }
}

</script>

<template>
    <article class="border-2 rounded-lg bg-zinc-700 border-gray-400 shadow-xl w-52 h-48">
        <div class=" rounded-lg ">
            <div class="flex justify-center items-center py-2 px-3 border-b border-gray-400">
                <div class="text-white text-lg">Mon compte</div>
            </div>

            <div class="flex justify-center items-center mt-2">
                <button  @click="$emit('info')" class="text-white">Mes informations </button>

            </div>
            <div class="flex justify-center items-center mt-2">
                <button @click="$emit('message')" class="text-white">Ma messagerie </button>

            </div>
            <div class="flex justify-center items-center mt-2">
                <button @click="$emit('mission')" class="text-white">Mes missions </button>

            </div>
            <div class="flex justify-center items-center mt-2">
                <button @click="$emit('change')" class="text-white">Changer mon mot de passe </button>

            </div>
        </div>

    </article>
</template>