import Vue from "vue";
import { CONFIG_ACCESS_TOKEN } from "../../constants";

export default {
  SET_USER_INFO(state, user) {
    Vue.set(state.users, user.USERID, user);
  },
  SET_USER_POSTS(state, { posts, userid }) {
    Vue.set(state.posts, userid, posts);
  },
  SET_LOGIN_INFO(state, { user = null, token = "" }) {
    localStorage.setItem(CONFIG_ACCESS_TOKEN, token);
    state[CONFIG_ACCESS_TOKEN] = token;
    state.currentUser = user;
  },
  SET_LOGOUT(state) {
    state[CONFIG_ACCESS_TOKEN] = "";
    state.currentUser = null;
    localStorage.removeItem(CONFIG_ACCESS_TOKEN);
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_LIST_POSTS_SORT(state, data){
    data.sort((a, b) => {
      const dateA = new Date(a.time_added);
      const dateB = new Date(b.time_added);
      return dateB - dateA;
    });
  },
  SET_LIST_POSTS_AFTER_DELETE(state, postid) {
    let userCurrentId = state.currentUser.USERID;
    let newListPosts = state.posts[userCurrentId].filter((post) => post.PID !== postid)
    state.posts[userCurrentId] = newListPosts;
  },
  SET_POST_UPDATE(state, updatePost) {
    let userCurrentId = state.currentUser.USERID;
    let index = state.posts[userCurrentId].findIndex((item) => item.PID === updatePost.PID);
    if (index !== -1) {
      state.posts[userCurrentId].splice(index, 1, updatePost);
    }
  }
};
