import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://apiluc.zendvn.com/api/',
    // timeout: 1000,
    headers: {
        'accept': 'application/json' // định dạng dữ liệu mà client mong muốn nhận từ server, là json
    }
});

export default axiosInstance;