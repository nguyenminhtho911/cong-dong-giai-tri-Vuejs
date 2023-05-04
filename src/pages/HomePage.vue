<template>
  <div class="row">
    <div class="col-lg-8">
      <post-list />
    </div>
    <div class="col-lg-4">
      <sidebar />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
export default {
  name: "home-page",
  components: {
    PostList,
    Sidebar,
  },
  watch: {
    // watch `$route` chỉ chạy khi có sự thay đổi router
    // Lần load đầu tiên sẽ -> ko chạy => callAPI tại `created()`
    $route: function (to, from) {
      var tagIndex = to.query.tagIndex;
      this.getListPostHasPaging({ tagIndex }); // nếu có tagIndex passing giá trị else passing `undefined`
    },
  },
  created() {
    var tagIndex = this.$route.query.tagIndex;
    this.getListPostHasPaging({ tagIndex });
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),
  },
};
</script>

<style>
</style>