<template>
  <div class="ass1-section__footer">
    <!-- <a href="#" class="ass1-section__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a> -->
    <!-- <a href="#" class="ass1-section__btn-downvote ass1-btn-icon"><i class="icon-Downvote"></i></a> -->
    <!-- <a href="#" class="ass1-section__btn-repost ass1-btn-icon"><i class="icon-Repost"></i></a> -->
    <!-- <a href="#" class="ass1-section__btn-like ass1-btn-icon"><i class="icon-Favorite_Full"></i><span>1,274</span></a> -->
    <a href="#" class="ass1-section__btn-comment ass1-btn-icon"
      ><i class="icon-Comment_Full"></i><span> {{ commentCount }} </span></a
    >
  </div>
</template>

<script>
export default {
  name: "post-item-footer",
  props: {
    post: { type: Object, default: null },
  },
  computed: {
    commentCount() {
      if (this.post.count) return this.post.count; // show count cmt
      return 0;
    },
  },
};
</script>

<style>
</style>