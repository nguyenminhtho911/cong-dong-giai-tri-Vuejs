<template>
  <div class="ass1-head-user" v-if="userInfor">
    <div class="ass1-head-user__content">
      <div class="ass1-head-user__image">
        <a href="#"><img v-bind:src="getAvatar" /></a>
      </div>
      <div class="ass1-head-user__info">
        <div class="ass1-head-user__info-head">
          <div class="ass1-head-user__name">
            <span> {{ userInfor.fullname }} </span>
            <i
              ><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified"
            /></i>
          </div>
          <div class="w-100"></div>

          <a
            v-if="!isCurrentUser"
            href="#"
            class="ass1-head-user__btn-follow ass1-btn"
            >Theo dõi</a
          >

          <template v-else>
            <router-link
              v-bind:to="{ name: 'change-password', params: { id: userInfor.USERID } }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Đổi mật khẩu</router-link
            >
            <router-link
              v-bind:to="{ name: 'user-profile', params: { id: userInfor.USERID } }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Profile</router-link
            >
            <router-link
              v-bind:to="{ name: 'dashboard-posts' }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Quản lý bài viết</router-link
            >
            <router-link
              v-if="isAdmin"
              v-bind:to="{ name: 'admin-manage' }"
              class="ass1-head-user__btn-follow ass1-btn"
              >Quản lý thành viên</router-link
            >
          </template>
        </div>
        <div class="ass1-head-user__info-statistic">
          <div class="ass1-btn-icon">
            <i class="icon-Post"></i><span>Bài viết: {{ countPost }} </span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Followers"></i><span>Theo dõi: 0</span>
          </div>
          <div class="ass1-btn-icon">
            <i class="icon-Following"></i><span>Đang theo dõi: 0</span>
          </div>
        </div>
        <p>{{ userInfor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "user-page-info",
  props: {
    userInfor: { type: Object, default: null },
    countPost: { type: Number, default: 0 },
  },
  computed: {
    ...mapGetters(["currentUser", "isAdmin"]),
    getAvatar() {
      if (this.userInfor && this.userInfor.profilepicture)
        return this.userInfor.profilepicture;
      return "/dist/images/default-avatar.png";
    },
    isCurrentUser() {
      if (this.userInfor && this.currentUser) {
        if (this.userInfor.USERID === this.currentUser.USERID) return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>