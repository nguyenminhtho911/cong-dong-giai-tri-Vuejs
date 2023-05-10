import store from "../store";


const ifNotAuthenticated = (to, from, next) => {
  // 1. Router chỉ cho phép vào khi chưa đăng nhập (login, register)
  if (store.getters.isLogin === false) {
    next(); // cho phép vào
  } else {
    next({
      name: "home-page",
      query: {
        redirect: to.name
      }
    });
  }
};

const ifAuthenticated = (to, from, next) => {
  // 2. Router chỉ cho phép vào khi đã đăng nhập
  if (store.getters.isLogin === true) {
    next(); // cho phép vào
  } else {
    next({
      name: "login",
      query: {
        redirect: to.name
      }
    });
  }
};

const ifAuthenticatedIsAdmin = (to, from, next) => {
  // 2. Router chỉ cho phép vào khi đã đăng nhập và là admin
  if (store.getters.isLogin === true && store.getters.isAdmin === true) {
    next(); // cho phép vào
  } else {
    next({
      name: "home-page",
      query: {
        redirect: to.name
      }
    });
  }
};

export { ifNotAuthenticated, ifAuthenticated, ifAuthenticatedIsAdmin };
