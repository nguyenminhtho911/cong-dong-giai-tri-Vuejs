<template>
  <div>
    <user-page-infor
      v-bind:countPost="countPost"
      v-bind:userInfor="userInfor" />

    <div
      v-if="listPostOfUser && listPostOfUser.length"
      v-masonry
      column-width=".grid-sizer"
      transition-duration="0.3s"
      item-selector=".ass1-section__item"
      class="ass1-section__wrap row ass1-section__isotope-init"
    >
      <div class="grid-sizer"></div>

      <post-item
        v-masonry-tile
        v-for="item in listPostActiveOfUser"
        v-bind:key="item.PID"
        v-bind:post="item"
        class="col-lg-6"
      />
    </div>
  </div>
</template>

<script>
import PostItem from "../components/PostItem";
import UserPageInfor from "../components/UserPageInfor";

import { mapActions } from "vuex";

export default {
  name: "user-page",
  components: {
    UserPageInfor,
    PostItem,
  },
  data() {
    return {
      userid: this.$route.params.id,
      userInfor: null,
      listPostOfUser: [],
    };
  },
  watch: {
    $route: function (to, from) {
      this.userid = to.params.id;
      this.fetchAllData();
    },
  },
  computed: {
    listPostActiveOfUser() {
      return this.listPostOfUser.filter(post => post.status == 1)
    },
    countPost() {
      if (this.listPostOfUser && this.listPostOfUser.length) {
        return this.listPostActiveOfUser.length;
      }
      return 0;
    }
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    ...mapActions(["setLoading", "getUserById", "getListPostsByUserId"]),
    async fetchAllData() {
      this.setLoading(true);
      let userid = this.userid;

      var promiseUser     = this.getUserById(userid);
      var promisePostUser = this.getListPostsByUserId(userid);

      let [resultUser, resultPostUser] = await Promise.all([promiseUser, promisePostUser]);
      this.setLoading(false);
      
      // Data changed
      this.$redrawVueMasonry();

      if (resultUser.ok && resultPostUser.ok) {
        this.userInfor       = resultUser.data;
        this.listPostOfUser = resultPostUser.posts;
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>