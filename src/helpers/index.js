// helper: hàm hỗ trợ riêng bên ngoài



// created by www.4codev.com
const removeVietnameseFromString = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  str = str.toLowerCase();
  str = str
      .replace(/[&]/g, "-and-")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .replace(/[-]+/g, "-")
      .replace(/-$/, "");
  return str;
}

const parseJwt = (token) => {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

  return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

const replaceAll = (originStr, search, replacement) => {
  return originStr.toLowerCase().split(search.toLowerCase()).join(replacement);
};

const checkImageURL = (imageURL) => {
  if(!imageURL.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/i)) {
    return false;
  }
  return true;
};

const checkImageFile = (file) => {
  let filename = file.name;
  let type = file.type;

  if(filename.lastIndexOf(".") == -1) {
    return false
  }

  if( type.lastIndexOf('png') != -1 || type.lastIndexOf('jpeg') != -1 || 
    type.lastIndexOf('jpg') != -1 || type.lastIndexOf('gif') != -1 ) {
    return true
  }

  return false;

}

export { 
  removeVietnameseFromString, 
  parseJwt, 
  replaceAll, 
  checkImageURL, 
  checkImageFile 
};
