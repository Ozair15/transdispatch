<template>
  <div
    class="border-2 rounded-lg bg-zinc-700 border-gray-400 shadow-xl w-64 h-52"
  >
    <div class="rounded-lg m-3">
      <div
        class="flex justify-center items-center py-1.5 border-b border-gray-400"
      >
        <div class="text-white text-lg">FILTRER PAR</div>
      </div>
    </div>
    <div class="m-3">
      <div class="space-y-2">
        <div
          class="text-white space-x-2 text-s w-full flex flex-row justify-between items-center"
        >
          <p>Par date :</p>
          <div>
            <button
              class="bg-neutral-300 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded mx-2"
              @click="minDate"
            >
              Min
            </button>

            <button
              class="bg-gray-400 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded"
              @click="maxDate"
            >
              Max
            </button>
          </div>
        </div>
        <div
          class="text-white space-x-2 text-s w-full flex flex-row justify-between items-center"
        >
          <p>Par prix :</p>
          <div>
            <button
              class="bg-neutral-300 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded mx-2"
              @click="minPrice"
            >
              Min
            </button>
            <button
              class="bg-gray-400 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded"
              @click="maxPrice"
            >
              Max
            </button>
          </div>
        </div>
        <div
          class="text-white space-x-2 text-s w-full flex flex-row justify-between items-center"
        >
          <p>Par com :</p>
          <div>
            <button
              class="bg-neutral-300 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded mx-2"
              @click="minLike"
            >
              Min
            </button>
            <button
              class="bg-gray-400 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded"
              @click="maxLike"
            >
              Max
            </button>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-gray-400 hover:bg-neutral-400 text-neutral-700 text-xs font-semibold px-4 py-1 rounded mt-1"
            @click="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sort: "",
      like: "",
      date: "",
    };
  },
  methods: {
    emitSearchSort() {
      this.$emit("orderMission", this.sort);
    },
    emitSearchLike() {
      this.$emit("likeMission", this.like);
    },
    emitSearchDate() {
      this.$emit("dateMission", this.date);
    },
    reset() {
      this.sort = "";
      this.like = "";
      this.date = "";
      this.$emit("reset");
      //   this.emitSearch();
    },
    minPrice() {
      this.sort = "asc";
      this.emitSearchSort();
    },
    maxPrice() {
      this.sort = "desc";
      this.emitSearchSort();
    },
    minLike() {
      this.like = "asc";
      this.emitSearchLike();
    },
    maxLike() {
      this.like = "desc";
      this.emitSearchLike();
    },
    minDate() {
      this.date = "asc";
      this.emitSearchDate();
    },
    maxDate() {
      this.date = "desc";
      this.emitSearchDate();
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
