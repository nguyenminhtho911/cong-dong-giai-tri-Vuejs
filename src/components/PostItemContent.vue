<template>
  <div class="ass1-section__content">
    
    <p v-if="querySearch" v-html="formatPostContent" />
    <p v-else >{{ formatPostContent }}</p>
    
    <div class="ass1-section__image">
      <router-link
        v-bind:to="{ name: 'post-detail', params: { id: post.PID } }"
      >
        <img v-bind:src="post.url_image" v-bind:alt="post.post_content" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { replaceAll } from "../helpers";

export default {
  name: "post-item-content",
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return {
      querySearch: this.$route.query.query,
    };
  },
  watch: {
    $route: function (to, from) {
      this.querySearch = to.query.query;
    },
  },
  computed: {
    formatPostContent() {
      if (this.querySearch) {
        let replacement = "<mark>" + this.querySearch + "</mark>";
        return replaceAll(
          this.post.post_content,
          this.querySearch,
          replacement
        );
      } else {
        return this.post.post_content;
      }
    },
  },
};
</script>

<style>
</style>