import axios from "axios";
import _ from 'lodash';
import store from '../store';
import { _logoutLocalStorage } from "../utils/helper";

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
};

// axios.defaults.headers = {
//     'Content-Type': 'application/json',
// }

const API = async (method = 'GET', endpoint, payload = {}, headers = DEFAULT_HEADER) => {
    return new Promise(async (resolve, reject) => {
        //console.log('BASE_URL + endpoint', BASE_URL + endpoint)

        const state = store.getState();
        var tokenData = _.get(state, 'auth.login.tokenData', '');

        axios({
            method: method,
            url: BASE_URL + endpoint,
            data: payload,
            headers: {
                ...headers,
                ...(tokenData && tokenData.tokenType && tokenData.token) && {
                    'Authorization': `${tokenData.tokenType} ${tokenData.token}`
                }
            },
        }).then(async (response) => {
            resolve(response.data)
        }).catch((error) => {
            if (error.response.status === 401) {
                _logoutLocalStorage()
                window.location.href = '/login';
            } else {
                reject(error.response.data);
            }

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