<template>
  <div class="ass1-comments__section" v-if="comment">
    <router-link v-bind:to="getUserLink" class="ass1-comments__avatar ass1-avatar">
      <img v-bind:src="getAvatar" alt=""
    /></router-link>
    <div class="ass1-comments__content">
      <router-link v-bind:to="getUserLink" class="ass1-comments__name"
        >{{ comment.fullname }}
      </router-link>
      <span class="ass1-comments__passed"> {{ formatTimeCmt }} </span>
      <p v-html="comment.comment"></p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "post-comment-item",
  props: {
    comment: { type: Object, default: null },
  },
  computed: {
    getAvatar() {
      if (this.comment && this.comment.profilepicture) return this.comment.profilepicture;
      return "/dist/images/avatar-02.png";
    },

    getUserLink() {
      return { name: "user-page", params: { id: this.comment.USERID || 1 } };
    },

    formatTimeCmt() {
      moment.locale("vi");
      return moment(this.comment.time_added).fromNow();
    },
  },
};
</script>

<style>
.ass1-comments__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>