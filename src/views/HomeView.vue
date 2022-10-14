<template>
  <main>
    <Navbar @searchMission="sendSearch" />
    <div class="flex flex-col m-6 justify-center">
      <div class="sm:flex sm:gap-16 sm:mt-4 sm:justify-center">
        <div class="flex flex-col gap-6" id="top">
          <Filter
            @orderMission="sendOrder"
            @likeMission="sendMissionComments"
            @dateMission="sendDate"
            @reset="reset"
          />
          <TopDriver />
        </div>
        <div class="flex flex-wrap gap-6">
          <div v-for="mission in allMission.data" :key="mission.id">
            <Cards
              :location="mission.location"
              :username="mission.user_name"
              :price="mission.price"
              :startdate="mission.start_date"
              :enddate="mission.end_date"
              :id="mission._id"
              :likes="mission.likes"
              :comments="mission.missionComments"
              @fetchCard="fetchMission"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center my-6">
      <!-- <Pagination /> -->
      <VueTailwindPagination
        :current="page"
        :total="total"
        :per-page="perPage"
        @page-changed="onPageClick($event)"
      />
    </div>
  </main>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Cards from "../components/Cards.vue";
import Footer from "../components/Footer.vue";
import Pagination from "../components/pagination.vue";
import Filter from "../components/Filter.vue";
import TopDriver from "../components/TopDriver.vue";
import moment from "moment";

import "../assets/ocrv.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "Home view",
  components: {
    Navbar,
    Cards,
    Footer,
    Pagination,
    VueTailwindPagination,
    Filter,
    TopDriver,
  },
  data() {
    return {
      user: "",
      logged: false,
      allMission: [],
      page: 1,
      perPage: 6,
      total: 100,
      query: "",
      order: "",
    };
  },
  methods: {
    fetchMission() {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "http://localhost:8000/api/missions?page=" + this.page,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.allMission = result;
          this.total = result.total;
        })
        .catch((error) => console.log("error", error));
    },
    onPageClick(event) {
      if (
        this.query !== "" ||
        this.order !== "" ||
        this.missionComments !== "" ||
        this.date !== ""
      ) {
        this.page = event;
        this.search(
          this.query,
          this.order,
          this.missionComments,
          this.date,
          this.page
        );
      } else {
        this.page = event;
        this.fetchMission();
      }
    },
    reset() {
      this.fetchMission();
      this.query = "";
      this.order = "";
      this.like = "";
      this.date = "";
      // console.log("je reset");
    },
    async search(query, order, missionComments, date, page) {
      if (query == "" && order == "" && missionComments == "" && date == "") {
        return this.reset();
      }
      this.query = query;
      this.order = order;
      this.missionComments = missionComments;
      this.date = date;
      this.page = page;
      let url = "http://localhost:8000/api/missions/search";
      let key = "?";
      if (query != "") {
        url += `${key}search=${query}`;
        key = "&";
      }
      if (order != "") {
        url += `${key}sort=${order}`;
        key = "&";
      }
      if (missionComments != "") {
        url += `${key}missionComments=${missionComments}`;
        key = "&";
      }
      if (date != "") {
        url += `${key}date=${date}`;
        key = "&";
      }
      if (page != "") {
        url += `${key}page=${page}`;
        key = "&";
      }
      console.log(url);
      let res = await fetch(url);
      let data = await res.json();

      this.allMission = data;
    },
    sendSearch(query) {
      this.search(query, this.order, this.missionComments, this.date);
    },
    sendOrder(order) {
      this.missionComments = "";
      this.date = "";
      this.search(this.query, order, this.missionComments, this.date);
    },
    sendMissionComments(missionComments) {
      this.date = "";
      this.order = "";
      this.search(this.query, this.order, missionComments, this.date);
    },
    sendDate(date) {
      this.order = "";
      this.like = "";
      this.search(this.query, this.order, this.like, date);
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
    this.fetchMission();
  },
};
</script>
<style>
@media screen and (max-width: 600px){
  #top{
    margin-bottom: 3em;
  }
}
</style>