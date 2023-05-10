import { CONFIG_ACCESS_TOKEN } from "../../constants";

export default {
  [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),
  currentUser: null, // Login
  users: {},
  posts: {},
  listMembers: []
};

/**
* Lưu user ở dạng object: 
  để khi lấy thông tin của user nào
    chỉ cần truyền id của user vào: users[userid]

users: {
  [userid]: [value -> dữ liệu của user đó]
}
posts: {
  [userid]: [value -> listPost của userid]
}

var userid = 20
users[userid]

* Ko lưu dạng array -> khỏi phải loop

*/
