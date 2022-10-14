<script>
import moment from "moment";
export default {
  props: [
    "location",
    "username",
    "startdate",
    "enddate",
    "price",
    "likes",
    "id",
  ],
  methods: {
    dateTime(value) {
      return moment(value).format("DD/MM/YY");
    },
  },
};
</script>

<template>
  <div class="flex flex-wrap w-max">
    <article class="border-2 rounded-lg border-gray-400 shadow-xl w-52">
      <div
        class="bg-zinc-700 rounded-lg transform transition duration-500 hover:scale-110"
      >
        <div
          class="flex justify-between items-center py-2 px-3 border-b border-gray-400"
        >
          <router-link :to="`missions/${id}`">
            <div class="text-white text-lg">By {{ username }}</div></router-link
          >
          <img class="w-10 rounded-full" src="@/assets/photo_profil.jpg" />
        </div>
        <div class="py-2 px-2 text-xs text-gray-100">
          <p class="m-1">
            <font-awesome-icon icon="location-arrow" /> Mission sur:
            {{ location }}
          </p>
          <p class="m-1">
            <font-awesome-icon icon="calendar-days" /> Du {{ startdate }}test au
            {{ dateTime(enddate) }}
          </p>
        </div>
        <div class="flex justify-center">
          <div class="text-white text-xl">{{ price }} €/j</div>
        </div>

        <div class="flex justify-between items-center py-2 px-3">
          <button class="text-gray-100">
            <font-awesome-icon icon="heart" /> {{ likes }}
          </button>
          <button class="text-gray-100">
            <font-awesome-icon icon="comments" /> {{ comments }}
          </button>
        </div>
      </div>
    </article>
  </div>
</template>
