<template>
  <div class="ass1-add-comment">
    <form action="#" v-on:submit.prevent="handleAddComment">
      <!-- <input v-model="comment" type="text"  placeholder="Thêm một bình luận"> -->
      
      <textarea
        v-model="comment"
        class="form-control ttg-border-none"
        placeholder="Thêm một bình luận"
      ></textarea>

    </form>
    <div class="ass1-add-comment__content">
      <a href="#" class="ass1-add-comment__btn-save ass1-btn-icon">
        <span>{{ renderMaxLength }}</span>
        <i v-on:click.prevent="handleAddComment" class="icon-Submit_Tick"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "post-comment-add",
  data() {
    return {
      comment: "",
      maxLength: 180,
      postId: this.$route.params.id,
    };
  },
  watch: {
    $route: function (to, from) {
      this.postId = to.params.id;
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    renderMaxLength() {
      return this.maxLength - this.comment.length;
    }
  },
  methods: {
    ...mapActions(["addNewComment"]),
    handleAddComment() {
      if (this.comment.length && this.comment.length <= this.maxLength) {
        if (!this.currentUser) {
          alert("Vui lòng đăng nhập!");
          return;
        }
        
        // Call API
        let data = {
          comment: this.comment,
          postid: this.postId
        }
        this.addNewComment(data).then(res => {
          if (res.ok) {
            alert("Đăng bình luận thành công!");
            this.comment = '';
          } else {
            alert(res.error);
          }
        })
      } else {
        alert("Dữ liệu nhập vào không đúng quy tắc!")
      }
    },
  },
};
</script>

<style>
</style>