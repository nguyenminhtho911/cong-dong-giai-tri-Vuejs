<template>
  <div class="ass1-comments">
    <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{ comments.length }} Bình luận</div>
      <!--<div class="ass1-comments__options">
        <span>Sắp xếp theo:</span>
        <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
          ><i class="icon-Upvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
          ><i class="icon-Downvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"
          ><i class="icon-Expand_all"></i
        ></a>
      </div>-->
    </div>

    <post-comment-item
      v-for="cmt in comments"
      v-bind:key="cmt.CID"
      v-bind:comment="cmt"
    />
  </div>
</template>

<script>
import PostCommentItem from "./PostCommentItem";
export default {
  name: "post-comments",
  components: {
    PostCommentItem,
  },
  props: {
    comments: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style>
</style>
