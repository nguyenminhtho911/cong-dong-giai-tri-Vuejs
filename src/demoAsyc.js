console.log("=================================")
// console.log("demoAsync");

function first() {
    // console.log("first run");
    setTimeout(() => {
        console.log("Tương tác với server");
    }, 5000);
}


function second() {
    console.log("Trước khi gọi function first()");
    first();
    console.log("Sau khi gọi function first()");
}

// second();

// Khi dùng công cụ tương tác với server -> Trả về cho mình 1 Promise
// Giả lập một function là server -> Return một Promise

function login(username, password) {
    return new Promise(
        function(resolve, reject) {
            console.log("server đang xử lí...");
            // Giả sử server tốn 2 giây để xử lí
            setTimeout(() => {
                console.log("server xử lí thành công");
                // Giả sử server xử lí thành công trả về một cục data
                
                let data = {
                    username: username,
                    password: '4723894dshjkf23902dvbk-3278974hfe',
                    isLogin: true,
                    userId: 'dhajkd-dshjksf-fdshkjfh'
                }
                resolve(data);

                /*
                let dataError = {
                    error: 'Đăng nhập thất bại',
                    isLogin: false
                }
                reject(dataError);
                */
            }, 2000);
        
        }
    );
}

function getPostByUserid(userid) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log("Server getPosstByUserId xử lí thành công, userid = ", userid);

            let data = [
                {
                    postId: 1,
                    userid,
                    content: 'hdjkfhskf'
                },
                {
                    postId: 1,
                    userid,
                    content: 'hdjkfhskf'
                }
            ];
            // resolve(data);
            reject({
                data,
                error: 'Xử lí post by userid error'
            });
        }, 4000);
    })
}

/*
login('admin', 'admin').then( function(data) {
    console.log("Bên trong này là những đoạn code xử lí tiếp sau khi login");
    console.log("sau khi promise xử lí thành công")
    return {
        demo: 'abc',
        demo2: 'xử lí xong công việc thứ 2',
        data: data
    }
}).then( function(data) {
    console.log("Xử lí lần thứ 3", data);
} )
*/
// Promise hell - Callback hell

/*
login('admin', 'admin')
    .then(function(data) {
        console.log("Success", data)
        getPostByUserid(data.userId)
            .then(function(data) {
                console.log("data getPost = ", data);
                // getPostByUserid(data.userId)
                //     .then(function(data) {
                //         console.log("data getPost = ", data);
                //     })
            })
    })
    .catch(function(error) {
        console.log("Error", error)
    })
*/

async function handleLoginUser() {
    try {
        var resultLogin = await login('admin', 'admin');
        var resultPost = await getPostByUserid(resultLogin.userId);
        console.log("resultLogin = ", resultLogin);
        console.log("resultPost = ", resultPost);
    } catch (error) {
        console.log("error = ", error);
        // Nếu như có bất kì lỗi xảy ra trong qua trình xử lí Promise nhảy vào catch
    }
}

// handleLoginUser();

// console.log("Một số đoạn code khác không liên quan gì tới login");

// console.log(fetch('http://apiluc.zendvn.com/api/post/getListPagination.php?pagesize=3&currPage=1'));

var resultPost = fetch('http://apiluc.zendvn.com/api/post/getListPagination.php?pagesize=6&currPage=1');

var start = new Date().getTime();
resultPost.then(function(response) {
    var end = new Date().getTime();
    // console.log("response", response.json());
    console.log("time = ", end / start);
    return response.json();
}).then(function(myJson) {
    console.log(myJson);
});

// Axios

console.log("=================================")