<template>
  <div class="ass1-section__item" v-if="post">
    <div class="ass1-section">
      <post-item-head v-bind:post="post" />
      <post-item-content v-bind:post="post" />
      <post-item-footer v-bind:post="post" />
    </div>
  </div>
</template>

<script>
import PostItemHead from "./PostItemHead";
import PostItemContent from "./PostItemContent";
import PostItemFooter from "./PostItemFooter";
export default {
  name: "post-item",
  components: {
    PostItemHead,
    PostItemContent,
    PostItemFooter,
  },
  props: {
    post: { type: Object, default: null },
  },
};
</script>

<style>
</style>