import axiosInstance from "../../plugins/axios";
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from "../../constants";

export default {

  // Get Posts
  async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {

    // set loading
    commit("SET_LOADING", true);

    try {
      var config = {
        params: {
          pagesize,
          currPage
        }   
      };

      // url has query mean has tagIndex
      if (tagIndex) {
        config.params.tagIndex = tagIndex;
        var result = await axiosInstance.get("/post/getListByCategory.php", config);
      } else {
        var result = await axiosInstance.get("/post/getListPagination.php", config);
      }

      // set loading
      commit("SET_LOADING", false);

      // request success 
      if (result.data.status == 200) {
        !result.data.posts.length ? commit("SET_HAS_MORE", false) : commit("SET_HAS_MORE", true)

        if (currPage === 1) commit("SET_LIST_POSTS", result.data.posts);
        else if (currPage > 1) commit("PUSH_LIST_POST", result.data.posts);



      } else {
        console.log("error", result.data.error);
      }
    } catch (error) {
      commit("SET_LOADING", false);
      console.log("error", error);
    }
  },

  // Get Post Detail
  async getPostDetailById ({ commit, dispatch }, postid) {
    commit("SET_LOADING", true);

    try {
      var result = await axiosInstance.get("/post/post.php?postid=" + postid);

      if (result.data.status === 200) {

        // Gọi tiếp sang API user
        //var resultUser = await dispatch('getUserById', result.data.data.post.USERID);

        // Chạy đồng thời 2 API
        var promiseUser     = dispatch('getUserById', result.data.data.post.USERID);
        var promiseComments = dispatch('getListCommentByPostid', postid);
        
        let [resultUser, resultComments] = await Promise.all([promiseUser, promiseComments]);

        let dataPostDetail = {
          ...result.data.data,
          comments: []
        }

        if (resultComments.ok) {
          dataPostDetail.comments = resultComments.comments;
        }

        commit("SET_LOADING", false);
        commit("SET_POST_DETAIL", dataPostDetail)

        return {
          ok: true,
          data: result.data.data,
          error: null
        }
        
      }
    } catch (error) { 
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async getListPostSearch ({ commit }, searchStr) {
    commit("SET_LOADING", true);
    try {
      let result = await axiosInstance.get("/post/search.php?query=" + searchStr);
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        return {
          ok: true,
          posts: result.data.posts,
        }

      } else {
        return {
          ok: false
        }
      }

    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async createNewPost ({ commit }, { post_content ="", category = "", url_image = "", obj_image = null }) {
    commit("SET_LOADING", true);
    try {

      var bodyFormData = new FormData();
      bodyFormData.append('post_content', post_content);
      bodyFormData.append('category', category);
      bodyFormData.append('url_image', url_image);

      if (obj_image) {
        bodyFormData.append('obj_image', obj_image);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      }

      let result = await axiosInstance.post("/post/addNew.php", bodyFormData, config);
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        return {
          ok: true,
          user: result.data.user,
        }
      }
      return {
        ok: false,
        error: result.data.error 
      }
      
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async getListCommentByPostid({ commit }, postid) {
    try {
      var result = await axiosInstance.get("/comment/comments.php?postid=" + postid);
      if (result.data.status == 200) {
        return {
          ok: true,
          comments: result.data.comments
        }
      } else {
        return {
          ok: false,
          error: result.data.error
        }
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async addNewComment({ commit, rootState }, { comment = "", postid = null }) {
    try {
      commit("SET_LOADING", true);

      let data = {
        comment,
        postid
      }
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      }

      var result = await axiosInstance.post("/comment/add_new.php", data, config);
      commit("SET_LOADING", false);

      if (result.data.status == 200) {
        let comment = {
          ...result.data.body,
          fullname: rootState.user.currentUser.fullname,
          profilepicture: rootState.user.currentUser.profilepicture
        }

        commit("PUSH_LIST_COMMENTS", comment)

        return {
          ok: true,
          comment: result.data.body
        }

      } else {
        return {
          ok: false,
          error: result.data.error
        }
      }

    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async deletePost({ commit }, postid) {
    commit("SET_LOADING", true);
    try {
      let data = {
        postid
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      }
      var result = await axiosInstance.post("/post/delete.php", data, config);
      commit("SET_LOADING", false);

      if (result.data.status == 200) {
        commit("SET_LIST_POSTS_AFTER_DELETE", postid);
        return {
          ok: true,
          data: result.data.message
        }
      }
      return {
        ok: false,
        error: result.error
      }

    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async updatePost({ commit, rootState }, { post_content ="", category = "", url_image = "", obj_image = null, postid = null }) {
    commit("SET_LOADING", true);
    try {

      var bodyFormData = new FormData();
      bodyFormData.append('post_content', post_content);
      bodyFormData.append('category', category);
      bodyFormData.append('url_image', url_image);
      bodyFormData.append('postid', postid);

      if (obj_image) {
        bodyFormData.append('obj_image', obj_image);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      }

      var result = await axiosInstance.post("/post/edit.php", bodyFormData, config);
      commit("SET_LOADING", false);

      if (result.data.status === 200) {
        let resultPost = result.data.data.post;
        let userCurrentId = rootState.user.currentUser.USERID;
        let index = rootState.user.posts[userCurrentId].findIndex((item) => item.PID === resultPost.PID);

        let postUpdated = {
          ...result.data.data.post,
          fullname: rootState.user.currentUser.fullname,
          profilepicture: rootState.user.currentUser.profilepicture,
          count: rootState.user.posts[userCurrentId][index].count
        }
        commit("SET_POST_UPDATE", postUpdated);

        return {
          ok: true,
          post: result.data.data,
        }
      }
      return {
        ok: false,
        error: result.data.error 
      }
      
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  },

  async togglePostStatus({ commit }, post) {
    commit("SET_LOADING", true);
    try {
      let data = {
        postid : post.PID
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem(CONFIG_ACCESS_TOKEN)
        }
      }
      var result = await axiosInstance.post("/post/activeDeactive.php", data, config);
      commit("SET_LOADING", false);

      if(result.data.status === 200) {
        let newStatus = post.status == 1 ? 0 : 1;
        let postUpdated = {
          ...post,
          status: newStatus
        }
        commit("SET_POST_UPDATE", postUpdated);

        return {
          ok: true,
          message: result.data.message
        }
      }

      return {
        ok: false,
        error: result.data.error 
      }
      
    } catch (error) {
      commit("SET_LOADING", false);
      return {
        ok: false,
        error: error.message
      }
    }
  }
};
