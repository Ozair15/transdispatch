<script>
import MessangingCard from './MessangingCard.vue';

export default {
    components:{MessangingCard}
   

}

</script>
<template>
    <div class="rounded-lg bg-gray-200 h-96 w-max overflow-auto ">
        <div class="flex justify-between mx-3 border-b-2 border-zinc-500 p-3 text-gray-800">
            <div>Messagerie</div>
            <button class="text-zinc-500 border rounded-lg px-1 border-zinc-400">
                <font-awesome-icon class="mr-1" icon="paper-plane" />Nouveau
            </button>
        </div>
        <MessangingCard />
        <MessangingCard />
       
       </div>
       
</template>