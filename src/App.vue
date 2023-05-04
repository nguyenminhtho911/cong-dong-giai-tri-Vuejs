<template>
  <div id="app">
    <app-header v-if="isRenderHeader" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <app-footer v-if="isRenderFooter" />
    <loading v-if="isLoading" v-bind:class="{ show: isLoading }" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Loading from "./components/Loading";
export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLoading"]),
    isRenderHeader() {
      var arrRouter = ["login", "register"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false; // nếu routerName có tồn tại trong arrRouter thì return false -> ẩn Header
      return true;
    },
    isRenderFooter() {
      var arrRouter = ["home-page", "post-detail"];
      var routerName = this.$route.name;
      if (arrRouter.indexOf(routerName) !== -1) return false;
      return true;
    },
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin"]),
  },
};
</script>

<style>
</style>
