import axios from "axios";

/*
const api = axios.create({
    baseURL: "http://127.0.0.1:8080",
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    // config => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         config.headers['Authorization'] = `Token ${token}`
    //     }
    //     return config
    // },
    response => Promise.resolve(response.data),
    error => {
        return Promise.reject(error);
    }
);

export default api;
*/

const BASE_URL = process.env.REACT_APP_BACKEND_APP_URL;
const DEFAULT_HEADER = {
    'Content-Type': 'application/json',
    //Authorization: 'myspecialpassword'
};

// axios.defaults.headers = {
//     'Content-Type': 'application/json',
// }



const API = async (method = 'GET', endpoint, payload = {}, headers = DEFAULT_HEADER) => {
    return new Promise((resolve, reject) => {

        //console.log('BASE_URL + endpoint', BASE_URL + endpoint)

        axios({
            method: method,
            url: BASE_URL + endpoint,
            data: payload,
            headers: headers,
        }).then(async (response) => {
            // const { status, data } = response;
            // (parseInt(status) === 200) ? resolve(data) : reject(data);
            resolve(response.data)

        }).catch((error) => {
            console.log('error', error)
            reject(error);
        })
    })
}

export default API;

/*  return new Promise((resolve, reject) => {
        return API('POST', 'products', data).then((response) => {
            response.success ? resolve(response) : reject(response);
        }).catch((error) => {
            reject(error);
        });
    });*/