<template>
  <div class="search-page">
    <div class="search-info">
      <h3>
        Từ khóa tìm kiểm: <strong>{{ query }}</strong>
      </h3>
      <p>Tìm kiếm được ({{ this.listPostSearch.length }}) kết quả</p>
      <!-- <p>Nội dung b<mark>ài</mark>  viết nè</p> -->
    </div>

    <div
      v-if="listPostSearch && listPostSearch.length"
      v-masonry
      column-width=".grid-sizer"
      transition-duration="0.3s"
      item-selector=".ass1-section__item"
      class="ass1-section__wrap row ass1-section__isotope-init"
    >
      <div class="grid-sizer"></div>

      <post-item
        v-masonry-tile
        v-for="item in listPostSearch"
        v-bind:key="item.PID"
        v-bind:post="item"
        class="col-lg-6"
      />
    </div>
  </div>
</template>

<script>
import PostItem from "../components/PostItem.vue";
import { mapActions } from "vuex";
export default {
  name: "search",
  components: {
    PostItem,
  },
  data() {
    return {
      query: this.$route.query.query,
      listPostSearch: [],
    };
  },
  watch: {
    $route: function (to, from) {
      this.query = to.query.query;
      this.checkQuery();
      this.fetchDataSearch();
    },
  },
  created() {
    this.checkQuery();
    this.fetchDataSearch();
  },
  methods: {
    ...mapActions(["getListPostSearch"]),
    checkQuery() {
      if (!this.query) {
        this.$router.push("/");
      }
    },
    fetchDataSearch() {
      if (this.query) {
        this.getListPostSearch(this.query).then((res) => {
          if (res.ok) {
            this.listPostSearch = res.posts;
            this.$redrawVueMasonry(); // Data changed redraw
          }
        });
      }
    },
  },
};
</script>

<style>
.search-page {
  margin-top: 45px;
}
.search-info {
  padding-bottom: 30px;
}

mark,
.mark {
  background-color: yellow;
  padding: 0;
}
</style>