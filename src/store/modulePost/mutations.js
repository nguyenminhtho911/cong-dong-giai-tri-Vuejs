export default {
  //SET_EXAMPLE(state, payload) {
  //  console.log("payload", payload);
  //},
  SET_LIST_POSTS(state, data) {
    state.listPosts = data;
  },
  PUSH_LIST_POST(state, data) {
    state.listPosts = [...state.listPosts, ...data];
  },
  SET_HAS_MORE(state, hasMore) {
    state.hasMore = hasMore;
  },
  SET_POST_DETAIL(state, data) {
    state.postDetail = data
  },
  PUSH_LIST_COMMENTS(state, comment) {
    state.postDetail.comments.push(comment)
  }
  
};

// Case 1: currPage = 1 -> Thay thế array gốc
// Case 2: currPage = 2, 3, 4, .. -> Đẩy thêm data vào (nối 2 array lại với nhau)
