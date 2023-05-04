<template>
  <div class="ass1-section__list">
    <post-item
      v-for="item in getListPost"
      v-bind:key="item.PID"
      v-bind:post="item"
    />
    <button
      v-on:click="handleLoadMore"
      v-if="getListPost && getListPost.length"
      v-bind:disabled="!hasMore"
      class="load-more ass1-btn"
    >
      <span>Xem thêm</span>
    </button>
    <h3 v-else>Danh sách rỗng</h3>
  </div>
</template>

<script>
import { PAGE_SIZE, CURRENT_PAGE } from "../constants";
import { mapGetters, mapActions } from "vuex";
import PostItem from "./PostItem";
export default {
  name: "post-list",
  data() {
    return {
      pagesize: PAGE_SIZE,
      currPage: CURRENT_PAGE,
      tagIndex: parseInt(this.$route.query.tagIndex), // khi load trang `query` rỗng .tagIndex -> undefinde -> parseInt(undefinde) -> NaN
    };
  },
  components: {
    PostItem,
  },
  computed: {
    //...mapGetters(["getListPost", "hasMore"]),
    ...mapGetters({
      getListPostAll: 'getListPost', // syntax đặt lại tên
      hasMore: 'hasMore'
    }),
    getListPost() {
      return this.getListPostAll.filter(post => post.status == 1)
    }
  },
  watch: {
    // khi change url -> watch $route
    $route: function (to, from) {
      this.tagIndex = to.query.tagIndex; // update lại giá trị `tagIndex`
      this.currPage = 1; // reset `currPage = 1` ko nó sẽ lấy `currPage` của những lần bấm `load more` trước
    },
    getListPost: function(to, from) {
      this.checkListPostActive();
    }
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),

    handleLoadMore() {
      this.currPage += 1;
      let obj = {
        pagesize: this.pagesize,
        currPage: this.currPage,
        tagIndex: this.tagIndex,
      };
      if (this.hasMore) this.getListPostHasPaging(obj);
    },

    checkListPostActive() {
      if(!this.getListPost.length) {
        this.handleLoadMore();
      }
    }
  },
};
</script>

<style>
</style>