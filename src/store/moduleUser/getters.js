import { parseJwt } from "../../helpers";
import { CONFIG_ACCESS_TOKEN } from "../../constants";

export default {
  isLogin: state => {
    let userObj = parseJwt(state[CONFIG_ACCESS_TOKEN]);
    if (userObj) {
      return true;
    } else {
      return false;
    }
  },
  currentUser: state => {
    return state.currentUser;
  },
  getListPostOfCurrentUser: state => {
    if (state.currentUser) {
      let userCurrentId = state.currentUser.USERID;
      return state.posts[userCurrentId];
    }
    return null;
  },
  isAdmin: state => {
    if (
      state.currentUser && state.currentUser.permission == "admin" || 
      parseJwt(state[CONFIG_ACCESS_TOKEN]).email == 'admin@gmail.com'
    ) {
      return true;
    }
    return false
  },
  getListMembers : state => {
    return state.listMembers
  }
};
